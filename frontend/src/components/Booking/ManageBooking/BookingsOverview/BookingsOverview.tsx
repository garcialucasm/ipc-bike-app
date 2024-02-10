"use client"

import React, { useState, useEffect } from "react"

import { BookingStatus } from "@/types/BookingType"
import {
  returnBookingFetchApi,
  approveBookingFetchApi,
  bookingFetchApi,
} from "@/services/bookingApi"
import StatusIndicator from "@/components/Others/StatusIndicator"
import ActionButton from "@/components/Buttons/ActionButton"
import {
  IconSvgDeleteCircle,
  IconSvgApprovalCircle,
  IconSvgPersonThin,
  IconSvgEllipsisCircle,
} from "@/components/Others/IconsSvg"
import { EmptyBookingsOverview } from "./EmptyBookingsOverview"
import { ErrorBookingsOverview } from "./ErrorBookingsOverview"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"

function BookingsOverview() {
  const [bookingData, setBookingData] = useState<{
    activeBookings: any
    error: string | null
  }>({
    activeBookings: null,
    error: null,
  })

  const [reloadData, setReloadData] = useState(false)

  const { updatingBikeAvailability } = useBikeAvailabilityContext()

  useEffect(() => {
    const fetchData = async () => {
      const result = await bookingFetchApi()
      setBookingData(result)
    }

    fetchData()
  }, [reloadData]) // Empty dependency array to run the effect only once when the component mounts

  const { activeBookings, error } = bookingData

  async function handleClickCancelBooking(bookingId: number) {
    setReloadData(!reloadData)
  }

  async function handleClickConfirmation(
    bookingId: number,
    status: BookingStatus
  ) {
    let bookingStatus = status.toUpperCase()
    if (bookingStatus === BookingStatus.BOOKED) {
      await approveBookingFetchApi(bookingId)
    } else if (bookingStatus === BookingStatus.DELIVERED) {
      await returnBookingFetchApi(bookingId)
    }
    // Set confirmation status to trigger re-render
    updatingBikeAvailability()
    setReloadData(!reloadData)
  }

  // Check if activeBookings returned an error
  if (error) {
    return (
      <>
        <ErrorBookingsOverview />
      </>
    )
  }

  // Check if activeBookings is empty
  else if (!activeBookings || activeBookings.length === 0) {
    return (
      <>
        <EmptyBookingsOverview />
      </>
    )
  }

  // Check and render table only if there is activeBookings
  else if (activeBookings.length > 0) {
    return (
      <>
        <div className="container-webapp-size relative overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm text-slate-500 rtl:text-right">
            <thead className="bg-blue-800 text-xs uppercase text-slate-100">
              <tr>
                <th scope="col" className="px-3 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="py-3">
                  User
                </th>
                <th scope="col" className="py-3">
                  Bike Type
                </th>
                <th scope="col" className="py-3">
                  Bikes
                </th>
                <th scope="col" className="py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {activeBookings.map((booking: any) => (
                <tr
                  key={booking.id}
                  className="whitespace-nowrap border-b-2 border-white bg-slate-100 py-4 text-slate-900"
                >
                  <th scope="row" className="py-4">
                    <div className="flex justify-center">
                      <StatusIndicator currentStatus={booking.status} />
                    </div>
                  </th>
                  <td className="flex items-center py-4 font-medium">
                    <div className="mr-2 rounded-full border border-slate-500 bg-white">
                      <IconSvgPersonThin
                        height="20"
                        fillColor="text-slate-500"
                      />
                    </div>
                    {booking.user}
                  </td>
                  <td className="py-4 text-slate-500">
                    {booking.bikeType && booking.bikeType.length > 0
                      ? booking.bikeType.charAt(0).toUpperCase() +
                        booking.bikeType.slice(1)
                      : ""}
                  </td>
                  <td className="py-4 text-slate-500">{booking.bike}</td>
                  <td className="flex w-full flex-row items-center justify-center py-4">
                    <div>
                      <ActionButton
                        onClick={() => handleClickCancelBooking(booking.id)}
                        name="cancel-booking"
                      >
                        <IconSvgDeleteCircle height="24" />
                      </ActionButton>
                    </div>
                    <div>
                      <ActionButton>
                        <IconSvgEllipsisCircle height="24" />
                      </ActionButton>
                    </div>
                    <div>
                      <ActionButton
                        onClick={() =>
                          handleClickConfirmation(booking.id, booking.status)
                        }
                        name="approve-booking"
                      >
                        <IconSvgApprovalCircle height="24" />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="text-xs">
          Something unexpected happened. Please try again later.
        </div>
      </>
    )
  }
}

export default BookingsOverview
