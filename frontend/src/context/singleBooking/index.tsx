"use client"

import { createContext, useContext, useState } from "react"

import { SingleBookingContextProps } from "@/types/ContextType"
import { SingleBookingProps, SingleBookingSections } from "@/types/BookingType"
import { UserData } from "@/types/UserType"

const SingleBookingContext = createContext<SingleBookingContextProps>(
  {} as SingleBookingContextProps
)

const SingleBookingProvider = ({ children }: { children: React.ReactNode }) => {
  // Creating state to manage user data and then submit booking
  const [bookingData, setBookingData] = useState<SingleBookingProps>({
    currentSection: SingleBookingSections.selectBikeSize,
    bikeNumbering: null,
    userData: { firstName: "", lastName: "", roomNumber: "" },
    bookingStatus: null,
    serverResult: null,
  })

  const settingCurrentSection = (section: SingleBookingSections) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        currentSection: section,
      }))
    } catch (error) {
      console.error("Error setting Current Section: " + error)
    }
  }

  const settingBikeNumbering = (bikeNumbering: string | null) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        bikeNumbering: bikeNumbering,
      }))
    } catch (error) {
      console.error("Error setting Bike Size: " + error)
    }
  }

  const settingUserData = (enteredUserData: UserData) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        userData: enteredUserData,
      }))
    } catch (error) {
      console.error("Error setting User Data: " + error)
    }
  }

  const settingServerResult = (serverResult: any) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        serverResult: serverResult,
      }))
    } catch (error) {
      console.error("Error setting Booking Status: " + error)
    }
  }

  return (
    <SingleBookingContext.Provider
      value={{
        bookingData,
        settingCurrentSection,
        settingBikeNumbering,
        settingUserData,
        settingServerResult,
      }}
    >
      <>{children}</>
    </SingleBookingContext.Provider>
  )
}

const useSingleBookingContext = () => {
  const context = useContext(SingleBookingContext)
  return context
}

export { SingleBookingContext, SingleBookingProvider, useSingleBookingContext }
