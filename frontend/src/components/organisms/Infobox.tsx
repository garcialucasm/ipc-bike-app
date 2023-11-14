import React from "react";
import { BookingType } from "@/types/BookingType";

function Infobox(props: { bookingData: BookingType }) {
  const { firstName, lastName, roomNumber } = props.bookingData.bookingUserData;
  const bikeSize = props.bookingData.bookingBikeSize;
  const fullName = firstName + " " + lastName;
  return (
    <div className="w-full border rounded-xl py-5">
      <h2>{fullName}</h2>
      <h4>Room Number: {roomNumber}</h4>
      <h4>Bike Size: {bikeSize}</h4>
      <p>Info about confirmation Booking...</p>
    </div>
  );
}

export default Infobox;
