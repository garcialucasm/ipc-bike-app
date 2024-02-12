import BookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/BookingsOverview"
import AvailabilityContainer from "@/components/Cards/AvailabilityContainer"
import { NextPage } from "next"

const HomeAdmin: NextPage = () => {
  return (
    <>
      <AvailabilityContainer />
      <BookingsOverview />
    </>
  )
}

export default HomeAdmin
