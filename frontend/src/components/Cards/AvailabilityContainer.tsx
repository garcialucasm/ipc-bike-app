"use client"

import React, { useEffect } from "react"

import { BikeStatus } from "@/types/BikeType"
import { bikeStatusCounterFetchApi } from "@/services/bikeApi"
import AvailabilityCard from "./AvailabilityCard"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"

type ServerResultBikeAvailability =
  | {
      data: {
        [BikeStatus.FREE]: number
        [BikeStatus.BOOKED]: number
        [BikeStatus.INUSE]: number
        [BikeStatus.DISABLED]: number
      }
      error: null
    }
  | {
      data: null
      error: string
    }

function AvailabilityContainer() {
  const { bikeAvailabilityCardData, settingBikeAvailabilityCardData } =
    useBikeAvailabilityContext()

  const getBikeCounterByStatus = async () => {
    try {
      const serverResult: ServerResultBikeAvailability =
        await bikeStatusCounterFetchApi()

      if (serverResult.data) {
        console.log(serverResult.data)
        settingBikeAvailabilityCardData({
          [BikeStatus.FREE]: serverResult.data[BikeStatus.FREE] | 0,
          [BikeStatus.BOOKED]: serverResult.data[BikeStatus.BOOKED] | 0,
          [BikeStatus.INUSE]: serverResult.data[BikeStatus.INUSE] | 0,
          [BikeStatus.DISABLED]: serverResult.data[BikeStatus.DISABLED] | 0,
        })
        console.log(serverResult.data)
        console.log(bikeAvailabilityCardData)
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
