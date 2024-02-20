import React, { useState, useEffect } from "react"
import { BikeSize, BikeStatus } from "@/types/BikeType"
import Image from "next/image"
import StatusIndicator from "../../../Others/StatusIndicator"

function BikeChooserContainer(props: {
  bikeCount: number | undefined
  bikeSize: BikeSize
  isImageSliding: boolean
}) {
  const { bikeSize, isImageSliding, bikeCount } = props

  const [currentImage, setCurrentImage] = useState<string>("")
  const [bikeSelectedRecomendation, setBikeSelectedRecomendation] =
    useState<string>("")
  const [bikeSelectedStatusIndicator, setBikeSelectedStatusIndicator] =
    useState<BikeStatus>(BikeStatus.DISABLED)

  useEffect(() => {
    // Update image after 250ms
    const timeoutId = setTimeout(() => {
      switch (bikeSize) {
        case BikeSize.ALL:
          setCurrentImage("/bike-type-all.png")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        case BikeSize.STANDARD:
          setCurrentImage("/bike-type-standard.jpg")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        case BikeSize.LARGE:
          setCurrentImage("/bike-type-classic.jpg")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        case BikeSize.SMALL:
          setCurrentImage("/bike-type-folding.jpg")
          setBikeSelectedRecomendation(
            "Recommended for people 5'4\" | 163 cm or taller."
          )
          break
        default:
          // Log an error or handle the unknown section
          console.error(`Unknown bike type: ${bikeSize}`)
          // Return a default step or handle as appropriate
          return
      }

      if (bikeCount && bikeCount > 0) {
        setBikeSelectedStatusIndicator(BikeStatus.FREE)
      } else {
        setBikeSelectedStatusIndicator(BikeStatus.DISABLED)
      }
    }, 300)

    return () => clearTimeout(timeoutId) // Cleanup timeout on component unmount or re-render
  }, [bikeSize])

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center px-3 py-2 text-xs text-slate-400">
        <StatusIndicator
          currentStatus={bikeSelectedStatusIndicator}
          isStatic={true}
        />
        <span className="px-1 font-medium">{bikeCount}</span> available
      </div>
      <div
        className={`transform transition-transform duration-500 ease-in-out ${
          isImageSliding ? "translate-x-[350px]" : "translate-x-0"
        }`}
      >
        <Image
          src={currentImage}
          className="my-2 max-h-36 w-auto py-2"
          width={300}
          height={399}
          alt=""
        />
      </div>
      <div className="w-full pb-4 text-xs text-slate-500">
        {bikeSelectedRecomendation}
      </div>
    </div>
  )
}

export default BikeChooserContainer
