"use client"

import { useState, useEffect, useRef } from "react"
import { UserCircle } from "@phosphor-icons/react/dist/ssr/UserCircle"

import {
  Booking,
  BookingModalActions,
  BookingStatus,
} from "@/types/BookingType"
import {
  returnBookingFetchApi,
  approveBookingFetchApi,
  allBookingsFetchApi,
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
import { useAuth } from "@/context/auth"
import { formatDateString } from "@/utils/strings"

const messageinitial = "Confirm Action"
const messageCancelBooking = "Are you sure to cancel this booking?"
const messageCancelReturn = "Are you sure to cancel this bike return?"
const messageConfirmBooking = "Are you sure to confirm this booking?"
const messageConfirmReturn = "Are you sure to confirm this bike return?"
const messageInfoBooking = "Current booking selected"

function BookingsOverview() {
  const { accountData } = useAuth()
  const isAuth = accountData?.isAuthenticated || false
  const [reloadData, setReloadData] = useState(false)
  const [bookingData, setBookingData] = useState<{
    allBookings: any
    error: string | null
  }>({
    allBookings: null,
    error: null,
  })

  const [modalAction, setModalAction] = useState<{
    isOpen: boolean
    booking: Booking
    actionToConfirm: BookingModalActions | null
    dialogMessage: string
    isConfirmed: boolean | null
    resultMessage: string
  }>({
    isOpen: false,
    booking: {
      user: "",
      term: "",
      room: "",
      bike: "",
      bikeCount: "",
      bikeType: "",
      status: null,
      type: null,
      createdAt: "",
      confirmedAt: "",
      returnedAt: "",
      returnedCondition: "",
      notes: "",
    },
    actionToConfirm: null,
    dialogMessage: messageinitial,
    isConfirmed: null,
    resultMessage: "",
  })
  const { updatingBikeAvailability } = useBikeAvailabilityContext()
  const modalRef = useRef<HTMLDivElement>(null)

  const { allBookings: allBookings, error } = bookingData

  /* ---------------- Handle info button to redirect to modal --------------- */
  async function handleClickInfo(booking: Booking) {
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      booking: booking,
      actionToConfirm: BookingModalActions.INFO,
    }))
    setModalAction((prev) => ({
      ...prev,
      dialogMessage: messageInfoBooking,
    }))
  }

  /* ---------------- Handle cancel button to redirect to modal --------------- */
  async function handleClickCancellation(booking: Booking) {
    const bookingStatus = booking.status && booking.status
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      booking: booking,
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
  async function handleClickConfirmation(booking: Booking) {
    const bookingStatus = booking.status && booking.status
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      booking: booking,
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
    if (confirm && modalAction.booking.id && modalAction.booking.status) {
      const { id, status } = modalAction.booking
      const bookingStatus = status.toUpperCase() as BookingStatus
      const actionToConfirm = modalAction.actionToConfirm
      if (
        bookingStatus === BookingStatus.BOOKED &&
        actionToConfirm === BookingModalActions.CONFIRM
      ) {
        const response = await approveBookingFetchApi(id)
        handleServerResponse(response)
      } else if (
        bookingStatus === BookingStatus.DELIVERED &&
        actionToConfirm === BookingModalActions.CONFIRM
      ) {
        const response = await returnBookingFetchApi(id)
        handleServerResponse(response)
      } else if (
        (bookingStatus === BookingStatus.BOOKED ||
          bookingStatus === BookingStatus.DELIVERED) &&
        actionToConfirm === BookingModalActions.CANCEL
      ) {
        const response = await cancelBookingFetchApi(id)
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await allBookingsFetchApi(false)
      setBookingData(result)
    }

    if (isAuth) {
      fetchData()
    }
  }, [reloadData, isAuth])

  if (!allBookings || allBookings.length === 0) {
    return <EmptyBookingsOverview />
  } else if (allBookings.length > 0) {
    return (
      <>
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm text-slate-500 rtl:text-right">
            <TableHeader />
            <tbody>
              {allBookings.map((booking: any) => (
                <tr
                  key={booking.id}
                  className="whitespace-nowrap border-b-2 border-white bg-slate-100 py-4 text-slate-900"
                >
                  <th scope="row" className="p-2">
                    <div className="flex justify-center" title={booking.status}>
                      <StatusIndicator currentStatus={booking.status} />
                    </div>
                  </th>
                  <td
                    className="flex items-center p-2 font-medium"
                    onClick={() => handleClickInfo(booking)}
                  >
                    <UserCircle size={28} className="me-2 text-slate-500" />
                    {booking.user}
                  </td>
                  <td className="p-2 text-slate-500">{booking.bike}</td>
                  <td className="p-2 text-slate-500">
                    <span className="hidden md:inline-block">
                      {booking.createdAt && formatDateString(booking.createdAt)}
                    </span>
                  </td>
                  <td className="flex w-full flex-row items-center justify-center p-2">
                    <div title="Info">
                      <ActionButtonInfo
                        onClick={() => handleClickInfo(booking)}
                        name="info-booking"
                      ></ActionButtonInfo>
                    </div>
                    <div title="Cancel">
                      <ActionButtonCancel
                        onClick={() => handleClickCancellation(booking)}
                        name="cancel-booking"
                      ></ActionButtonCancel>
                    </div>
                    <div title="Confirm">
                      <ActionButtonConfirm
                        onClick={() => {
                          handleClickConfirmation(booking)
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
                className="m-8 grid min-w-96 max-w-md gap-y-4 rounded-2xl bg-white p-8"
              >
                <InfoboxSingleBookingModal
                  booking={modalAction.booking}
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
                className="m-8 grid min-w-96 max-w-md gap-y-4 rounded-2xl bg-white p-8"
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
