import React from "react";
import Button from "@/components/Button";
import { SingleBookingSection } from "@/types/NavigationSections";

function PreBookingConfirmation(props: {
  onConfirmation: (submitButton: { value: SingleBookingSection }) => void;
  onNavigation: (navigationButton: {
    buttonValue: SingleBookingSection;
  }) => void;
}) {
  function handleClick(event: { target: any } | undefined) {
    const { name, value } = event?.target;
    console.log(`name: ${name} value: ${value}`);
    const buttonClicked: SingleBookingSection = parseInt(value, 10);
    props.onConfirmation({ value: value });
    props.onNavigation({ buttonValue: buttonClicked });
  }
  return (
    <div className="container">
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="submit-booking"
          textInside="Confirm Booking"
          value={SingleBookingSection.BookingConfirmed}
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="return"
          textInside="Return"
          value={SingleBookingSection.InputUserData}
          customClasses="button-return"
        />
      </div>
    </div>
  );
}

export default PreBookingConfirmation;
