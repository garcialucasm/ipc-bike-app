import React, { useEffect, useMemo, useState } from "react"

import { IconSvgLoader } from "../Others/IconsSvg"
import { useSingleBookingContext } from "@/context/singleBooking"
import { createSingleBookingFetchApi } from "@/services/bookingApi"
import BookingFailed from "./SingleBooking/modules/BookingFailed"
import BookingConfirmed from "./SingleBooking/modules/BookingConfirmed"
import { joinFirstLastName } from "@/utils/validators"
import { SingleBookingDTO, SingleBookingProps } from "@/types/BookingType"
import { UserData } from "@/types/UserType"
import { BikeSize } from "@/types/BikeType"

function singleBookingDTO(userData: UserData, bikeSize: BikeSize) {
  const userName: string = joinFirstLastName(
    userData.firstName,
    userData.lastName
  )
  const room: string = userData.roomNumber
  const singleBookingData: SingleBookingDTO = {
    userName: userName,
    room: room,
    bikeSize: bikeSize,
  }
  return singleBookingData
}

function BookingConfirmation() {
  const { bookingData, settingServerResult } = useSingleBookingContext()
  const [isLoading, setIsLoading] = useState(true)
  const [responseState, setResponseState] = useState<any>({
    data: null,
    error: null,
  })

  const userData = bookingData.userData
  const bikeSize = bookingData.bikeSize

  const singleBookingData = useMemo(
    () => singleBookingDTO(userData, bikeSize),
    [userData, bikeSize]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createSingleBookingFetchApi(singleBookingData)

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
