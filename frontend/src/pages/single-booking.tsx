import React, { useState, useEffect, use } from "react";
import HeaderTemp from "@/containers/HeaderTemp";
import InputStudentSize from "@/containers/InputStudentBikeSize";
import InputStudentData from "@/containers/InputStudentData";
import BookingConfirmation from "@/containers/BookingPreConfirmation";
import { BikeSize } from "@/types/BikeType";
import { UserData } from "@/types/UserType";
import { BookingType } from "@/types/BookingType";
import AvailabilityContainer from "@/containers/AvailabilityContainer";
import Infobox from "@/containers/Infobox";

function HomeStudent() {
  // Creating states for show of hide components
  const [showInputBikeSize, setShowInputBikeSize] = useState(true);
  const [showInputStudentData, setShowInputStudentData] = useState(false);
  const [showBookingPreConfirmation, setShowBookingPreConfirmation] =
    useState(false);

  // Creating state for bikeSizeSelected
  const [bikeSizeSelected, setBikeSize] = useState(BikeSize.NONE);

  // Creating state for userDataTyped in InputStudentData
  const [userDataTyped, setUserDataTyped] = useState<UserData>({
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

  // Statements to control navegation
  const handleNavigation = (buttonValue: string) => {
    if (buttonValue === "go-to-input-student-data") {
      setShowInputBikeSize(false);
      setShowInputStudentData(true);
      setShowBookingPreConfirmation(false);
    } else if (
      buttonValue === "go-to-pre-booking-confirmation" &&
      isUserDataValid
    ) {
      setShowInputBikeSize(false);
      setShowInputStudentData(false);
      setShowBookingPreConfirmation(true);
    } else if (buttonValue === "return-to-size-selection") {
      setShowInputBikeSize(true);
      setShowInputStudentData(false);
      setShowBookingPreConfirmation(false);
    } else if (buttonValue === "return-to-user-data-input") {
      setShowInputBikeSize(false);
      setShowInputStudentData(true);
      setShowBookingPreConfirmation(false);
    }
  };

  // Update bikeSizeSelected
  function handleBikeSize(event: { selectedSize: BikeSize }) {
    const bikeSizeSelected = event.selectedSize;
    setBikeSize(bikeSizeSelected);
  }

  // Getting User Data from the inputStudentData
  // Option to go to Pre Booking Confirmation or Return to select Bike Size
  function handleUserData(event: { value: any | undefined }) {
    const { userDataTyped } = event.value;
    const { firstName, lastName, roomNumber } = userDataTyped;
    const userData = {
      firstName: firstName,
      lastName: lastName,
      roomNumber: roomNumber,
    };
    setUserDataTyped(userData);
    // Create a function to validate user data input
    setIsUserDataValid(true);
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      bookingUserData: userData,
    }));
  }

  // Update Booking data after both states change
  useEffect(() => {
    setBookingData({
      bookingBikeSize: bikeSizeSelected,
      bookingUserData: userDataTyped,
    });
  }, [bikeSizeSelected, isUserDataValid, userDataTyped]);

  // Option to confirm Booking or Return to user data input
  function handleBookingConfirmation(event: { name: any }) {
    const buttonOnConfirmation = event.name;
    if (buttonOnConfirmation === "submit-booking") {
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
    } else if (buttonOnConfirmation === "return-to-user-data-input") {
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
    console.log("userDataTyped changed:", userDataTyped);
  }, [userDataTyped]);

  return (
    <div className="container center-content">
      <HeaderTemp heading="Single Booking" />

      {showInputBikeSize && (
        <>
          <AvailabilityContainer />
          <InputStudentSize
            onSizeSelection={handleBikeSize}
            onNavigation={handleNavigation}
          />
        </>
      )}
      {showInputStudentData && (
        <InputStudentData
          onDataValidation={handleUserData}
          onNavigation={handleNavigation}
        />
      )}
      {showBookingPreConfirmation && (
        <>
          <Infobox bookingData={bookingData} />
          <BookingConfirmation
            onConfirmation={handleBookingConfirmation}
            onNavigation={handleNavigation}
          />
        </>
      )}
    </div>
  );
}

export default HomeStudent;
