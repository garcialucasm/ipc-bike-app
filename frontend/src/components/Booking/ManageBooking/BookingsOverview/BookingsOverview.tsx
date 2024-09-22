"use client"

import { useState, useEffect, useRef } from "react"
import { UserCircle } from "@phosphor-icons/react/dist/ssr/UserCircle"
import { usePathname } from "next/navigation"

import {
  Booking,
  BookingModalActions,
  BookingStatus,
} from "@/types/BookingType"
import {
  returnBookingFetchApi,
  approveBookingFetchApi,
  allBookingsFetchApi,
  previousBookingsFetchApi,
  cancelBookingFetchApi,
} from "@/services/bookingApi"
import StatusIndicator from "@/components/Others/StatusIndicator"
import { EmptyBookingsOverview } from "./EmptyBookingsOverview"
import { ErrorBookingsOverview } from "./ErrorBookingsOverview"
import { useBikeContext } from "@/context/bikeAvailability"
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
import { toggleMaintenanceFetchApi } from "@/services/bikeApi"
import { getTokenFromCookies } from "@/app/auth/authUtils"

const messageInitial = "Confirm Action"
const messageCancelBooking = "Are you sure to cancel this booking?"
const messageCancelReturn = "Are you sure to cancel this bike return?"
const messageConfirmBooking = "Are you sure to confirm this booking?"
const messageConfirmReturn = "Are you sure to confirm this bike return?"
const messageInfoBooking = "Current booking selected"

function BookingsOverview() {
  const { accountData } = useAuth()
  const pathname = usePathname()
  const isAuth = accountData?.isAuthenticated || false
  const [reloadData, setReloadData] = useState(false)
  const [isMaintenanceChecked, setIsMaintenanceChecked] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<{
    allBookings: any
    error: string | null
  }>({
    allBookings: null,
    error: null,
  })
  const isSecure = pathname.includes("/secure/")
  const emptyBooking = {
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
    createdByAccount: "",
    confirmedByAccount: "",
    returnedByAccount: "",
    returnedCondition: "",
    notes: "",
  }

  const emptyModalAction = {
    isOpen: false,
    booking: emptyBooking,
    actionToConfirm: null,
    dialogMessage: messageInitial,
    isConfirmed: null,
    resultMessage: "",
  }

  const [modalAction, setModalAction] = useState<{
    isOpen: boolean
    booking: Booking
    actionToConfirm: BookingModalActions | null
    dialogMessage: string
    isConfirmed: boolean | null
    resultMessage: string
  }>(emptyModalAction)
  const { updatingBikeAvailability } = useBikeContext()
  const modalRef = useRef<HTMLDivElement>(null)

  const { allBookings: allBookings, error } = bookingData

  async function handleClickInfo(booking: Booking) {
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      booking: booking,
      actionToConfirm: BookingModalActions.INFO,
      dialogMessage: messageInfoBooking,
    }))
  }

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
        setIsMaintenanceChecked(true)
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
      setModalAction(emptyModalAction)
      setIsMaintenanceChecked(false)
    }
    updatingBikeAvailability()
    setModalAction((prev) => ({
      ...prev,
      actionToConfirm: BookingModalActions.RESPONSE,
    }))
  }

  async function handleServerResponse(response: any) {
    if (response.data) {
      let actionMessage: string = "Action confirmed"
      const bookingStatus =
        modalAction.booking.status &&
        (modalAction.booking.status.toUpperCase() as BookingStatus)
      if (modalAction.actionToConfirm === BookingModalActions.CANCEL) {
        actionMessage = "Booking canceled"
      } else if (
        modalAction.actionToConfirm === BookingModalActions.CONFIRM &&
        isMaintenanceChecked &&
        bookingStatus === BookingStatus.DELIVERED
      ) {
        const res = await toggleMaintenanceFetchApi(modalAction.booking.bike)
        if (res.data) {
          actionMessage = "Bike returned and sent for maintenance"
        } else {
          actionMessage =
            "Bike returned but something unexpected occurred when trying to send it for maintenance."
        }
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

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsMaintenanceChecked(event.target.checked)
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

    const fetchPublicPreviousBookings = async () => {
      const token = getTokenFromCookies("ipcBikeApp_previousBookings")

      if (token) {
        const result = await previousBookingsFetchApi(token)
        setBookingData(result)
      }
    }

    if (isAuth) {
      fetchData()
    } else {
      fetchPublicPreviousBookings()
    }
  }, [reloadData, isAuth])

  useEffect(() => {
    const calculateTimeRemaining = (createdAt: string) => {
      const expirationTime = new Date(createdAt).getTime() + 2 * 60 * 60 * 1000; // 2 hours from createdAt
      const now = new Date().getTime();
      const timeDiff = expirationTime - now;

      if (timeDiff > 0) {
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      } else {
        return null;
      }
    };

    const interval = setInterval(() => {
      if (modalAction.booking.status === BookingStatus.BOOKED && modalAction.booking.createdAt) {
        const remainingTime = calculateTimeRemaining(modalAction.booking.createdAt);
        setTimeRemaining(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [modalAction.booking]);

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
                    <UserCircle
                      size={28}
                      className="me-2 min-w-7 text-slate-500"
                    />
                    <p className="line-clamp-1 text-wrap">{booking.user}</p>
                  </td>
                  <td className="p-2 text-slate-500">{booking.bike}</td>
                  <td className="p-2 text-slate-500">
                    <span className="hidden md:inline-block">
                      {booking.createdAt && formatDateString(booking.createdAt)}
                    </span>
                  </td>
                  <td className="flex w-full flex-row items-center justify-center p-2">
                    <div className="flex" title="Info">
                      <ActionButtonInfo
                        onClick={() => handleClickInfo(booking)}
                        name="info-booking"
                      ></ActionButtonInfo>
                    </div>
                    {isSecure && (
                      <div className="flex" title="Cancel">
                        <ActionButtonCancel
                          onClick={() => handleClickCancellation(booking)}
                          name="cancel-booking"
                        ></ActionButtonCancel>
                      </div>
                    )}
                    {isSecure && (
                      <div className="flex" title="Confirm">
                        <ActionButtonConfirm
                          onClick={() => {
                            handleClickConfirmation(booking)
                          }}
                          name="approve-booking"
                        ></ActionButtonConfirm>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalAction.booking.status === BookingStatus.BOOKED && timeRemaining && (
          <div className="flex justify-center text-red-500">
            Reservation expires in: {timeRemaining}
          </div>
        )}

        {modalAction.isOpen &&
          modalAction.actionToConfirm !== BookingModalActions.RESPONSE && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
              <div
                ref={modalRef}
                className="grid min-w-72 max-w-md gap-y-4 rounded-2xl bg-white p-8 sm:min-w-96"
              >
                <InfoboxSingleBookingModal
                  booking={modalAction.booking}
                  dialogMessage={modalAction.dialogMessage}
                  actionToConfirm={modalAction.actionToConfirm}
                />
                {modalAction.actionToConfirm === BookingModalActions.CONFIRM &&
                  modalAction?.booking?.status?.toUpperCase() ===
                    BookingStatus.DELIVERED && (
                    <div className="flex w-full items-center justify-center px-4 sm:justify-start">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={isMaintenanceChecked}
                        onChange={handleCheckboxChange}
                        className={`h-4 w-4 rounded-2xl border-gray-300 bg-gray-100 text-blue-600`}
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm text-gray-700"
                      >
                        This bike needs repairs. Send for maintenance.
                      </label>
                    </div>
                  )}
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

        {modalAction.isOpen &&
          modalAction.actionToConfirm == BookingModalActions.RESPONSE && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
              <div
                ref={modalRef}
                className="m-8 grid max-w-md gap-y-4 rounded-2xl bg-white p-8 md:min-w-96"
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
