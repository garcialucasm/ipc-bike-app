"use client"

import React, { useEffect } from "react"

import { BikeStatus } from "@/types/BikeType"
import AvailabilityCard from "./AvailabilityCard"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"
import { IconSvgLoader } from "../Others/IconsSvg"

function AvailabilityContainer() {
  const {
    bikeAvailabilityData,
    updatingBikeAvailability: getBikeAvailability,
  } = useBikeAvailabilityContext()

  useEffect(() => {
    getBikeAvailability()
  }, [])

  return (
    <>
      <div className="container-webapp-size my-8 items-center overflow-x-auto">
        {bikeAvailabilityData ? (
          <>
            <div className="flex w-full gap-3 overflow-x-auto">
              {[BikeStatus.FREE, BikeStatus.BOOKED, BikeStatus.INUSE].map(
                (bikeStatus) => (
                  <AvailabilityCard
                    key={bikeStatus}
                    selectedStatus={bikeStatus}
                  />
                )
              )}
            </div>
          </>
        ) : (
          <IconSvgLoader height={"48"} fillColor="text-blue-800" />
        )}
      </div>
    </>
  )
}

export default AvailabilityContainer
