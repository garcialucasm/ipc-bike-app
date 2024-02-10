import React from "react"
import { BikeAvailabilityCard, BikeSize, BikeStatus } from "@/types/BikeType"
import Image from "next/image"
import StatusIndicator from "../../../Others/StatusIndicator"

function BikeChooserContainer(props: { bikeSize: BikeSize }) {
  const bikeSize = props.bikeSize
  let bikeSelectedImage: string
  let bikeSelectedFreeCount: number
  let bikeSelectedRecomendation: string
  let bikeSelectedStatusIndicator: BikeStatus

  switch (bikeSize) {
    case BikeSize.STANDARD:
      bikeSelectedImage = "/bike-type-standard.jpg"
      bikeSelectedFreeCount = 1
      bikeSelectedRecomendation =
        // TODO: Get right recommendation
        "Recommended for people 5'4\" | 163 cm or taller."
      break
    case BikeSize.CLASSIC:
      bikeSelectedImage = "/bike-type-classic.jpg"
      bikeSelectedFreeCount = 0
      bikeSelectedRecomendation =
        // TODO: Get right recommendation
        "Recommended for people 5'4\" | 163 cm or taller."
      break
    case BikeSize.SMALL:
      bikeSelectedImage = "/bike-type-folding.jpg"
      bikeSelectedFreeCount = 2
      bikeSelectedRecomendation =
        // TODO: Get right recommendation
        "Recommended for people 5'4\" | 163 cm or taller."
      break
    default:
      // Log an error or handle the unknown section
      console.error(`Unknown bike type: ${bikeSize}`)
      // Return a default step or handle as appropriate
      return
  }

  if (bikeSelectedFreeCount > 0) {
    bikeSelectedStatusIndicator = BikeStatus.FREE
  } else {
    bikeSelectedStatusIndicator = BikeStatus.DISABLED
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center px-3 py-2 text-xs text-slate-400">
        <StatusIndicator
          currentStatus={bikeSelectedStatusIndicator}
          isStatic={true}
        />
        <span className="px-1 font-medium">{bikeSelectedFreeCount}</span>{" "}
        available
      </div>
      <Image
        src={bikeSelectedImage}
        className="my-2 max-h-36 w-auto py-2"
        width={300}
        height={399}
        alt=""
      />
      <div className="w-full pb-4 text-xs text-slate-500">
        {bikeSelectedRecomendation}
      </div>
    </div>
  )
}

export default BikeChooserContainer
