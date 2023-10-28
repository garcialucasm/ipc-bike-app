import React from "react";
import Button from "@/components/atoms/Button";
import { ManageBookingSection } from "@/types/NavigationSections";

function PreHandoverConfirmation(props: {
  onConfirmation: (submitButton: { value: ManageBookingSection }) => void;
  onNavigation: (navigationButton: {
    buttonValue: ManageBookingSection;
  }) => void;
}) {
  function handleClick(event: { target: any } | undefined) {
    const { name, value } = event?.target;
    console.log(`name: ${name} value: ${value}`);
    const buttonClicked: ManageBookingSection = parseInt(value, 10);
    props.onConfirmation({ value: value });
    props.onNavigation({ buttonValue: buttonClicked });
  }
  return (
    <div>
      <div>
        <Button
          onClick={handleClick}
          type="submit"
          name="submit-handover"
          textInside="Confirm Handover"
          value={ManageBookingSection.HandoverConfirmed}
        />
        <Button
          onClick={handleClick}
          type="submit"
          name="refuse-handover"
          textInside="Confirm Handover"
          value={ManageBookingSection.HandoverRefused}
        />
        <Button
          onClick={handleClick}
          type="submit"
          name="return"
          textInside="Return"
          value={ManageBookingSection.BookingsOverview}
          customClasses="button-return"
        />
      </div>
    </div>
  );
}

export default PreHandoverConfirmation;
