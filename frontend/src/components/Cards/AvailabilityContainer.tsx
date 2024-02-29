"use client"

import React, { useEffect } from "react"

import { BikeStatus } from "@/types/BikeType"
import AvailabilityCard from "./AvailabilityCard"
import {
  initialBikeStatusCount,
  useBikeAvailabilityContext,
} from "@/context/bikeAvailability"
import LoadingComponent from "../Others/LoadingComponent"

function AvailabilityContainer() {
  const {
    bikeStatusCount: bikeStatusCount,
    updatingBikeAvailability: getBikeAvailability,
  } = useBikeAvailabilityContext()

  useEffect(() => {
    getBikeAvailability()
  }, [])

  return (
    <>
      <div className="items-center overflow-x-auto w-full">
        {bikeStatusCount === initialBikeStatusCount ? (
          <LoadingComponent />
        ) : (
          <div className="flex w-full gap-4 overflow-x-auto pb-2">
            {[BikeStatus.FREE, BikeStatus.INUSE].map(
              (bikeStatus) => (
                <AvailabilityCard
                  key={bikeStatus}
                  selectedStatus={bikeStatus}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default AvailabilityContainer
