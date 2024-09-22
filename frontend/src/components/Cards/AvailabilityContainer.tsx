"use client"

import { useEffect } from "react"

import { BikeStatus } from "@/types/BikeType"
import AvailabilityCard from "./AvailabilityCard"
import {
  initialBikeStatusCount,
  useBikeContext,
} from "@/context/bikeAvailability"
import LoadingComponent from "../Others/LoadingComponent"
import { useAuth } from "@/context/auth"

function AvailabilityContainer() {
  const { accountData } = useAuth()
  const isAuth = accountData?.isAuthenticated || false
  const {
    bikeStatusCount: bikeStatusCount,
    updatingBikeAvailability: getBikeAvailability,
  } = useBikeContext()
  const allCards = [
    BikeStatus.FREE,
    BikeStatus.BOOKED,
    BikeStatus.INUSE,
    BikeStatus.DISABLED,
  ]
  const publicCards = [
    BikeStatus.FREE,
    BikeStatus.BOOKED,
    BikeStatus.INUSE,
  ]
  const cardsToShow = isAuth ? allCards : publicCards

  useEffect(() => {
    getBikeAvailability()
  }, [isAuth])

  return (
    <>
      <div className="w-full items-center overflow-x-auto">
        {bikeStatusCount === initialBikeStatusCount ? (
          <LoadingComponent />
        ) : (
          <div className="flex w-full gap-4 overflow-x-auto pb-2">
            {cardsToShow.map((bikeStatus) => (
              <AvailabilityCard key={bikeStatus} selectedStatus={bikeStatus} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AvailabilityContainer
