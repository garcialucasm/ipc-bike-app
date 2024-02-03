"use client"

import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import InputSingleBikeSize from "@/components/SingleBooking/InputSingleBikeSize"
import InputSingleUserData from "@/components/SingleBooking/InputSingleUserData"

export default function HomeSingleBooking() {
  const { bookingData } = useSingleBookingContext()

  const currentSection = bookingData.currentSection

  return (
    <>
      <div className="mb-3 flex flex-col items-center text-center">
        <div className="container-webapp flex flex-col items-center pb-6">
          {/* <Stepper currentSection={currentSection} /> */}
          {currentSection === SingleBookingSections.selectBikeSize && (
            <InputSingleBikeSize />
          )}

          {currentSection === SingleBookingSections.inputUserData && (
            <InputSingleUserData />
          )}

          {currentSection === SingleBookingSections.preBookingConfirmation &&
            // <PreBookingConfirmation />
            "PreBookingConfirmation"}

          {currentSection === SingleBookingSections.bookingConfirmationStatus &&
            // <BookingConfirmation />
            "BookingConfirmation"}
        </div>
      </div>
    </>
  )
}
