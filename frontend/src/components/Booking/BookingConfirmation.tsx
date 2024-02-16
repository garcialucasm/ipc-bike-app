import React from "react"

import { useSingleBookingContext } from "@/context/singleBooking"
import BookingFailed from "./SingleBooking/modules/BookingFailed"
import BookingConfirmed from "./SingleBooking/modules/BookingConfirmed"

function BookingConfirmation() {
  const { bookingData } = useSingleBookingContext()
  const serverResult = bookingData.serverResult

  console.log(serverResult)

  return serverResult && serverResult >= 200 && serverResult < 300 ? (
    <BookingConfirmed />
  ) : (
    <BookingFailed />
  )
}
export default BookingConfirmation
