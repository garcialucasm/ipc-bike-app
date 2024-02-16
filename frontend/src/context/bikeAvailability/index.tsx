"use client"

import { createContext, useContext, useEffect, useState } from "react"

import { BikeAvailabilityContextProps } from "@/types/ContextType"
import { BikeAvailabilityCard, BikeStatus } from "@/types/BikeType"
import { getBikeAvailability } from "@/services/bikeApi"

// Creating initial state for bike availability data
export const initialBikeAvailability: BikeAvailabilityCard = {
  [BikeStatus.BOOKED]: 0,
  [BikeStatus.INUSE]: 0,
  [BikeStatus.FREE]: 0,
  [BikeStatus.DISABLED]: 0,
}

const BikeAvailabilityContext = createContext<BikeAvailabilityContextProps>(
  {} as BikeAvailabilityContextProps
)

const BikeAvailabilityProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Creating state to manage bike availability data
  const [bikeAvailabilityData, setBikeAvailabilityData] =
    useState<BikeAvailabilityCard>(initialBikeAvailability)

  const updatingBikeAvailability = async () => {
    const serverResult = await getBikeAvailability()
    if (serverResult.data) {
      setBikeAvailabilityData({
        [BikeStatus.FREE]: serverResult.data[BikeStatus.FREE] | 0,
        [BikeStatus.BOOKED]: serverResult.data[BikeStatus.BOOKED] | 0,
        [BikeStatus.INUSE]: serverResult.data[BikeStatus.INUSE] | 0,
        [BikeStatus.DISABLED]: serverResult.data[BikeStatus.DISABLED] | 0,
      })
    } else {
      console.error("Unable to fetch bike counter data")
    }
  }

  return (
    <BikeAvailabilityContext.Provider
      value={{
        bikeAvailabilityData,
        updatingBikeAvailability,
      }}
    >
      <>{children}</>
    </BikeAvailabilityContext.Provider>
  )
}

const useBikeAvailabilityContext = () => {
  const context = useContext(BikeAvailabilityContext)
  return context
}

export {
  BikeAvailabilityContext,
  BikeAvailabilityProvider,
  useBikeAvailabilityContext,
}
