import { useEffect, useState } from "react"
import Link from "next/link"

import SecondaryButton from "@/components/Buttons/SecondaryButton"
import { NavigationPaths } from "@/types/NavigationPaths"
import { IconSvgLoader } from "@/components/Others/IconsSvg"
import ContainerSingleComponent from "@/components/Containers/ContainerSingleComponent"
import { useAuth } from "@/context/auth"

export function EmptyBookingsOverview() {
  const [loading, setLoading] = useState(true)
  const { accountData } = useAuth()
  const isAuth = accountData?.isAuthenticated || false

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false)
    }, 2000) // 2 seconds timeout

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
              Single Booking
            </Link>{" "}
            section.
          </p>{" "}
          <span className="pt-8">
            <SecondaryButton
              className="btn-secondary w-fit"
              onClick={() => window.location.reload()}
            >
              Refresh
            </SecondaryButton>
          </span>
        </>
      )}
    </ContainerSingleComponent>
  )
}
