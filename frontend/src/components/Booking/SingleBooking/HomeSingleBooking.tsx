"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { usePathname, useRouter } from "next/navigation"
import { NextPage } from "next"

import { SingleBookingSections } from "@/types/BookingType"
import { useSingleBookingContext } from "@/context/singleBooking"
import InputSingleBike from "@/components/Booking/SingleBooking/InputSingleBike"
import InputSingleUserData from "@/components/Booking/SingleBooking/InputSingleUserData"
import PreBookingConfirmation from "@/components/Booking/PreBookingConfirmation"
import BookingConfirmation from "@/components/Booking/BookingConfirmation"
import Stepper from "@/components/Stepper/Stepper"
import LoadingComponent from "@/components/Others/LoadingComponent"
import ContainerSingleComponent from "@/components/Containers/ContainerSingleComponent"
import { previousBookingsFetchApi } from "@/services/bookingApi"
import { getTokenFromCookies } from "@/app/auth/authUtils"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import { NavigationPaths } from "@/types/NavigationPaths"

const HomeSingleBooking: NextPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isSecure = pathname.includes("/secure/booking/")
  const {
    bookingData,
    settingBikeNumbering,
    settingBikeType,
    settingCurrentSection,
    settingServerResult,
    settingUserData,
  } = useSingleBookingContext()
  const currentSection = bookingData.currentSection
  const [hasOpenedBooking, setHasOpenedBoking] = useState(false)

  function checkSingleBookingDataCookie() {
    const cookieValue = Cookies.get("ipcBikeApp_singleBookingData")

    if (cookieValue) {
      const parsedData = JSON.parse(cookieValue)

      if (parsedData.firstName && parsedData.lastName && parsedData.room) {
        settingUserData({
          firstName: parsedData.firstName,
          lastName: parsedData.lastName,
          roomNumber: parsedData.room,
        })
      }
    } else {
      settingUserData({ firstName: "", lastName: "", roomNumber: "" })
    }
  }

  async function verifyOpenedBookingsByUser() {
    if (!isSecure) {
      try {
        const token = getTokenFromCookies("ipcBikeApp_previousBookings")
        if (token) {
          const result = await previousBookingsFetchApi(token)
          const userHasOpenedBookings =
            result.allBookings.length === 0 ? false : true
          setHasOpenedBoking(userHasOpenedBookings)
        }
      } catch { console.log("No previous Bookings were found")}
    }
  }

  useEffect(() => {
    checkSingleBookingDataCookie()
    settingBikeNumbering("")
    settingBikeType("")
    settingServerResult({ isConfirmed: null, resultMessage: "" })
    settingCurrentSection(SingleBookingSections.selectBikeSize)
    verifyOpenedBookingsByUser()
  }, [])

  return !isSecure && hasOpenedBooking ? (
    <>
      {
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
          <div className="grid min-w-72 max-w-md gap-y-4 rounded-2xl bg-white p-8 sm:min-w-96">
            <h2 className="text-lg font-semibold text-gray-800">
              Booking Limit Reached
            </h2>
            <p className="mt-4 text-gray-600">
              You already have an open booking. Only one booking per user is
              allowed.
            </p>
            <div className="mt-6 flex justify-end gap-x-3">
              <SecondaryButton
                onClick={() => router.replace(NavigationPaths.homeAppPublic)}
                className="btn-secondary w-full max-w-16"
              >
                OK
              </SecondaryButton>
            </div>
          </div>
        </div>
      }
    </>
  ) : (
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
