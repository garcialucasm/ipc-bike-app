import HomeSingleBooking from "@/components/Booking/SingleBooking/HomeSingleBooking"
import withAuth from "@/app/auth/withAuth"

const SingleBookingPage = () => {
  const componentName = SingleBookingPage.name
  const isAuth = withAuth()
  if (isAuth) {
    return <HomeSingleBooking />
  }
}
export default SingleBookingPage
