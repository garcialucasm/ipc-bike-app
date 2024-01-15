import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import { SingleBookingSection } from "@/types/NavigationSections";
import Infobox from "../organisms/Infobox";
import { Booking } from "@/types/BookingType";

function PreBookingConfirmation(props: {
  onNavigation: (navigationButton: {
    buttonName: SingleBookingSection;
  }) => void;
  bookingData: Booking;
}) {
  const bookingData = props.bookingData;

  const [isTermsAndConditionsChecked, setIsTermsAndConditionsChecked] =
    useState(false);

  const [itemNeedsAttention, setItemNeedsAttention] = useState(false);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTermsAndConditionsChecked(event.target.checked);
    setItemNeedsAttention(false);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { name } = event.currentTarget;
    const buttonClicked: SingleBookingSection = name as SingleBookingSection;
    if (buttonClicked === SingleBookingSection.inputUserData) {
      props.onNavigation({ buttonName: buttonClicked });
    } else if (
      buttonClicked === SingleBookingSection.bookingConfirmationStatus
    ) {
      if (isTermsAndConditionsChecked) {
        props.onNavigation({ buttonName: buttonClicked });
      } else {
        setItemNeedsAttention(true); // Trigger attention when Confirm Booking is clicked without checking the checkbox
      }
    }
  }
  return (
    <div className="flex flex-col items-center w-11/12">
      <div className="w-full pb-3">
        <div className="instruction-label">Booking Details</div>
        <Infobox bookingData={bookingData} />
      </div>
      <div className="w-full flex items-center justify-start mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={isTermsAndConditionsChecked}
          onChange={handleCheckboxChange}
          className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl ${
            itemNeedsAttention ? "ring-1 ring-red-400" : ""
          }`}
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm text-gray-700"
        >
          I agree to the{" "}
          <a href="/" target="_blank">
            <span className="text-blue-700">terms and conditions</span>.
          </a>
        </label>
      </div>
      <Button
        onClick={handleClick}
        name={SingleBookingSection.bookingConfirmationStatus}
        className={
          isTermsAndConditionsChecked ? `btn-primary` : `btn-primary-discrete`
        }
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
