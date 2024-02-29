import React from "react"

import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import { Bicycle, ClipboardText, IdentificationCard } from "@phosphor-icons/react"

function Stepper() {
  const { bookingData } = useSingleBookingContext()

  const currentSection = bookingData.currentSection

  return (
    <>
      <ol className="flex w-full items-center">
        <li
          className={`flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:content-['']
          ${
            currentSection === SingleBookingSections.bookingConfirmation ||
            currentSection === SingleBookingSections.inputUserData ||
            currentSection === SingleBookingSections.preBookingConfirmation
              ? "stepper-bar-is-done"
              : "stepper-bar-is-waiting"
          }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full md:h-12 md:w-12 ${
              currentSection === SingleBookingSections.bookingConfirmation ||
              currentSection === SingleBookingSections.inputUserData ||
              currentSection === SingleBookingSections.preBookingConfirmation ||
              currentSection === SingleBookingSections.selectBikeSize
                ? "stepper-icon-is-done"
                : "stepper-icon-is-waiting"
            }`}
          >
            <Bicycle size={28} />
          </span>
        </li>
        <li
          className={`flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:content-[''] ${
            currentSection === SingleBookingSections.bookingConfirmation ||
            currentSection === SingleBookingSections.preBookingConfirmation
              ? "stepper-bar-is-done"
              : "stepper-bar-is-waiting"
          }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full md:h-12 md:w-12 ${
              currentSection === SingleBookingSections.bookingConfirmation ||
              currentSection === SingleBookingSections.preBookingConfirmation
                ? "stepper-icon-is-done"
                : "stepper-icon-is-waiting"
            }`}
          >
            <IdentificationCard size={28} weight="fill" />
          </span>
        </li>
        <li className="flex w-auto items-center">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full md:h-12 md:w-12 ${
              currentSection === SingleBookingSections.bookingConfirmation
                ? "stepper-icon-is-done"
                : "stepper-icon-is-waiting"
            }`}
          >
            <ClipboardText size={28} weight="fill" />
          </span>
        </li>
      </ol>
    </>
  )
}

export default Stepper
