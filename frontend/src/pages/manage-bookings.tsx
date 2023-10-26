import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderTemp from "@/containers/HeaderTemp";
import AvailabilityContainer from "@/containers/AvailabilityContainer";
import BookingsOverview from "@/containers/BookingsOverview";
import { ManageBookingSection } from "@/types/NavigationSections";
import PreHandoverConfirmation from "@/containers/PreHandoverConfirmation";

function ManageBookings() {
  // Creating states for show of hide components
  const [currentSection, setCurrentSection] = useState<ManageBookingSection>(
    ManageBookingSection.BookingsOverview
  );

  // Statements to control navegation (next, submit & return buttons)
  const handleNavigation = (event: { buttonValue: ManageBookingSection }) => {
    const valueButtonClicked: ManageBookingSection = event.buttonValue;
    setCurrentSection(valueButtonClicked);
  };

  // Correct me
  // Option to confirm/refuse Booking or Return to BookingsOverview
  function handleBookingConfirmation(event: { value: ManageBookingSection }) {
    return;
  }

  return (
    <div className="container center-content">
      <HeaderTemp heading="Manage Bookings" />

      {currentSection === ManageBookingSection.BookingsOverview && (
        <>
          <AvailabilityContainer />
          <BookingsOverview />
          <Link href="/home-keykeeper">
            <div className="button-return">Return</div>
          </Link>
        </>
      )}
      {currentSection === ManageBookingSection.PreHandoverConfirmation && (
        <>
          <PreHandoverConfirmation
            onNavigation={handleNavigation}
            onConfirmation={handleBookingConfirmation}
          />
        </>
      )}
    </div>
  );
}

export default ManageBookings;
