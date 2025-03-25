import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { IconSvgProcessConfirmed } from "@/components/Others/IconsSvg"
import InfoboxSingleBookingDetails from "./InfoboxSingleBookingDetails"
import { NavigationPaths } from "@/types/NavigationPaths"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import NextSteps from "./NextSteps"
import Countdown from "@/components/Countdown/Countdown"
import Button from "@/components/Buttons/Button"
import InformativeModal from "@/components/Modal/InformativeModal"
import TermsOfServiceContent from "@/components/TermsOfServiceContent/TermsOfServiceContent"

function BookingConfirmed() {
  const [showNextSteps, setShowNextSteps] = useState(true)
  const pathname = usePathname()
  const isSecure = pathname.includes("/secure/")
  const expirationTime =
    process.env.NEXT_PUBLIC_BOOKING_EXPIRATION_TIME &&
    parseInt(process.env.NEXT_PUBLIC_BOOKING_EXPIRATION_TIME)
  const [isModalTermsOfServiceOpen, setIsModalTermsOfServiceOpen] =
    useState<boolean>(false)

  const handleOpenTermsOfServiceModal = () => {
    setIsModalTermsOfServiceOpen(true!)
  }

  const handleCloseTermsOfServiceModal = () => {
    setIsModalTermsOfServiceOpen(false!)
  }

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
      <div className="grid gap-y-2 rounded-xl border bg-white px-8 py-4">
        <div className="text-sm">
          Time remaining for your booking to be approved. Otherwise, your
          reservation will be automatically cancelled in:
        </div>
        {expirationTime && <Countdown duration={expirationTime} />}
      </div>
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
        <Button
          onClick={handleOpenTermsOfServiceModal}
          name="modalTermsOfService"
        >
          <span className="block px-4 py-2">See the Rules</span>
        </Button>
      </div>
      <div className="link-secondary w-full">
        <Link
          href={
            isSecure
              ? NavigationPaths.homeAppSecure
              : NavigationPaths.homeAppPublic
          }
        >
          <span className="block px-4 py-2">Go to Home Page</span>
        </Link>
      </div>
      <InformativeModal
        modalTitle="Terms of Service"
        isOpen={isModalTermsOfServiceOpen}
        onClose={handleCloseTermsOfServiceModal}
      >
        <TermsOfServiceContent />
      </InformativeModal>
    </>
  )
}

export default BookingConfirmed
