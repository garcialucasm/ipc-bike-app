import { useState } from "react"
import Link from "next/link"

import { IconSvgProcessConfirmed } from "@/components/Others/IconsSvg"
import InfoboxSingleBookingDetails from "./InfoboxSingleBookingDetails"
import { NavigationPaths } from "@/types/NavigationPaths"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import NextSteps from "./NextSteps"

function BookingConfirmed() {
  const [showNextSteps, setShowNextSteps] = useState(false)

  return (
    <>
      <div className="flex items-center justify-center py-3">
        <div className="px-2 font-bold">Booking Confirmed</div>{" "}
        <IconSvgProcessConfirmed
          fillColor="text-green-500"
          height={"24"}
          width={"24"}
        />
      </div>
      <InfoboxSingleBookingDetails />
      <PrimaryButton
        className={
          showNextSteps
            ? `${"my-2 w-full rounded-3xl bg-gradient-to-tr from-blue-800 via-blue-800 to-blue-700 px-4 py-2 font-semibold text-white transition duration-700"}`
            : "btn-primary"
        }
        onClick={() => setShowNextSteps(!showNextSteps)}
      >
        <span>{showNextSteps ? "Next Steps" : "See Next Steps"}</span>
        <div className={` ${showNextSteps ? "block" : "hidden"}`}>
          <NextSteps />
        </div>
      </PrimaryButton>
      <div className="link-primary w-full">
        <Link href={NavigationPaths.rules}>
          <span className="block px-4 py-2">See the Rules</span>
        </Link>
      </div>
      <div className="link-secondary w-full">
        <Link href={NavigationPaths.homeApp}>
          <span className="block px-4 py-2">Go to Main Page</span>
        </Link>
      </div>
    </>
  )
}

export default BookingConfirmed
