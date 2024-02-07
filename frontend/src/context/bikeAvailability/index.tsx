"use client"

import { createContext, useContext, useState } from "react"

import { BikeAvailabilityContextProps } from "@/types/ContextType"
import { BikeAvailabilityCard, BikeStatus } from "@/types/BikeType"

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
  const [bikeAvailabilityCardData, setBikeAvailabilityCardData] =
    useState<BikeAvailabilityCard>(initialBikeAvailability)

  const settingBikeAvailabilityCardData = (
    bikeAvailability: BikeAvailabilityCard
  ) => {
    try {
      setBikeAvailabilityCardData((prevBikeData) => ({
        ...prevBikeData,
        bikeAvailabilityData: bikeAvailability,
      }))
    } catch (error) {
      console.error("Error setting Current Section: " + error)
    }
  }

  return (
    <BikeAvailabilityContext.Provider
      value={{
        bikeAvailabilityCardData,
        settingBikeAvailabilityCardData,
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
