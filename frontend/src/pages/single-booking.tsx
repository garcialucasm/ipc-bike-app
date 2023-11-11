import React, { useState, useEffect } from "react";
import InputSingleBikeSize from "@/components/templates/InputSingleBikeSize";
import InputSingleUserData from "@/components/templates/InputSingleUserData";
import PreBookingConfirmation from "@/components/templates/PreBookingConfirmation";
import BookingConfirmationStatus from "@/components/templates/BookingConfirmationStatus";
import { BikeSize } from "@/types/BikeType";
import { UserData } from "@/types/UserType";
import { BookingType } from "@/types/BookingType";
import { SingleBookingSection } from "@/types/NavigationSections";
import Stepper from "@/components/organisms/Stepper";
import HeaderTemp from "@/components/organisms/HeaderTemp";

function HomeSingleBooking() {
  // Creating states for show of hide components
  const [currentSection, setCurrentSection] = useState<SingleBookingSection>(
    SingleBookingSection.selectBikeSize
  );

  // Creating state for bikeSizeSelected
  const [bikeSizeSelected, setBikeSize] = useState(BikeSize.NONE);

  // Creating state for enteredUserData in InputStudentData
  const [enteredUserData, setEnteredUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    roomNumber: "",
  });

  // Creating state to manage user data and then submit booking
  const [bookingData, setBookingData] = useState<BookingType>({
    bookingBikeSize: BikeSize.NONE,
    bookingUserData: {
      firstName: "",
      lastName: "",
      roomNumber: "",
    },
  });

  // Creating state to check if isUserDataValid and only then submit booking
  const [isUserDataValid, setIsUserDataValid] = useState(false);

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
    setBikeSize(bikeSizeSelected);
  }

  // TODO
  // Create a function to validate user data input
  function checkEnteredUserData() {
    setIsUserDataValid(true);
  }

  // Update bookingData after states [bikeSizeSelected, isUserDataValid or enteredUserDataboth] change
  useEffect(() => {
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      bookingUserData: enteredUserData,
    }));
    setBookingData({
      bookingBikeSize: bikeSizeSelected,
      bookingUserData: enteredUserData,
    });

    // TODO
    // Choose a strategic location to leave this function call (checkEnteredUserData)
    checkEnteredUserData();
  }, [bikeSizeSelected, isUserDataValid, enteredUserData]);

  // TODO
  // Option to confirm Booking or Return to user data input
  function handleBookingConfirmation() {
    // Temp - Submit confirmation
    const buttonOnConfirmation = SingleBookingSection.bookingConfirmationStatus;
    if (
      buttonOnConfirmation == SingleBookingSection.bookingConfirmationStatus
    ) {
      alert(
        buttonOnConfirmation +
          "\n" +
          "Bike Size Selected : " +
          bookingData.bookingBikeSize +
          "\n" +
          "User Name: " +
          bookingData.bookingUserData.firstName +
          " " +
          bookingData.bookingUserData.lastName +
          "\n" +
          "User Room: " +
          bookingData.bookingUserData.roomNumber +
          "\n"
      );
      //function to submit data
    } else if (buttonOnConfirmation === SingleBookingSection.inputUserData) {
      setIsUserDataValid(false);
    }
  }

  // TODO (remove)
  // Checking status of bikeSizeSelected (bike size input) and isUserDataValid (user data input)
  useEffect(() => {
    console.log("bikeSizeSelected changed:", bikeSizeSelected);
  }, [bikeSizeSelected]);
  useEffect(() => {
    console.log("isUserDataValid changed:", isUserDataValid);
  }, [isUserDataValid]);
  useEffect(() => {
    console.log("enteredUserData changed:", enteredUserData);
  }, [enteredUserData]);

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center container-webapp">
          <HeaderTemp heading="Single Booking" />
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
            <BookingConfirmationStatus
              onNavigation={handleNavigation}
              bookingData={bookingData}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default HomeSingleBooking;
