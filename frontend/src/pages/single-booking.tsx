import React, { useState, useEffect } from "react";
import InputSingleBikeSize from "@/components/templates/InputSingleBikeSize";
import InputSingleUserData from "@/components/templates/InputSingleUserData";
import PreBookingConfirmation from "@/components/templates/PreBookingConfirmation";
import BookingConfirmation from "@/components/templates/BookingConfirmation";
import { BikeSize } from "@/types/BikeType";
import { UserData } from "@/types/UserType";
import { BookingStatus, Booking } from "@/types/BookingType";
import {
  MenuNavigation,
  SingleBookingSection,
} from "@/types/NavigationSections";
import Stepper from "@/components/organisms/Stepper";
import HeaderWebApp from "@/components/organisms/HeaderWebApp";
import { createSingleBookingFetchApi } from "@/services/bookingApi";

function HomeSingleBooking() {
  // Creating states for show of hide components
  const [currentSection, setCurrentSection] = useState<SingleBookingSection>(
    SingleBookingSection.selectBikeSize
  );

  // Creating state for enteredUserData in InputStudentData
  const [enteredUserData, setEnteredUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    roomNumber: "",
  });

  // Creating state to manage user data and then submit booking
  const [bookingData, setBookingData] = useState<Booking>({
    bookingBikeSize: BikeSize.NONE,
    bookingUserData: {
      firstName: "",
      lastName: "",
      roomNumber: "",
    },
    bookingStatus: BookingStatus.BOOKED,
  });

  // Creating state to manage server response
  const [serverResult, setServerResult] = useState<any>({
    serverResult: "",
  });

  // Statements to control navigation (next, submit & return buttons)
  const handleNavigation = (event: { buttonName: SingleBookingSection }) => {
    const buttonClicked: SingleBookingSection =
      event.buttonName as SingleBookingSection;
    setCurrentSection(buttonClicked);
    if (buttonClicked === SingleBookingSection.bookingConfirmationStatus) {
      handleBookingConfirmation();
    }
  };

  // Update bikeSizeSelected
  function handleBikeSize(event: { selectedSize: BikeSize }) {
    console.log(event.selectedSize);
    const bikeSizeSelected = event.selectedSize;
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      bookingBikeSize: bikeSizeSelected,
    }));
  }

  // TODO: remove the enteredUserData state and leave only bookingData state 
  // Update bookingData after states [bikeSizeSelected or enteredUserDataboth] change
  useEffect(() => {
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      bookingUserData: enteredUserData,
    }));
  }, [enteredUserData]);

  // TODO: Send Booking confirmation or Return to user data input
  async function handleBookingConfirmation() {
    const buttonOnConfirmation = SingleBookingSection.bookingConfirmationStatus;
    if (
      buttonOnConfirmation === SingleBookingSection.bookingConfirmationStatus
    ) {
      const result = await createSingleBookingFetchApi(bookingData);
      setServerResult(result);
      console.log(result);
      //function to submit data
    } else if (buttonOnConfirmation === SingleBookingSection.inputUserData) {
    }
  }

  return (
    <>
      <div className="flex flex-col items-center text-center mb-3">
        <div className="container-webapp flex flex-col items-center pb-6">
          <HeaderWebApp
            headingTitle={"Single Booking"}
            headingSubTitle="Select the type of bike, confirm the details, and book."
            currentPage={MenuNavigation.singleBooking}
          />
          <Stepper currentSection={currentSection} />
          {currentSection === SingleBookingSection.selectBikeSize && (
            <InputSingleBikeSize
              onNavigation={handleNavigation}
              onSizeSelection={handleBikeSize}
            />
          )}

          {currentSection === SingleBookingSection.inputUserData && (
            <InputSingleUserData
              onNavigation={handleNavigation}
              sendUserDataState={enteredUserData}
              sendSetUserDataState={setEnteredUserData}
            />
          )}
          {currentSection === SingleBookingSection.preBookingConfirmation && (
            <PreBookingConfirmation
              onNavigation={handleNavigation}
              bookingData={bookingData}
            />
          )}
          {currentSection ===
            SingleBookingSection.bookingConfirmationStatus && (
            <BookingConfirmation
              bookingData={bookingData}
              serverResult={serverResult}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default HomeSingleBooking;
