"use client"

import React, { useEffect } from "react"

import { BikeStatus } from "@/types/BikeType"
import AvailabilityCard from "./AvailabilityCard"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"

function AvailabilityContainer() {
  const { updatingBikeAvailability: getBikeAvailability } =
    useBikeAvailabilityContext()

  useEffect(() => {
    getBikeAvailability()
  }, [])

  return (
    <>
      <div className="container-webapp-size my-8 items-center overflow-x-auto">
        <div className="flex w-full gap-3 overflow-x-auto">
          {[BikeStatus.FREE, BikeStatus.BOOKED, BikeStatus.INUSE].map(
            (bikeStatus) => (
              <AvailabilityCard key={bikeStatus} selectedStatus={bikeStatus} />
            )
          )}
        </div>
      </div>
    </>
  )
}

export default AvailabilityContainer
