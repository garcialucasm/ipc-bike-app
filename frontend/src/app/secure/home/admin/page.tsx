import BookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/BookingsOverview"
import AvailabilityContainer from "@/components/Cards/AvailabilityContainer"
import withAuth from "@/app/auth/withAuth"
import ContainerSingleComponent from "@/components/Containers/ContainerSingleComponent"

const HomeAdmin = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <AvailabilityContainer />
        <BookingsOverview />
      </>
    )
  }
}

export default HomeAdmin
