import withAuth from "@/app/auth/withAuth"
import PreviousBookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/PreviousBookingsOverview"
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
            <Link
              href={NavigationPaths.homeAppAdmin}
              className="flex items-center rounded-xl border border-slate-400 p-2 text-sm hover:text-blue-600 hover:border-blue-400 hover:bg-slate-50 text-slate-400"
            >
              <span className="inline-block">
                <CaretLeft size={16} />
              </span>
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
