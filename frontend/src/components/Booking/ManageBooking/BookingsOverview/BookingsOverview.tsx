"use client"

import React, { useState, useEffect, useRef } from "react"
import { Info, UserCircle } from "@phosphor-icons/react"

import { BookingModalActions, BookingStatus } from "@/types/BookingType"
import {
  returnBookingFetchApi,
  approveBookingFetchApi,
  bookingFetchApi,
  cancelBookingFetchApi,
} from "@/services/bookingApi"
import StatusIndicator from "@/components/Others/StatusIndicator"
import { EmptyBookingsOverview } from "./EmptyBookingsOverview"
import { ErrorBookingsOverview } from "./ErrorBookingsOverview"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import InfoboxSingleBookingModal from "./modules/InfoboxSingleBookingModal"
import TableHeader from "./modules/TableHeader"
import ActionResult from "@/components/ActionResult/ActionResult"
import ActionButtonCancel from "@/components/Buttons/ActionButtonCancel"
import ActionButtonConfirm from "@/components/Buttons/ActionButtonConfirm"
import ActionButtonInfo from "@/components/Buttons/ActionButtonInfo"

const messageinitial = "Confirm Action"
const messageCancelBooking = "Are you sure to cancel this booking?"
const messageCancelReturn = "Are you sure to cancel this bike return?"
const messageConfirmBooking = "Are you sure to confirm this booking?"
const messageConfirmReturn = "Are you sure to confirm this bike return?"
const messageInfoBooking = "Current booking selected"

function BookingsOverview() {
  const [reloadData, setReloadData] = useState(false)
  const [bookingData, setBookingData] = useState<{
    activeBookings: any
    error: string | null
  }>({
    activeBookings: null,
    error: null,
  })

  const [modalAction, setModalAction] = useState<{
    isOpen: boolean
    bookingId: number | null
    userName: string | null
    bikeType: string | null
    bikeNumbering: string | null
    status: BookingStatus | null
    actionToConfirm: BookingModalActions | null
    dialogMessage: string
    isConfirmed: boolean | null
    resultMessage: string
  }>({
    isOpen: false,
    bookingId: null,
    userName: null,
    bikeType: null,
    bikeNumbering: null,
    status: null,
    actionToConfirm: null,
    dialogMessage: messageinitial,
    isConfirmed: null,
    resultMessage: "",
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

  /* ---------------- Handle info button to redirect to modal --------------- */
  async function handleClickInfo(
    bookingId: number,
    status: BookingStatus,
    bikeType: string,
    bikeNumbering: string,
    userName: string
  ) {
    const bookingStatus = status.toUpperCase() as BookingStatus
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      bookingId: bookingId,
      bikeType: bikeType,
      bikeNumbering: bikeNumbering,
      userName: userName,
      status: bookingStatus,
      actionToConfirm: BookingModalActions.INFO,
    }))
    setModalAction((prev) => ({
      ...prev,
      dialogMessage: messageInfoBooking,
    }))
  }

  /* ---------------- Handle cancel button to redirect to modal --------------- */
  async function handleClickCancellation(
    bookingId: number,
    status: BookingStatus,
    bikeType: string,
    bikeNumbering: string,
    userName: string
  ) {
    const bookingStatus = status.toUpperCase() as BookingStatus
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      bookingId: bookingId,
      bikeType: bikeType,
      bikeNumbering: bikeNumbering,
      userName: userName,
      status: bookingStatus,
      actionToConfirm: BookingModalActions.CANCEL,
    }))
    if (bookingStatus === BookingStatus.BOOKED) {
      setModalAction((prev) => ({
        ...prev,
        dialogMessage: messageCancelBooking,
      }))
    } else if (bookingStatus === BookingStatus.DELIVERED) {
      setModalAction((prev) => ({
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
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      bookingId: bookingId,
      bikeType: bikeType,
      bikeNumbering: bikeNumbering,
      userName: userName,
      status: bookingStatus,
      actionToConfirm: BookingModalActions.CONFIRM,
    }))
    if (bookingStatus === BookingStatus.BOOKED) {
      setModalAction((prev) => ({
        ...prev,
        dialogMessage: messageConfirmBooking,
      }))
    } else if (bookingStatus === BookingStatus.DELIVERED) {
      setModalAction((prev) => ({
        ...prev,
        dialogMessage: messageConfirmReturn,
      }))
    }
  }

  /* ------------------------ Handle confirm action modal ------------------------ */
  async function handleConfirmAction(confirm: boolean) {
    if (confirm && modalAction.bookingId && modalAction.status) {
      const { bookingId, status } = modalAction
      const bookingStatus = status.toUpperCase() as BookingStatus
      const actionToConfirm = modalAction.actionToConfirm
      if (
        bookingStatus === BookingStatus.BOOKED &&
        actionToConfirm === BookingModalActions.CONFIRM
      ) {
        const response = await approveBookingFetchApi(bookingId)
        handleServerResponse(response)
      } else if (
        bookingStatus === BookingStatus.DELIVERED &&
        actionToConfirm === BookingModalActions.CONFIRM
      ) {
        const response = await returnBookingFetchApi(bookingId)
        handleServerResponse(response)
      } else if (
        (bookingStatus === BookingStatus.BOOKED ||
          bookingStatus === BookingStatus.DELIVERED) &&
        actionToConfirm === BookingModalActions.CANCEL
      ) {
        const response = await cancelBookingFetchApi(bookingId)
        handleServerResponse(response)
      }
    } else {
      setModalAction((prev) => ({
        ...prev,
        isOpen: false,
        bookingId: null,
        userName: null,
        bikeType: null,
        bikeNumbering: null,
        status: null,
        actionToConfirm: null,
        dialogMessage: messageinitial,
        isConfirmed: null,
      }))
    }
    updatingBikeAvailability()
    setModalAction((prev) => ({
      ...prev,
      actionToConfirm: BookingModalActions.CLOSERESPONSE,
      dialogMessage: messageinitial,
    }))
  }

  function handleServerResponse(response: any) {
    if (response.data) {
      // If the request is successful, proceed with the desired actions
      let actionMessage: string = "Action confirmed"
      if (modalAction.actionToConfirm === BookingModalActions.CANCEL) {
        actionMessage = "Booking canceled"
      }
      setModalAction((prev) => ({
        ...prev,
        isConfirmed: true,
        resultMessage: actionMessage,
      }))
    } else if (response.error) {
      setModalAction((prev) => ({
        ...prev,
        isConfirmed: false,
        resultMessage: response.error,
      }))
    } else {
      // Handle unexpected errors or errors when trying to fetch data
      setModalAction((prev) => ({
        ...prev,
        isConfirmed: false,
        resultMessage: "Sorry. Something unexpected happened!",
      }))
    }
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

  if (!activeBookings || activeBookings.length === 0) {
    return <EmptyBookingsOverview />
  } else if (activeBookings.length > 0) {
    return (
      <>
        <div className="w-full overflow-x-auto rounded-2xl">
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
                  <td
                    className="flex items-center py-4 font-medium"
                    onClick={() =>
                      handleClickInfo(
                        booking.id,
                        booking.status,
                        booking.bikeType,
                        booking.bike,
                        booking.user
                      )
                    }
                  >
                    <UserCircle size={28} className="me-2 text-slate-500" />
                    {booking.user}
                  </td>
                  <td className="py-4 text-slate-500">
                    <span className="hidden md:inline-block">
                      {booking.bikeType && booking.bikeType.length > 0
                        ? booking.bikeType.charAt(0).toUpperCase() +
                          booking.bikeType.slice(1)
                        : ""}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500">{booking.bike}</td>
                  <td className="flex w-full flex-row items-center justify-center py-4">
                    <div>
                      <ActionButtonInfo
                        onClick={() =>
                          handleClickInfo(
                            booking.id,
                            booking.status,
                            booking.bikeType,
                            booking.bike,
                            booking.user
                          )
                        }
                        name="info-booking"
                      ></ActionButtonInfo>
                    </div>
                    <div>
                      <ActionButtonCancel
                        onClick={() =>
                          handleClickCancellation(
                            booking.id,
                            booking.status,
                            booking.bikeType,
                            booking.bike,
                            booking.user
                          )
                        }
                        name="cancel-booking"
                      ></ActionButtonCancel>
                    </div>
                    <div>
                      <ActionButtonConfirm
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
                      ></ActionButtonConfirm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------------------------- Modal: Confirm action -------------------------- */}
        {modalAction.isOpen &&
          modalAction.actionToConfirm !== BookingModalActions.CLOSERESPONSE && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
              <div
                ref={modalRef}
                className="m-8 grid min-w-72 max-w-md gap-y-4 rounded-2xl bg-white p-8"
              >
                <InfoboxSingleBookingModal
                  bikeType={modalAction.bikeType}
                  userName={modalAction.userName}
                  bikeNumbering={modalAction.bikeNumbering}
                  bookingStatus={modalAction.status}
                  dialogMessage={modalAction.dialogMessage}
                  actionToConfirm={modalAction.actionToConfirm}
                />
                <div className="flex justify-end gap-x-3">
                  <SecondaryButton
                    onClick={() => handleConfirmAction(false)}
                    className="btn-secondary w-full max-w-16"
                  >
                    {modalAction.actionToConfirm !== BookingModalActions.INFO
                      ? "No"
                      : "Ok"}
                  </SecondaryButton>
                  {modalAction.actionToConfirm !== BookingModalActions.INFO && (
                    <PrimaryButton
                      onClick={() => handleConfirmAction(true)}
                      className="btn-primary ms-0 w-full max-w-24"
                    >
                      Yes
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </div>
          )}

        {/* -------------------------- Modal: Server response -------------------------- */}
        {modalAction.isOpen &&
          modalAction.actionToConfirm == BookingModalActions.CLOSERESPONSE && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
              <div
                ref={modalRef}
                className="m-8 grid min-w-72 max-w-md gap-y-4 rounded-2xl bg-white p-8"
              >
                <p
                  className={`flex items-center border-b border-slate-200 pb-4 text-start text-xl font-semibold`}
                >
                  {modalAction.isConfirmed !== null && (
                    <ActionResult
                      isConfirmed={modalAction.isConfirmed}
                      personalizedMessage={modalAction.resultMessage as string}
                    />
                  )}
                </p>
                <div className="flex justify-center">
                  <SecondaryButton
                    onClick={() => {
                      handleConfirmAction(false), setReloadData(!reloadData)
                    }}
                    className="btn-secondary w-full max-w-24"
                  >
                    Ok
                  </SecondaryButton>
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
