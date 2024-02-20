"use client"

import { createContext, useContext, useState } from "react"

import { BikeAvailabilityContextProps } from "@/types/ContextType"
import {
  BikeStatusCard,
  BikeStatus,
  Bike,
  AllBikesAvailable,
} from "@/types/BikeType"
import { getAllBikesAvailable, getBikeStatusCount } from "@/services/bikeApi"

/* ------------ Creating initial state for bike status counter ----------- */
export const initialBikeStatusCount: BikeStatusCard = {
  [BikeStatus.BOOKED]: null,
  [BikeStatus.INUSE]: null,
  [BikeStatus.FREE]: null,
  [BikeStatus.DISABLED]: null,
}

/* ------------ Creating initial state for all bikes available ----------- */
export const initialAllBikesAvailable: AllBikesAvailable = {
  allBikes: [],
  largeBikes: [],
  standardBikes: [],
  smallBikes: [],
}

const BikeAvailabilityContext = createContext<BikeAvailabilityContextProps>(
  {} as BikeAvailabilityContextProps
)

const BikeAvailabilityProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  /* ------------- Creating state to manage bike status count ------------ */
  const [bikeStatusCount, setBikeStatusCount] = useState<BikeStatusCard>(
    initialBikeStatusCount
  )

  const [allBikesAvailable, setAllBikesAvailable] = useState<AllBikesAvailable>(
    initialAllBikesAvailable
  )

  const updatingAllBikesAvailable = async () => {
    const serverResult = await getAllBikesAvailable()
    if (serverResult.data) {
      setAllBikesAvailable({
        allBikes: serverResult.data.allBikes,
        largeBikes: serverResult.data.largeBikes,
        standardBikes: serverResult.data.standardBikes,
        smallBikes: serverResult.data.smallBikes,
      })
    }
  }

  const updatingBikeAvailability = async () => {
    const serverResult = await getBikeStatusCount()
    if (serverResult.data) {
      setBikeStatusCount({
        [BikeStatus.FREE]: serverResult.data[BikeStatus.FREE],
        [BikeStatus.BOOKED]: serverResult.data[BikeStatus.BOOKED],
        [BikeStatus.INUSE]: serverResult.data[BikeStatus.INUSE],
        [BikeStatus.DISABLED]: serverResult.data[BikeStatus.DISABLED],
      })
    } else {
      console.error("Unable to fetch bike counter data")
    }
  }

  return (
    <BikeAvailabilityContext.Provider
      value={{
        bikeStatusCount: bikeStatusCount,
        allBikesAvailable: allBikesAvailable,
        updatingBikeAvailability,
        updatingAllBikesAvailable,
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
