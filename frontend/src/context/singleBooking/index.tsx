"use client"

import { createContext, useContext, useState } from "react"

import { SingleBookingContextProps } from "@/types/ContextType"
import { SingleBookingProps, SingleBookingSections } from "@/types/BookingType"
import { UserData } from "@/types/UserType"
import { ServerResult } from "@/types/ServerResult"

const SingleBookingContext = createContext<SingleBookingContextProps>(
  {} as SingleBookingContextProps
)

const SingleBookingProvider = ({ children }: { children: React.ReactNode }) => {
  // Creating state to manage user data and then submit booking
  const [bookingData, setBookingData] = useState<SingleBookingProps>({
    currentSection: SingleBookingSections.selectBikeSize,
    bikeNumbering: "",
    bikeSize: "",
    bikeType: "",
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

  const settingBikeNumbering = (bikeNumbering: string) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        bikeNumbering: bikeNumbering,
      }))
    } catch (error) {
      console.error("Error setting Bike Numbering: " + error)
    }
  }

  const settingBikeType = (bikeType: string) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        bikeType: bikeType,
      }))
    } catch (error) {
      console.error("Error setting Bike Type: " + error)
    }
  }

  const settingBikeSize = (bikeSize: string) => {
    try {
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        bikeSize: bikeSize,
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

  const settingServerResult = (serverResult: ServerResult) => {
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
        settingBikeSize,
        settingBikeType,
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
