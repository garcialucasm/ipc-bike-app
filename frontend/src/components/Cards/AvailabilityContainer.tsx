"use client"

import React, { useEffect } from "react"

import { BikeStatus } from "@/types/BikeType"
import { bikeStatusCounterFetchApi } from "@/services/bikeApi"
import AvailabilityCard from "./AvailabilityCard"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"

type ServerResultBikeAvailability =
  | {
      data: {
        free: number
        booked: number
        inUse: number
        disabled: number
      }
      error: null
    }
  | {
      data: null
      error: string
    }

function AvailabilityContainer() {
  const { settingBikeAvailabilityCardData } = useBikeAvailabilityContext()

  const getBikeCounterByStatus = async () => {
    try {
      const serverResult: ServerResultBikeAvailability =
        await bikeStatusCounterFetchApi()

      if (serverResult.data) {
        settingBikeAvailabilityCardData({
          [BikeStatus.FREE]: serverResult.data.free,
          [BikeStatus.BOOKED]: serverResult.data.booked,
          [BikeStatus.INUSE]: serverResult.data.inUse,
          [BikeStatus.DISABLED]: serverResult.data.disabled,
        })
      } else {
        console.error("Unable to fetch bike counter data")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getBikeCounterByStatus()
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
