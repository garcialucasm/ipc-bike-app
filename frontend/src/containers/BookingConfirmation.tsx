import ConfirmationBox from "@/containers/Infobox";
import React, { useState } from "react";
import Button from "@/components/Button";
import HeaderTemp from "@/containers/HeaderTemp";

function submitBooking() {
  return;
}

function BookingConfirmation(props: { onConfirmation: (arg0: any) => void }) {
  function handleClick(event: { target: any } | undefined) {
    const { name } = event?.target;
    const confirmationBooking = name;
    props.onConfirmation({ name: confirmationBooking });
  }
  return (
    <div className="container">
      <ConfirmationBox />
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="submit-booking"
          textInside="Confirm Booking"
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="return-to-user-data-input"
          textInside="Return"
        />
      </div>
    </div>
  );
}

export default BookingConfirmation;
