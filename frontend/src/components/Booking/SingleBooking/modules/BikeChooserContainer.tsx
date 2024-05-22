import { useState, useEffect } from "react"
import { BikeType, BikeStatus } from "@/types/BikeType"
import Image from "next/image"
import StatusIndicator from "../../../Others/StatusIndicator"

function BikeChooserContainer(props: {
  bikeCount: number | undefined
  bikeType: BikeType
  isImageSliding: boolean
}) {
  const { bikeType: bikeType, isImageSliding, bikeCount } = props

  const [currentImage, setCurrentImage] = useState<string>("")
  const [bikeSelectedRecomendation, setBikeSelectedRecomendation] =
    useState<string>("")
  const [bikeSelectedStatusIndicator, setBikeSelectedStatusIndicator] =
    useState<BikeStatus>(BikeStatus.DISABLED)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      switch (bikeType) {
        case BikeType.ALL:
          setCurrentImage("/bike-type-all.jpg")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        case BikeType.CITY:
          setCurrentImage("/bike-type-standard.jpg")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        case BikeType.CLASSIC:
          setCurrentImage("/bike-type-classic.jpg")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        case BikeType.FOLDING:
          setCurrentImage("/bike-type-folding.jpg")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        default:
          // Log an error or handle the unknown section
          console.error(`Unknown bike type: ${bikeType}`)
          // Return a default step or handle as appropriate
          return
      }

      if (bikeCount && bikeCount > 0) {
        setBikeSelectedStatusIndicator(BikeStatus.FREE)
      } else {
        setBikeSelectedStatusIndicator(BikeStatus.DISABLED)
      }
    }, 350)

    return () => clearTimeout(timeoutId) // Cleanup timeout on component unmount or re-render
  }, [bikeType])

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex flex-row items-center px-3 text-xs text-slate-400">
        <StatusIndicator
          currentStatus={bikeSelectedStatusIndicator}
          isStatic={true}
        />
        <span className="px-1 font-medium">{bikeCount}</span> available
      </div>
      <div
        className={`min-h-36 transform transition-transform duration-500 ease-in-out sm:min-h-48 ${
          isImageSliding ? "translate-x-[450px]" : "translate-x-0"
        }`}
      >
        <Image
          src={currentImage}
          className="max-h-36 w-auto py-2 sm:max-h-48"
          width={720}
          height={432}
          alt=""
          priority
        />
      </div>
      {/* <div className="w-full pb-4 text-xs text-slate-500">
        {bikeSelectedRecomendation}
      </div> */}
    </div>
  )
}

export default BikeChooserContainer
