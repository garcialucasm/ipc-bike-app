import React from "react";
import { SingleBookingSection } from "@/types/NavigationSections";
import Link from "next/link";

function BookingConfirmed(props: {
  onNavigation: (navigationButton: any) => void;
}) {
  function handleClick(event: { target: any } | undefined) {
    const { value } = event?.target;
    const buttonClicked: SingleBookingSection = parseInt(value, 10);
    props.onNavigation({ buttonValue: buttonClicked });
  }
  return (
    <div className="container">
      <Link href="/">
        <div className="button-return">Go to Main Page</div>
      </Link>
    </div>
  );
}

export default BookingConfirmed;
