import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  IconSvgFeedbackError,
  IconSvgLoader,
  IconSvgProcessConfirmed,
} from "../Others/IconsSvg"
import InfoboxSingleBookingDetails from "./SingleBooking/modules/InfoboxSingleBookingDetails"
import PrimaryButton from "../Buttons/PrimaryButton"
import NextSteps from "./SingleBooking/modules/NextSteps"
import { useSingleBookingContext } from "@/context/singleBooking"
import { createSingleBookingFetchApi } from "@/services/bookingApi"
import { NavigationPaths } from "@/types/NavigationPaths"
import BookingFailed from "./SingleBooking/modules/BookingFailed"
import BookingConfirmed from "./SingleBooking/modules/BookingConfirmed"

function BookingConfirmation() {
  const { bookingData, settingServerResult } = useSingleBookingContext()
  const [isLoading, setIsLoading] = useState(true)
  const [responseState, setResponseState] = useState<any>({
    data: null,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!bookingData.serverResult) {
          const response = await createSingleBookingFetchApi(bookingData)

          // TODO: add more info into confirmation container as error or bike chosen
          // const bikeChosen = response.data?.data.booking.bike

          // Failed to fetch
          if (!response.data?.status) {
            throw new Error("Error fetching API: " + response.error)
          }

          // Successful fetch
          if (response.data?.status >= 200 && response.data?.status < 300) {
            settingServerResult(response.data?.status)
            setResponseState({ data: response.data?.data, error: null })
          } else {
            // Handle other response statuses if needed
            settingServerResult(response.data?.status)
          }
        }
      } catch (error) {
        // Handle errors, e.g., log or display an error message
        console.error("Error fetching data:", error)
        setResponseState({ data: null, error: error })
        settingServerResult(500)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, []) // Ensure useEffect runs only once

  // Render when is loading
  if (isLoading) {
    return (
      <>
        <IconSvgLoader height={"48"} fillColor="text-blue-800" />
      </>
    )
  }

  // Render if booking is confirmed
  else if (
    !isLoading &&
    bookingData.serverResult &&
    bookingData.serverResult >= 200 &&
    bookingData.serverResult < 300
  ) {
    return <BookingConfirmed />
  }

  // Render if there are any errors
  else if (
    !isLoading &&
    (!responseState.data ||
      responseState.data.status < 200 ||
      responseState.data.status >= 300)
  ) {
    return <BookingFailed />
  }

  // Default return in case none of the conditions are met
  else return null
}

export default BookingConfirmation
