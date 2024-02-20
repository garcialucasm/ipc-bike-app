"use client"

import React, { useState } from "react"

import { useBikeAvailabilityContext } from "@/context/bikeAvailability"
import { useSingleBookingContext } from "@/context/singleBooking"
import { useAuth } from "@/context/auth"

function DevShowContext() {
  const { bookingData } = useSingleBookingContext()
  const { bikeStatusCount: bikeStatusCount } = useBikeAvailabilityContext()
  const { accountData } = useAuth()
  const [minimized, setMinimized] = useState(false)

  const toggleMinimized = () => {
    setMinimized(!minimized)
  }

  if (minimized) {
    return (
      <button
        className="fixed bottom-0 left-0 z-50 cursor-pointer bg-gray-800 p-2 text-xs text-white"
        onClick={toggleMinimized}
      >
        <div>Show Context [+]</div>
      </button>
    )
  }

  return (
    <>
      <div>
        {/* Minimize button */}
        <button
          className="fixed bottom-0 left-0 z-50 mt-2 cursor-pointer bg-gray-800 p-4 text-left text-slate-300"
          onClick={toggleMinimized}
        >
          <div>
            <p className="border-b border-white text-center text-xs font-semibold">
              Account Status:{" "}
            </p>
            <p className="text-xs">
              Is Auth:{" "}
              <span className="text-blue-500">
                {accountData?.isAuthenticated &&
                  accountData?.isAuthenticated.toString()}
              </span>
            </p>
            <p className="flex text-xs">
              <span>
                ID: <span className="text-slate-500">{accountData?.id}</span>
              </span>
              <span>
                {" "}
                &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;Name:{" "}
                <span className="text-slate-500">{accountData?.accountName}</span>
              </span>
            </p>
            {(bikeStatusCount.FREE !== 0 ||
              bikeStatusCount.BOOKED !== 0 ||
              bikeStatusCount.INUSE !== 0 ||
              bikeStatusCount.DISABLED !== 0) && (
              <p className="mt-2 border-b border-white text-center text-xs font-semibold">
                Bike Availability:{" "}
              </p>
            )}
            {/* Bike availability */}
            {bikeStatusCount.FREE !== 0 && (
              <p className="text-xs">
                Free:{" "}
                <span className="text-green-500">
                  {bikeStatusCount.FREE}
                </span>
              </p>
            )}
            {bikeStatusCount.BOOKED !== 0 && (
              <p className="text-xs">
                Booked:{" "}
                <span className="text-yellow-500">
                  {bikeStatusCount.BOOKED}
                </span>
              </p>
            )}
            {bikeStatusCount.INUSE !== 0 && (
              <p className="text-xs">
                In use:{" "}
                <span className="text-red-500">
                  {bikeStatusCount.INUSE}
                </span>
              </p>
            )}
            {bikeStatusCount.DISABLED !== 0 && (
              <p className="text-xs">
                Disabled:{" "}
                <span className="text-gray-500">
                  {bikeStatusCount.DISABLED}
                </span>
              </p>
            )}

            {/* Single Booking */}
            <p className="mt-2 border-b border-white text-center text-xs font-semibold">
              Single Booking:
            </p>

            {bookingData.currentSection !== null && (
              <p className="text-xs">
                Current Section:{" "}
                <span className="text-yellow-500">
                  {bookingData.currentSection}
                </span>
              </p>
            )}
            {bookingData.bikeSize !== null && (
              <p className="text-xs">
                Bike Size:{" "}
                <span className="text-yellow-500">{bookingData.bikeSize}</span>
              </p>
            )}
            {bookingData.bookingStatus !== null && (
              <p className="text-xs">Status: {bookingData.bookingStatus}</p>
            )}
            {bookingData.userData.firstName !== "" && (
              <p className="text-xs">
                First name:{" "}
                <span className="text-yellow-500">
                  {bookingData.userData.firstName}
                </span>
              </p>
            )}
            {bookingData.userData.lastName !== "" && (
              <p className="text-xs">
                Last name:{" "}
                <span className="text-yellow-500">
                  {bookingData.userData.lastName}
                </span>
              </p>
            )}
            {bookingData.userData.roomNumber !== "" && (
              <p className="text-xs">
                Room number:{" "}
                <span className="text-yellow-500">
                  {bookingData.userData.roomNumber}
                </span>
              </p>
            )}
            {bookingData.serverResult !== null && (
              <p className="text-xs">
                Server Result:{" "}
                <span className="text-blue-500">
                  {bookingData.serverResult}
                </span>
              </p>
            )}
          </div>{" "}
        </button>
      </div>
    </>
  )
}

export default DevShowContext
