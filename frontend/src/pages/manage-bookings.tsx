import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderTemp from "@/components/organisms/HeaderTemp";
import AvailabilityContainer, {
  AvailabilityConfig,
} from "@/components/organisms/AvailabilityContainer";
import BookingsOverview from "@/components/organisms/BookingsOverview";
import { ManageBookingSection } from "@/types/NavigationSections";
import PreHandoverConfirmation from "@/components/templates/PreHandoverConfirmation";

const availabilityShowSelection = AvailabilityConfig.ManageBookings;

function ManageBookings() {
  // Creating states for show of hide components
  const [currentSection, setCurrentSection] = useState<ManageBookingSection>(
    ManageBookingSection.bookingsOverview
  );

  // Statements to control navegation (next, submit & return buttons)
  const handleNavigation = (event: { buttonName: ManageBookingSection }) => {
    const buttonClicked: ManageBookingSection =
      event.buttonName as ManageBookingSection;
    setCurrentSection(buttonClicked);
  };

  // TODO
  // Option to confirm/refuse Booking or Return to BookingsOverview
  function handleBookingConfirmation(event: { value: ManageBookingSection }) {
    return;
  }

  return (
    <div className="flex flex-col items-center text-center h-screen">
      <div className="card-layout flex flex-col items-center">
        <HeaderTemp heading="Manage Bookings" />
        <div className="w-11/12 flex flex-col items-center">
          {currentSection === ManageBookingSection.bookingsOverview && (
            <>
              <AvailabilityContainer
                availabilitySelection={availabilityShowSelection}
              />
              <BookingsOverview />
              <Link href="/home-keykeeper">
                <div className="btn-return">Return</div>
              </Link>
            </>
          )}
          {currentSection === ManageBookingSection.preHandoverConfirmation && (
            <>
              <PreHandoverConfirmation onNavigation={handleNavigation} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageBookings;
