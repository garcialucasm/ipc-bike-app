import { useState, useEffect } from "react"
import { IconSvgLoader } from "@/components/Others/IconsSvg"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import ContainerSingleComponent from "@/components/Containers/ContainerSingleComponent"

export function ErrorBookingsOverview() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(loaderTimeout)
    }
  }, [])

  return (
    <>
      <ContainerSingleComponent>
        {loading ? (
          // Display loader icon while loading
          <IconSvgLoader height={"48"} fillColor="text-blue-800" />
        ) : (
          // Render content when loading is complete
          <>
            {" "}
            <p className="text-xs">
              Something unexpected happened. It was not possible to fetch active
              bookings. 😔
            </p>
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
    </>
  )
}
