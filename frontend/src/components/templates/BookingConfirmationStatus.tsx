import React from "react";
import Link from "next/link";
import Infobox from "../organisms/Infobox";
import { BookingType } from "@/types/BookingType";
import Button from "../atoms/Button";

function goToBookingConfirmationStatus(props: {
  onNavigation: (navigationButton: any) => void;
  bookingData: BookingType;
}) {
  const bookingData = props.bookingData;
  return (
    <div className="flex flex-col items-center w-11/12">
      <h3>✔️ Booking Confirmed</h3>
      <Infobox bookingData={bookingData} />
      <div className="w-full">
        <Button className="btn-primary">
          <span>See instructions</span>
        </Button>
        <Link href="/">
          <div className="btn-return">Go to Main Page</div>
        </Link>
      </div>
    </div>
  );
}

export default goToBookingConfirmationStatus;
