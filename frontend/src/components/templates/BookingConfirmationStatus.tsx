import React from "react";
import Link from "next/link";
import Infobox from "../organisms/Infobox";
import { BookingType } from "@/types/BookingType";

function goToBookingConfirmationStatus(props: {
  onNavigation: (navigationButton: any) => void;
  bookingData: BookingType;
}) {
  const bookingData = props.bookingData;
  return (
    <div>
      <h3>✔️ Booking Confirmed</h3>
      <Infobox bookingData={bookingData} />
      <Link href="/">
        <div className="button-return">Go to Main Page</div>
      </Link>
    </div>
  );
}

export default goToBookingConfirmationStatus;
