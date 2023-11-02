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
    const buttonClicked: ManageBookingSection =
      ManageBookingSection[name as ManageBookingSection];
    props.onNavigation({ buttonName: buttonClicked });
  }
  return (
    <div>
      <div>
        <Button
          onClick={handleClick}
          name={ManageBookingSection.goToHandoverConfirmationStatus}
        >
          <span>Confirm Booking</span>
        </Button>
        <Button
          onClick={handleClick}
          name={ManageBookingSection.goToHandoverConfirmationStatus}
        >
          <span>Cancel</span>
        </Button>
        <Button
          onClick={handleClick}
          name={ManageBookingSection.goToBookingsOverview}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
}

export default PreHandoverConfirmation;
