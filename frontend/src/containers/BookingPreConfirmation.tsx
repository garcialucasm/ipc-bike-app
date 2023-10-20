import React, { useState } from "react";
import Button from "@/components/Button";
import HeaderTemp from "@/containers/HeaderTemp";
import { BookingType } from "@/types/BookingType";

function submitBooking() {
  return;
}

function BookingConfirmation(props: {
  onConfirmation: (arg0: any) => void;
  onNavigation: (buttonValue: string) => void;
}) {
  function handleClick(event: { target: any } | undefined) {
    const { name, value } = event?.target;
    const confirmationBooking = name;
    props.onConfirmation({ name: confirmationBooking });
    props.onNavigation(value);
  }
  return (
    <div className="container">
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="submit-booking"
          textInside="Confirm Booking"
          value={"submit-booking"}
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="return-to-user-data-input"
          textInside="Return"
          value={"return-to-user-data-input"}
          customClasses="button-return"
        />
      </div>
    </div>
  );
}

export default BookingConfirmation;
