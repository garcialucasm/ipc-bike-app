import React from "react";
import Button from "@/components/atoms/Button";
import { ManageBookingSection } from "@/types/NavigationSections";

function PreHandoverConfirmation(props: {
  onNavigation: (navigationButton: {
    buttonName: ManageBookingSection;
  }) => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    const buttonClicked: ManageBookingSection = name as ManageBookingSection;
    props.onNavigation({ buttonName: buttonClicked });
  }
  return (
    <div>
      <div>
        <Button
          onClick={handleClick}
          name={ManageBookingSection.handoverConfirmationStatus}
        >
          <span>Confirm Booking</span>
        </Button>
        <Button
          onClick={handleClick}
          name={ManageBookingSection.handoverConfirmationStatus}
        >
          <span>Cancel</span>
        </Button>
        <Button
          onClick={handleClick}
          name={ManageBookingSection.bookingsOverview}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
}

export default PreHandoverConfirmation;
