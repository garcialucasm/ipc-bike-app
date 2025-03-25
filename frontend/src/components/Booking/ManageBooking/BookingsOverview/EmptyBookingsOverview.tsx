import { useEffect, useState } from "react"
import Link from "next/link"

import SecondaryButton from "@/components/Buttons/SecondaryButton"
import { NavigationPaths } from "@/types/NavigationPaths"
import { IconSvgLoader } from "@/components/Others/IconsSvg"
import ContainerSingleComponent from "@/components/Containers/ContainerSingleComponent"
import { useAuth } from "@/context/auth"
import { ArrowsClockwise } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise"
import { PersonSimpleBike } from "@phosphor-icons/react/dist/ssr/PersonSimpleBike"

export function EmptyBookingsOverview() {
  const [loading, setLoading] = useState(true)
  const { accountData } = useAuth()
  const isAuth = accountData?.isAuthenticated || false

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => {
      clearTimeout(loaderTimeout)
    }
  }, [])

  return (
    <ContainerSingleComponent>
      {loading ? (
        // Display loader icon while loading
        <IconSvgLoader height={"48"} fillColor="text-blue-800" />
      ) : (
        // Render content when loading is complete
        <>
          <p className="text-pretty p-2">There are no active bookings. 😊</p>
          <p className="text-pretty p-2">
            To create a new one, please go to the{" "}
            <Link
              className="font-medium text-blue-800"
              href={
                isAuth
                  ? NavigationPaths.singleBookingSecure
                  : NavigationPaths.singleBookingPublic
              }
              prefetch={false}
            >
              Booking
            </Link>{" "}
            section or click the button below.
          </p>{" "}
          <div className="flex gap-x-4 pt-8">
            <Link
              className="btn-primary"
              href={
                isAuth
                  ? NavigationPaths.singleBookingSecure
                  : NavigationPaths.singleBookingPublic
              }
            >
              <span className="flex items-center gap-x-2 px-2">
                <PersonSimpleBike size={24} />
                <span>Booking</span>
              </span>
            </Link>
            <SecondaryButton
              className="btn-secondary w-fit rounded-full"
              onClick={() => window.location.reload()}
            >
              <span className="flex items-center gap-x-2 px-2">
                <ArrowsClockwise size={24} />
                <span>Refresh</span>
              </span>
            </SecondaryButton>
          </div>
        </>
      )}
    </ContainerSingleComponent>
  )
}
