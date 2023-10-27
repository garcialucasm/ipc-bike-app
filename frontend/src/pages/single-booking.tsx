import React, { useState, useEffect } from "react";
import HeaderTemp from "@/components/organisms/HeaderTemp";
import InputStudentBikeSize from "@/components/templates/InputStudentBikeSize";
import InputStudentData from "@/components/templates/InputStudentData";
import PreBookingConfirmation from "@/components/templates/PreBookingConfirmation";
import BookingConfirmed from "@/components/templates/BookingConfirmed";
import { BikeSize } from "@/types/BikeType";
import { UserData } from "@/types/UserType";
import { BookingType } from "@/types/BookingType";
import { SingleBookingSection } from "@/types/NavigationSections";

function HomeSingleBooking() {
  // Creating states for show of hide components
  const [currentSection, setCurrentSection] = useState<SingleBookingSection>(
    SingleBookingSection.SelectBikeSize
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

  // Creating state to check if isUserDataValid and then submit booking
  const [isUserDataValid, setIsUserDataValid] = useState(false);

  // Statements to control navegation (next, submit & return buttons)
  const handleNavigation = (event: { buttonValue: SingleBookingSection }) => {
    const valueButtonClicked: SingleBookingSection = event.buttonValue;
    setCurrentSection(valueButtonClicked);
  };

  // Update bikeSizeSelected
  function handleBikeSize(event: { selectedSize: BikeSize }) {
    const bikeSizeSelected = event.selectedSize;
    setBikeSize(bikeSizeSelected);
  }

  // Correct me
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
    // Correct me
    // Choose a strategic location to leave this function call (checkEnteredUserData)
    checkEnteredUserData();
  }, [bikeSizeSelected, isUserDataValid, enteredUserData]);

  // Correct me
  // Option to confirm Booking or Return to user data input
  function handleBookingConfirmation(event: { value: SingleBookingSection }) {
    console.log(`event: ${event.value}`);
    console.log(event.value === SingleBookingSection.BookingConfirmed);
    // Temp - Submit confirmation
    const buttonOnConfirmation = event.value;
    if (buttonOnConfirmation == SingleBookingSection.BookingConfirmed) {
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
    } else if (buttonOnConfirmation === SingleBookingSection.InputUserData) {
      setIsUserDataValid(false);
    }
  }

  // Correct me (remove)
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
    <div className="container center-content">
      <HeaderTemp heading="Single Booking" />

      {currentSection === SingleBookingSection.SelectBikeSize && (
        <InputStudentBikeSize
          onNavigation={handleNavigation}
          onSizeSelection={handleBikeSize}
        />
      )}
      {currentSection === SingleBookingSection.InputUserData && (
        <InputStudentData
          onNavigation={handleNavigation}
          sendUserDataState={enteredUserData}
          sendSetUserDataState={setEnteredUserData}
        />
      )}
      {currentSection === SingleBookingSection.PreBookingConfirmation && (
        <PreBookingConfirmation
          onNavigation={handleNavigation}
          onConfirmation={handleBookingConfirmation}
          bookingData={bookingData}
        />
      )}
      {currentSection === SingleBookingSection.BookingConfirmed && (
        <BookingConfirmed
          onNavigation={handleNavigation}
          bookingData={bookingData}
        />
      )}
    </div>
  );
}

export default HomeSingleBooking;
