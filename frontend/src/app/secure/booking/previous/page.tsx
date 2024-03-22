import withAuth from "@/app/auth/withAuth"
import PreviousBookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/PreviousBookingsOverview"
import ReturnButton from "@/components/Buttons/ReturnButton"
import InstructionLabel from "@/components/Others/InstructionLabel"
import { NavigationPaths } from "@/types/NavigationPaths"
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft"
import Link from "next/link"

const PreviousBookings = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <InstructionLabel>
          <div className="flex items-center gap-2">
            <Link href={NavigationPaths.homeAppAdmin}>
              <ReturnButton />
            </Link>
            All Bookings
          </div>
        </InstructionLabel>
        <PreviousBookingsOverview />
      </>
    )
  }
}

export default PreviousBookings
