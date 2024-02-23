"use client"

import { useEffect } from "react"
import { NextPage } from "next"

import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import InputSingleBike from "@/components/Booking/SingleBooking/InputSingleBike"
import InputSingleUserData from "@/components/Booking/SingleBooking/InputSingleUserData"
import PreBookingConfirmation from "@/components/Booking/PreBookingConfirmation"
import BookingConfirmation from "@/components/Booking/BookingConfirmation"
import Stepper from "@/components/Stepper/Stepper"
import LoadingComponent from "@/components/Others/LoadingComponent"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"
import ContainerSingleComponent from "@/components/Containers/ContainerSingleComponent"

const HomeSingleBooking: NextPage = () => {
  const {
    bookingData,
    settingBikeNumbering,
    settingBikeType,
    settingCurrentSection,
    settingServerResult,
    settingUserData,
  } = useSingleBookingContext()

  const { updatingAllBikesAvailable } = useBikeAvailabilityContext()

  const currentSection = bookingData.currentSection

  useEffect(() => {
    settingBikeNumbering("")
    settingBikeType("")
    settingUserData({ firstName: "", lastName: "", roomNumber: "" })
    settingServerResult(null)
    settingCurrentSection(SingleBookingSections.selectBikeSize)
    updatingAllBikesAvailable()
  }, [])

  return (
    <>
      <Stepper />
      <ContainerSingleComponent>
        {currentSection === SingleBookingSections.selectBikeSize && (
          <InputSingleBike />
        )}

        {currentSection === SingleBookingSections.inputUserData && (
          <InputSingleUserData />
        )}

        {currentSection === SingleBookingSections.preBookingConfirmation && (
          <PreBookingConfirmation />
        )}

        {currentSection == SingleBookingSections.isLoading && (
          <LoadingComponent />
        )}

        {currentSection === SingleBookingSections.bookingConfirmation && (
          <BookingConfirmation />
        )}
      </ContainerSingleComponent>
    </>
  )
}
export default HomeSingleBooking
