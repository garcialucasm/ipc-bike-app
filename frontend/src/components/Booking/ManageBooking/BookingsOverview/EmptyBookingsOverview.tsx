import { useEffect, useState } from "react"
import Link from "next/link"

import SecondaryButton from "@/components/Buttons/SecondaryButton"
import { NavigationPaths } from "@/types/NavigationPaths"
import { IconSvgLoader } from "@/components/Others/IconsSvg"

export function EmptyBookingsOverview() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false)
    }, 2000) // 2 seconds timeout

    return () => {
      clearTimeout(loaderTimeout)
    }
  }, [])

  return (
    <div className="container-page-webapp text-slate-600">
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
              href={NavigationPaths.singleBooking}
            >
              Single Booking
            </Link>{" "}
            or{" "}
            <Link
              className="font-medium text-blue-800"
              href={NavigationPaths.groupBooking}
            >
              Group Booking
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
    </div>
  )
}
