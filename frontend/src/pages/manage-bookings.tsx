import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderTemp from "@/components/organisms/HeaderTemp";
import AvailabilityContainer from "@/components/organisms/AvailabilityContainer";
import BookingsOverview from "@/components/organisms/BookingsOverview";
import { ManageBookingSection } from "@/types/NavigationSections";
import PreHandoverConfirmation from "@/components/templates/PreHandoverConfirmation";

function ManageBookings() {
  // Creating states for show of hide components
  const [currentSection, setCurrentSection] = useState<ManageBookingSection>(
    ManageBookingSection.goToBookingsOverview
  );

  // Statements to control navegation (next, submit & return buttons)
  const handleNavigation = (event: { buttonName: ManageBookingSection }) => {
    const buttonClicked: ManageBookingSection =
      ManageBookingSection[event.buttonName as ManageBookingSection];
    setCurrentSection(buttonClicked);
  };

  // TODO
  // Option to confirm/refuse Booking or Return to BookingsOverview
  function handleBookingConfirmation(event: { value: ManageBookingSection }) {
    return;
  }

  return (
    <div className="center-content">
      <HeaderTemp heading="Manage Bookings" />
      {currentSection === ManageBookingSection.goToBookingsOverview && (
        <>
          <AvailabilityContainer />
          <BookingsOverview />
          <Link href="/home-keykeeper">
            <div className="button-return">Return</div>
          </Link>
        </>
      )}
      {currentSection === ManageBookingSection.goToPreHandoverConfirmation && (
        <>
          <PreHandoverConfirmation onNavigation={handleNavigation} />
        </>
      )}
    </div>
  );
}

export default ManageBookings;
