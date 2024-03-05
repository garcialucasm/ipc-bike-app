import BookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/BookingsOverview"
import AvailabilityContainer from "@/components/Cards/AvailabilityContainer"
import withAuth from "@/app/auth/withAuth"

const HomeAdminPage = () => {
  const componentName = HomeAdminPage.name
  const isAuth = withAuth(componentName)
  if (isAuth) {
    return (
      <>
        <AvailabilityContainer />
        <BookingsOverview />
      </>
    )
  }
}

export default HomeAdminPage
