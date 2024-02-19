"use client"

import React, { useEffect } from "react"

import { BikeStatus } from "@/types/BikeType"
import AvailabilityCard from "./AvailabilityCard"
import {
  initialBikeAvailability,
  useBikeAvailabilityContext,
} from "@/context/bikeAvailability"
import LoadingComponent from "../Others/LoadingComponent"

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
      <div className="container-webapp-size items-center overflow-x-auto pt-8">
        {bikeAvailabilityData === initialBikeAvailability ? (
          <LoadingComponent />
        ) : (
          <div className="mb-6 flex w-full gap-3 overflow-x-auto pb-2">
            {[BikeStatus.FREE, BikeStatus.BOOKED, BikeStatus.INUSE].map(
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
