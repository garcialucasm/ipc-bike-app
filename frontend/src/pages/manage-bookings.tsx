import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderWebApp from "@/components/organisms/HeaderWebApp";
import AvailabilityContainer, {
  AvailabilityConfig,
} from "@/components/organisms/AvailabilityContainer";
import BookingsOverview from "@/components/organisms/BookingsOverview";
import { ManageBookingSection, MenuNavigation } from "@/types/NavigationSections";
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
    <div className="flex flex-col items-center text-center">
      <div className="container-webapp flex flex-col items-center">
        <HeaderWebApp
          headingTitle={"Welcome, Lorem Ipsum"}
          headingSubTitle="Lorem ipsum is placeholder text commonly used"
          currentPage={MenuNavigation.homePage}
        />
        <div className="w-11/12  flex flex-col items-center">
          {currentSection === ManageBookingSection.bookingsOverview && (
            <>
              <AvailabilityContainer
                availabilitySelection={availabilityShowSelection}
              />
              
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
