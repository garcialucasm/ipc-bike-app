import React, { useState, useEffect } from "react";
import InputSingleBikeSize from "@/components/templates/InputSingleBikeSize";
import InputSingleUserData from "@/components/templates/InputSingleUserData";
import PreBookingConfirmation from "@/components/templates/PreBookingConfirmation";
import BookingConfirmation from "@/components/templates/BookingConfirmation";
import { BikeSize } from "@/types/BikeType";
import { BookingStatus, Booking } from "@/types/BookingType";
import {
  MenuNavigation,
  SingleBookingSection,
} from "@/types/NavigationSections";
import Stepper from "@/components/organisms/Stepper";
import HeaderWebApp from "@/components/organisms/HeaderWebApp";
import { createSingleBookingFetchApi } from "@/services/bookingApi";
import Head from "@/components/atoms/Head";
import withAuth from "@/auth/withAuth";
import { NextPage } from "next";

const HomeSingleBooking: NextPage = () => {
  // Creating states for show of hide components
  const [currentSection, setCurrentSection] = useState<SingleBookingSection>(
    SingleBookingSection.selectBikeSize
  );

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
    const bikeSizeSelected = event.selectedSize;
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      bookingBikeSize: bikeSizeSelected,
    }));
  }

  // Show Booking confirmation status or Return to user data input
  async function handleBookingConfirmation() {
    const buttonOnConfirmation = SingleBookingSection.bookingConfirmationStatus;
    if (
      buttonOnConfirmation === SingleBookingSection.bookingConfirmationStatus
    ) {
      const result = await createSingleBookingFetchApi(bookingData);
      setServerResult(result);
    } else if (buttonOnConfirmation === SingleBookingSection.inputUserData) {
    }
  }

  return (
    <>
      <div className="flex flex-col items-center text-center mb-3">
        <div className="container-webapp flex flex-col items-center pb-6">
          <Head title="IPC Alumni Bike" />
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
              bookingData={bookingData}
              setBookingData={setBookingData}
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

export default withAuth(HomeSingleBooking);

