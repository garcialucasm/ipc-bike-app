import withAuth from "@/app/auth/withAuth"
import PreviousBookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/PreviousBookingsOverview"
import InstructionLabel from "@/components/Others/InstructionLabel"

const PreviousBookings = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <InstructionLabel>Previous Bookings</InstructionLabel>
        <PreviousBookingsOverview />
      </>
    )
  }
}

export default PreviousBookings
