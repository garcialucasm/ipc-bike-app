"use client"

import { createContext, useContext, useState } from "react"

import { BikeAvailabilityContextProps } from "@/types/ContextType"
import { BikeStatusCard, BikeStatus, BikeDTO } from "@/types/BikeType"
import { getAllBikesAvailable, getBikeStatusCount } from "@/services/bikeApi"

/* ------------ Creating initial state for bike status counter ----------- */
export const initialBikeStatusCount: BikeStatusCard = {
  [BikeStatus.BOOKED]: null,
  [BikeStatus.INUSE]: null,
  [BikeStatus.FREE]: null,
  [BikeStatus.DISABLED]: null,
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

  const [allBikesAvailable, setAllBikesAvailable] = useState<BikeDTO[]>([]);

  const updatingAllBikesAvailable = async () => {
    const serverResult = await getAllBikesAvailable()
    if (serverResult.data) {
      setAllBikesAvailable(serverResult.data)
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
