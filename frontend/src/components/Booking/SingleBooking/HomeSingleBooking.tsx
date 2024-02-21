"use client"

import { useEffect } from "react"
import { NextPage } from "next"

import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import InputSingleBikeSize from "@/components/Booking/SingleBooking/InputSingleBikeSize"
import InputSingleUserData from "@/components/Booking/SingleBooking/InputSingleUserData"
import PreBookingConfirmation from "@/components/Booking/PreBookingConfirmation"
import BookingConfirmation from "@/components/Booking/BookingConfirmation"
import Stepper from "@/components/Stepper/Stepper"
import LoadingComponent from "@/components/Others/LoadingComponent"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"

const HomeSingleBooking: NextPage = () => {
  const {
    bookingData,
    settingBikeNumbering,
    settingCurrentSection,
    settingServerResult,
    settingUserData,
  } = useSingleBookingContext()

  const { updatingAllBikesAvailable } = useBikeAvailabilityContext()

  const currentSection = bookingData.currentSection

  useEffect(() => {
    settingBikeNumbering("")
    settingUserData({ firstName: "", lastName: "", roomNumber: "" })
    settingServerResult(null)
    settingCurrentSection(SingleBookingSections.selectBikeSize)
    updatingAllBikesAvailable()
  }, [])

  return (
    <>
      <div className="container-page-webapp">
        <div className="container-subpage-webapp">
          <Stepper />
          {currentSection === SingleBookingSections.selectBikeSize && (
            <InputSingleBikeSize />
          )}

          {currentSection === SingleBookingSections.inputUserData && (
            <InputSingleUserData />
          )}

          {currentSection === SingleBookingSections.preBookingConfirmation && (
            <PreBookingConfirmation />
          )}

          {currentSection === SingleBookingSections.isLoading && (
            <LoadingComponent />
          )}

          {currentSection === SingleBookingSections.bookingConfirmation && (
            <BookingConfirmation />
          )}
        </div>
      </div>
    </>
  )
}
export default HomeSingleBooking
