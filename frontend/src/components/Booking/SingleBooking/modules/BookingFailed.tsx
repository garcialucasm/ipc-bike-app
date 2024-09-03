import Link from "next/link"

import { IconSvgFeedbackError } from "@/components/Others/IconsSvg"
import InfoboxSingleBookingDetails from "./InfoboxSingleBookingDetails"
import { NavigationPaths } from "@/types/NavigationPaths"

function BookingFailed(props: { errorMessage?: string }) {
  const errorMessage = props.errorMessage
  return (
    <>
      <div className="w-full pb-3">
        <div className="flex items-center justify-center py-3">
          <div className="px-2 font-bold">
            Booking Failed:{" "}
            {errorMessage !== ""
              ? errorMessage
              : "Something unexpected happened."}
          </div>{" "}
          <IconSvgFeedbackError
            fillColor="text-rose-500"
            height={"36"}
            width={"36"}
          />
        </div>
        {/* <div className="mb-4 block rounded-2xl bg-rose-100 py-2 text-center align-baseline text-sm font-medium text-rose-700">{`${(await result).error.toLowerCase()}`}</div> */}
        <div className="opacity-50">
          <InfoboxSingleBookingDetails />
        </div>
      </div>
      <div className="link-primary w-full">
        <Link href={NavigationPaths.homeAppSecure}>
          <span className="block px-4 py-2">Go to Main Page</span>
        </Link>
      </div>
    </>
  )
}

export default BookingFailed
