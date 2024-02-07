"use client"

import React from "react"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"
import { useSingleBookingContext } from "@/context/singleBooking"

function ShowContextDev() {
  const { bookingData } = useSingleBookingContext()
  const { bikeAvailabilityCardData } = useBikeAvailabilityContext()

  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 bg-gray-800 p-4 text-white">
        {(bikeAvailabilityCardData.FREE !== 0 ||
          bikeAvailabilityCardData.BOOKED !== 0 ||
          bikeAvailabilityCardData.INUSE !== 0 ||
          bikeAvailabilityCardData.DISABLED !== 0) && (
          <p className="mb-1 border-b border-white text-center text-xs">
            Bike Availability:{" "}
            <span className="text-green-500">
              {bikeAvailabilityCardData.FREE}
            </span>
          </p>
        )}
        {/* Bike availability */}
        {bikeAvailabilityCardData.FREE !== 0 && (
          <p className="text-xs">
            Free:{" "}
            <span className="text-green-500">
              {bikeAvailabilityCardData.FREE}
            </span>
          </p>
        )}
        {bikeAvailabilityCardData.BOOKED !== 0 && (
          <p className="text-xs">
            Booked:{" "}
            <span className="text-yellow-500">
              {bikeAvailabilityCardData.BOOKED}
            </span>
          </p>
        )}
        {bikeAvailabilityCardData.INUSE !== 0 && (
          <p className="text-xs">
            In use:{" "}
            <span className="text-red-500">
              {bikeAvailabilityCardData.INUSE}
            </span>
          </p>
        )}
        {bikeAvailabilityCardData.DISABLED !== 0 && (
          <p className="text-xs">
            Disabled:{" "}
            <span className="text-gray-500">
              {bikeAvailabilityCardData.DISABLED}
            </span>
          </p>
        )}

        {/* Single Booking */}
        <p className="my-2 border-b border-white text-center text-xs">
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
      </div>
    </>
  )
}

export default ShowContextDev
