import { useSingleBookingContext } from "@/context/singleBooking"
import BookingFailed from "./SingleBooking/modules/BookingFailed"
import BookingConfirmed from "./SingleBooking/modules/BookingConfirmed"

function BookingConfirmation() {
  const { bookingData } = useSingleBookingContext()
  const isConfirmed = bookingData.serverResult?.isConfirmed

  return isConfirmed && isConfirmed ? (
    <BookingConfirmed />
  ) : (
    <BookingFailed errorMessage={bookingData.serverResult?.resultMessage} />
  )
}
export default BookingConfirmation
