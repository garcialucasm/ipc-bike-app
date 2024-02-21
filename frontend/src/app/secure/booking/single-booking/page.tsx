import HomeSingleBooking from "@/components/Booking/SingleBooking/HomeSingleBooking"
import withAuth from "@/app/auth/withAuth"

const SingleBooking = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return <HomeSingleBooking />
  }
}
export default SingleBooking
