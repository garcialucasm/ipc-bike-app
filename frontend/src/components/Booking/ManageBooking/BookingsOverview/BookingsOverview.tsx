"use client"

import React, { useState, useEffect, useRef } from "react"
import { BookingActions, BookingStatus } from "@/types/BookingType"
import {
  returnBookingFetchApi,
  approveBookingFetchApi,
  bookingFetchApi,
  cancelBookingFetchApi,
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
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import InfoboxSingleBookingModal from "./modules/InfoboxSingleBookingModal"
import TableHeader from "./modules/TableHeader"

const messageInicial = "Confirm Action"
const messageCancelBooking = "Are you sure to cancel this booking?"
const messageCancelReturn = "Are you sure to cancel this bike return?"
const messageConfirmBooking = "Are you sure to confirm this booking?"
const messageConfirmReturn = "Are you sure to confirm this bike return?"

function BookingsOverview() {
  const [reloadData, setReloadData] = useState(false)
  const [bookingData, setBookingData] = useState<{
    activeBookings: any
    error: string | null
  }>({
    activeBookings: null,
    error: null,
  })

  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean
    bookingId: number | null
    userName: string | null
    bikeType: string | null
    bikeNumbering: string | null
    status: BookingStatus | null
    actionToConfirm: BookingActions | null
    dialogMessage: string
  }>({
    isOpen: false,
    bookingId: null,
    userName: null,
    bikeType: null,
    bikeNumbering: null,
    status: null,
    actionToConfirm: null,
    dialogMessage: messageInicial,
  })
  const { updatingBikeAvailability } = useBikeAvailabilityContext()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await bookingFetchApi()
      setBookingData(result)
    }

    fetchData()
  }, [reloadData])

  const { activeBookings, error } = bookingData

  /* ---------------- Handle cancel button to redirect to modal --------------- */
  async function handleClickCancelBooking(
    bookingId: number,
    status: BookingStatus,
    bikeType: string,
    bikeNumbering: string,
    userName: string
  ) {
    const bookingStatus = status.toUpperCase() as BookingStatus
    setConfirmAction((prev) => ({
      ...prev,
      isOpen: true,
      bookingId: bookingId,
      bikeType: bikeType,
      bikeNumbering: bikeNumbering,
      userName: userName,
      status: bookingStatus,
      actionToConfirm: BookingActions.CANCEL,
    }))
    if (bookingStatus === BookingStatus.BOOKED) {
      setConfirmAction((prev) => ({
        ...prev,
        dialogMessage: messageCancelBooking,
      }))
    } else if (bookingStatus === BookingStatus.DELIVERED) {
      setConfirmAction((prev) => ({
        ...prev,
        dialogMessage: messageCancelReturn,
      }))
    }
  }

  /* ---------------- Handle confirm button to redirect to modal --------------- */
  async function handleClickConfirmation(
    bookingId: number,
    status: BookingStatus,
    bikeType: string,
    bikeNumbering: string,
    userName: string
  ) {
    const bookingStatus = status.toUpperCase() as BookingStatus
    setConfirmAction((prev) => ({
      ...prev,
      isOpen: true,
      bookingId: bookingId,
      bikeType: bikeType,
      bikeNumbering: bikeNumbering,
      userName: userName,
      status: bookingStatus,
      actionToConfirm: BookingActions.CONFIRM,
    }))
    if (bookingStatus === BookingStatus.BOOKED) {
      setConfirmAction((prev) => ({
        ...prev,
        dialogMessage: messageConfirmBooking,
      }))
    } else if (bookingStatus === BookingStatus.DELIVERED) {
      setConfirmAction((prev) => ({
        ...prev,
        dialogMessage: messageConfirmReturn,
      }))
    }
  }

  /* ------------------------ Handle confirm action modal ------------------------ */
  async function handleConfirmAction(confirm: boolean) {
    if (confirm && confirmAction.bookingId && confirmAction.status) {
      const { bookingId, status } = confirmAction
      const bookingStatus = status.toUpperCase() as BookingStatus
      const actionToConfirm = confirmAction.actionToConfirm
      if (
        bookingStatus === BookingStatus.BOOKED &&
        actionToConfirm === BookingActions.CONFIRM
      ) {
        await approveBookingFetchApi(bookingId)
      } else if (
        bookingStatus === BookingStatus.DELIVERED &&
        actionToConfirm === BookingActions.CONFIRM
      ) {
        await returnBookingFetchApi(bookingId)
      } else if (
        bookingStatus === BookingStatus.BOOKED &&
        actionToConfirm === BookingActions.CANCEL
      ) {
        await cancelBookingFetchApi(bookingId)
      }
      updatingBikeAvailability()
      setReloadData(!reloadData)
    }
    setConfirmAction({
      isOpen: false,
      bookingId: null,
      userName: null,
      bikeType: null,
      bikeNumbering: null,
      status: null,
      actionToConfirm: null,
      dialogMessage: messageInicial,
    })
  }

  const handleModalClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleConfirmAction(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleModalClick)

    return () => {
      document.removeEventListener("mousedown", handleModalClick)
    }
  }, [])

  if (error) {
    return <ErrorBookingsOverview />
  } else if (!activeBookings || activeBookings.length === 0) {
    return <EmptyBookingsOverview />
  } else if (activeBookings.length > 0) {
    return (
      <>
        <div className="container-webapp-size relative overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm text-slate-500 rtl:text-right">
            <TableHeader />
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
                        onClick={() =>
                          handleClickCancelBooking(
                            booking.id,
                            booking.status,
                            booking.bikeType,
                            booking.bike,
                            booking.user
                          )
                        }
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
                        onClick={() => {
                          handleClickConfirmation(
                            booking.id,
                            booking.status,
                            booking.bikeType,
                            booking.bike,
                            booking.user
                          )
                        }}
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

        {/* -------------------------- Confirm action modal -------------------------- */}
        {confirmAction.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
            <div
              ref={modalRef}
              className="m-8 grid max-w-md gap-y-4 rounded-2xl bg-white p-8"
            >
              <InfoboxSingleBookingModal
                bikeType={confirmAction.bikeType}
                userName={confirmAction.userName}
                bikeNumbering={confirmAction.bikeNumbering}
                bookingStatus={confirmAction.status}
                dialogMessage={confirmAction.dialogMessage}
                actionToConfirm={confirmAction.actionToConfirm}
              />
              <div className="flex justify-center">
                <SecondaryButton
                  onClick={() => handleConfirmAction(false)}
                  className="btn-secondary ms-0 w-full max-w-24"
                >
                  No
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => handleConfirmAction(true)}
                  className="btn-primary me-0 w-full max-w-24"
                >
                  Yes
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </>
    )
  } else {
    return <ErrorBookingsOverview />
  }
}

export default BookingsOverview
