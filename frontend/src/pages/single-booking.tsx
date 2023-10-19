import React, { useState, useEffect } from "react";
import HeaderTemp from "@/containers/HeaderTemp";
import AvailabilityContainer from "@/containers/AvailabilityContainer";
import InputStudentSize from "@/containers/InputStudentBikeSize";
import InputStudentData from "@/containers/InputStudentData";
import BookingConfirmation from "@/containers/BookingConfirmation";
import { BikeSize } from "@/types/BikeSize";

function HomeStudent() {
  const [bikeSizeSelected, setBikeSize] = useState(BikeSize.NONE);
  const [isUserDataValid, setUserDataValid] = useState(false);

  // Update bikeSizeSelected
  function handleBikeSize(event: { size: any } | undefined) {
    let bikeSizeSelected = event?.size;
    console.log("Bikeeee " + bikeSizeSelected);
    setBikeSize(bikeSizeSelected);
  }

  // Option to go to Pre Booking Confirmation or Return to select Bike Size
  function handleUserData(event: { name: any | undefined }) {
    const buttonOnUserDataInput = event.name;
    if (buttonOnUserDataInput === "pre-booking-confirmation") {
      setUserDataValid(true);
    } else if (buttonOnUserDataInput === "return-to-size-selection") {
      setBikeSize(BikeSize.NONE);
    }
  }

  // Option to confirm Booking or Return to user data input
  function hendleBookingConfirmation(event: { name: any }) {
    const buttonOnConfirmation = event.name;
    if (buttonOnConfirmation === "submit-booking") {
      alert(
        buttonOnConfirmation +
          "\n" +
          "User Name:  User name ..." +
          "\n" +
          "User Room: User Room" +
          "\n" +
          "Bike Size Selected : " +
          bikeSizeSelected +
          "\n"
      );
      //function to submit data
    } else if (buttonOnConfirmation === "return-to-user-data-input") {
      setUserDataValid((prevValue) => {
        return !prevValue;
      });
    }
  }

  // Checking status
  useEffect(() => {
    console.log("bikeSizeSelected changed:", bikeSizeSelected);
  }, [bikeSizeSelected]);
  useEffect(() => {
    console.log("isUserDataValid changed:", isUserDataValid);
  }, [isUserDataValid]);

  return (
    <div className="container center-content">
      <HeaderTemp heading="Home - Single Booking" />

      {isUserDataValid == false ? (
        <>
          {/* Render size selection and after data user form */}
          {bikeSizeSelected === BikeSize.NONE ? (
            <>
              <AvailabilityContainer />
              <InputStudentSize onSizeSelection={handleBikeSize} />
            </>
          ) : (
            <InputStudentData onDataValidation={handleUserData} />
          )}
        </>
      ) : (
        <BookingConfirmation onConfirmation={hendleBookingConfirmation} />
      )}
    </div>
  );
}

export default HomeStudent;
