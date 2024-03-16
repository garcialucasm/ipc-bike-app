// TODO: probably change this fetch to server side
// TODO: sort bookings by date
// TODO: fetch just an amount of previous booking
// TODO: add filters (by month, year, bike)

"use client"

import { useState, useEffect, useRef } from "react"
import { UserCircle } from "@phosphor-icons/react/dist/ssr/UserCircle"

import { BookingModalActions, BookingStatus } from "@/types/BookingType"
import { allBookingsFetchApi } from "@/services/bookingApi"
import StatusIndicator from "@/components/Others/StatusIndicator"
import { EmptyBookingsOverview } from "./EmptyBookingsOverview"
import { ErrorBookingsOverview } from "./ErrorBookingsOverview"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import InfoboxSingleBookingModal from "./modules/InfoboxSingleBookingModal"
import TableHeader from "./modules/TableHeader"
import ActionButtonInfo from "@/components/Buttons/ActionButtonInfo"

const messageinitial = "Current booking selected"
const messageInfoBooking = "Current booking selected"

function PreviousBookingsOverview() {
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
      const result = await allBookingsFetchApi()
      setBookingData(result)
    }

    fetchData()
  }, [reloadData])

  const { allBookings, error } = bookingData

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

  /* ------------------------ Handle confirm action modal ------------------------ */
  async function handleConfirmAction(confirm: boolean) {
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

    updatingBikeAvailability()
    setModalAction((prev) => ({
      ...prev,
      actionToConfirm: BookingModalActions.CLOSERESPONSE,
      dialogMessage: messageinitial,
    }))
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
                  bikeType={modalAction.bikeType}
                  userName={modalAction.userName}
                  bikeNumbering={modalAction.bikeNumbering}
                  bookingStatus={modalAction.status}
                  dialogMessage={modalAction.dialogMessage}
                  actionToConfirm={modalAction.actionToConfirm}
                />
                <div className="flex justify-end gap-x-3">
                  <PrimaryButton
                    onClick={() => handleConfirmAction(false)}
                    className="btn-primary w-full max-w-16"
                  >
                    Ok
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

export default PreviousBookingsOverview
