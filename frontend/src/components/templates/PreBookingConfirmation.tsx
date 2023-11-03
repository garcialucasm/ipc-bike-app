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
    <div>
      <Infobox bookingData={bookingData} />
      <div>
        <Button
          onClick={handleClick}
          name={SingleBookingSection.goToBookingConfirmationStatus}
        >
          <span>Confirm Booking</span>
        </Button>
      </div>
      <div>
        <Button
          onClick={handleClick}
          name={SingleBookingSection.goToInputUserData}
          className="button-return"
        >
          <span>Return</span>
        </Button>
      </div>
    </div>
  );
}

export default PreBookingConfirmation;
