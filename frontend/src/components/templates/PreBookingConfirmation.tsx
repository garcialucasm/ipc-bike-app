import React from "react";
import Button from "@/components/atoms/Button";
import { SingleBookingSection } from "@/types/NavigationSections";
import Infobox from "../organisms/Infobox";
import { BookingType } from "@/types/BookingType";

function PreBookingConfirmation(props: {
  onConfirmation: (submitButton: { value: SingleBookingSection }) => void;
  onNavigation: (navigationButton: {
    buttonValue: SingleBookingSection;
  }) => void;
  bookingData: BookingType;
}) {
  const bookingData = props.bookingData;
  function handleClick(event: { target: any } | undefined) {
    const { name, value } = event?.target;
    console.log(`name: ${name} value: ${value}`);
    const buttonClicked: SingleBookingSection = parseInt(value, 10);
    props.onConfirmation({ value: value });
    props.onNavigation({ buttonValue: buttonClicked });
  }
  return (
    <div>
      <Infobox bookingData={bookingData} />
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="submit-booking"
          value={SingleBookingSection.BookingConfirmed}
        >
          <span>Confirm Booking</span>
        </Button>
      </div>
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="return"
          value={SingleBookingSection.InputUserData}
          className="button-return"
        >
          <span>Return</span>
        </Button>
      </div>
    </div>
  );
}

export default PreBookingConfirmation;
