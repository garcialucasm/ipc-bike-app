import React from "react";
import Button from "@/components/atoms/Button";
import { SingleBookingSection } from "@/types/NavigationSections";
import Infobox from "../organisms/Infobox";
import { BookingType } from "@/types/BookingType";

function PreBookingConfirmation(props: {
  onNavigation: (navigationButton: {
    buttonName: SingleBookingSection;
  }) => void;
  bookingData: BookingType;
}) {
  const bookingData = props.bookingData;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    const buttonClicked: SingleBookingSection = name as SingleBookingSection;
    props.onNavigation({ buttonName: buttonClicked });
  }
  return (
    <div className="flex flex-col items-center w-11/12">
      <Infobox bookingData={bookingData} />
      <Button
        onClick={handleClick}
        name={SingleBookingSection.bookingConfirmationStatus} className="btn-primary"
      >
        <span>Confirm Booking</span>
      </Button>
      <Button
        onClick={handleClick}
        name={SingleBookingSection.inputUserData}
        className="btn-return"
      >
        <span>Return</span>
      </Button>
    </div>
  );
}

export default PreBookingConfirmation;
