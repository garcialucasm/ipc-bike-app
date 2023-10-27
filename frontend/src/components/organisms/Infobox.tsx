import React from "react";
import { BookingType } from "@/types/BookingType";

function Infobox(props: { bookingData: BookingType }) {
  const { firstName, lastName, roomNumber } = props.bookingData.bookingUserData;
  const fullName = firstName + " " + lastName;
  return (
    <div className="infobox-container">
      <h2>{fullName}</h2>
      <h4>Room Number: {roomNumber}</h4>

      <p>Info about confirmation Booking...</p>
    </div>
  );
}

export default Infobox;
