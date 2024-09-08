import Link from "next/link"

import BookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/BookingsOverview"
import AvailabilityContainer from "@/components/Cards/AvailabilityContainer"
import { NavigationPaths } from "@/types/NavigationPaths"
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"

const HomeAppPublic = () => {
  return (
    <>
      <AvailabilityContainer />
      <BookingsOverview />
    </>
  )
}

export default HomeAppPublic
