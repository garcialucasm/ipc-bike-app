import ConfirmationBox from "@/components/box/ConfirmationBox";
import React, { useState } from "react";
import Button from "@/components/button/Button";
import Header from "@/components/header/Header";

function submitBooking() {
  return;
}

function BookingConfirmation() {
  return (
    <div className="container">
      <Header />
      <h1>Confirm Booking</h1>
      <ConfirmationBox />

      <Button
        type="submit"
        name="next"
        textInside="Confirm Booking"
        onClick={() => submitBooking}
      />
    </div>
  );
}

export default BookingConfirmation;
