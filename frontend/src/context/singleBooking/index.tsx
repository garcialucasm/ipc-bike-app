"use client"

import { createContext, useContext, useState } from "react"

import { SingleBookingContextProps } from "@/types/ContextType"
import { SingleBookingProps } from "@/types/BookingType"
import { BikeSize } from "@/types/BikeType"
import { error } from "console"
import { UserData } from "@/types/UserType"

const SingleBookingContext = createContext<SingleBookingContextProps>(
  {} as SingleBookingContextProps
)

const SingleBookingProvider = ({ children }: { children: React.ReactNode }) => {
  // Creating state to manage user data and then submit booking
  const [bookingData, setBookingData] = useState<SingleBookingProps>({
    bookingBikeSize: null,
    bookingUserData: null,
    bookingStatus: null,
  })

  const settingBikeSize = (bikeSizeSelected: BikeSize) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        bookingBikeSize: bikeSizeSelected,
      }))
    } catch (error) {}
    console.error("Error setting Bike Size: " + error)
  }

  const settingUserData = (enteredUserData: UserData) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        bookingUserData: enteredUserData,
      }))
    } catch (error) {}
    console.error("Error setting User Data: " + error)
  }

  const settingServerResult = (serverResult: any) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        bookingStatus: serverResult,
      }))
    } catch (error) {}
    console.error("Error setting Booking Status: " + error)
  }

  return (
    <SingleBookingContext.Provider
      value={{
        bookingData,
        settingBikeSize,
        settingUserData,
        settingServerResult,
      }}
    >
      <>{children}</>
    </SingleBookingContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(SingleBookingContext)
  return context
}

export { SingleBookingContext, SingleBookingProvider, useAuth }
