import Link from "next/link"

import BookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/BookingsOverview"
import AvailabilityContainer from "@/components/Cards/AvailabilityContainer"
import withAuth from "@/app/auth/withAuth"
import { NavigationPaths } from "@/types/NavigationPaths"
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"

const HomeAdmin = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <AvailabilityContainer />
        <BookingsOverview />
        <div className="flex w-full justify-start group">
          <Link
            href={NavigationPaths.previousBookings}
            className="flex items-center rounded-2xl px-2 text-sm text-blue-800 hover:text-blue-600"
          >
            See all bookings{" "}
            <span className="inline-block ps-2 transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
              <CaretRight size={16} />
            </span>
          </Link>
        </div>
      </>
    )
  }
}

export default HomeAdmin
