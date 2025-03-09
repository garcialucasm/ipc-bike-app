import ComponentTitle from "@/components/Others/ComponentTitle"
import PreviousBookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/PreviousBookingsOverview"
import withAuth from "@/app/auth/withAuth"

const PreviousBookings = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <ComponentTitle>All Bookings</ComponentTitle>
        <PreviousBookingsOverview />
      </>
    )
  }
}

export default PreviousBookings
