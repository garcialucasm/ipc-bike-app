"use client"

import { useState, useEffect, useRef } from "react"
import { UserCircle } from "@phosphor-icons/react/dist/ssr/UserCircle"

import { Booking, BookingModalActions } from "@/types/BookingType"
import { allBookingsFetchApi } from "@/services/bookingApi"
import StatusIndicator from "@/components/Others/StatusIndicator"
import { EmptyBookingsOverview } from "./EmptyBookingsOverview"
import { ErrorBookingsOverview } from "./ErrorBookingsOverview"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import InfoboxSingleBookingModal from "./modules/InfoboxSingleBookingModal"
import TableHeader from "./modules/TableHeader"
import ActionButtonInfo from "@/components/Buttons/ActionButtonInfo"
import { formatDateString } from "@/utils/strings"
import Button from "@/components/Buttons/Button"
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft"
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"

const messageinitial = "Current booking selected"
const messageInfoBooking = "Current booking selected"

const BOOKINGS_PER_PAGE = 10
const MAX_PAGES_IN_NAVIGATION = 5

function PreviousBookingsOverview() {
  const [bookingData, setBookingData] = useState<{
    allBookings: any
    error: string | null
  }>({
    allBookings: null,
    error: null,
  })

  const { updatingBikeAvailability } = useBikeAvailabilityContext()
  const [currentPage, setCurrentPage] = useState(1)

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
  const { allBookings, error } = bookingData
  const modalRef = useRef<HTMLDivElement>(null)

  let totalPages = 1 // Default to 1 if allBookings is null or undefined

  if (allBookings && allBookings.length > 0) {
    totalPages = Math.ceil(allBookings.length / BOOKINGS_PER_PAGE)
  }

  // Generate an array of page numbers to display in the pagination controls
  const pagesToShow = []
  const startPage = Math.max(
    1,
    currentPage - Math.floor(MAX_PAGES_IN_NAVIGATION / 2)
  )
  const endPage = Math.min(startPage + MAX_PAGES_IN_NAVIGATION - 1, totalPages)

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber)
  }

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
    const fetchData = async () => {
      const result = await allBookingsFetchApi()
      if (result && result.allBookings) {
        // Sort bookings by createdAt date in descending order
        const sortedBookings = result.allBookings.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setBookingData({ allBookings: sortedBookings, error: null })
      } else {
        setBookingData({ allBookings: [], error: "No bookings found." })
      }
    }

    fetchData()
  }, [currentPage])

  useEffect(() => {
    document.addEventListener("mousedown", handleModalClick)

    return () => {
      document.removeEventListener("mousedown", handleModalClick)
    }
  }, [])

  if (!allBookings || allBookings.length === 0) {
    return <EmptyBookingsOverview />
  } else if (allBookings.length > 0) {
    // Calculate start and end indices for current page
    const startIndex = (currentPage - 1) * BOOKINGS_PER_PAGE
    const endIndex = Math.min(
      startIndex + BOOKINGS_PER_PAGE,
      allBookings.length
    )

    const currentBookings = allBookings.slice(startIndex, endIndex)
    return (
      <>
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm text-slate-500 rtl:text-right">
            <TableHeader />
            <tbody>
              {currentBookings.map((booking: any) => (
                <tr
                  key={booking.id}
                  className="whitespace-nowrap border-b-2 border-white bg-slate-100 py-4 text-slate-900"
                >
                  <th scope="row" className="py-4">
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
                      className="me-2 min-w-14 text-slate-500"
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
                    <div>
                      <ActionButtonInfo
                        onClick={() => handleClickInfo(booking)}
                        name="info-booking"
                      ></ActionButtonInfo>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <div className="my-4 flex">
              {/* Previous Page Button */}
              <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
                <li
                  className={`ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 ${currentPage === 1 ? "text-gray-300" : "bg-white text-gray-500"} px-3 leading-tight hover:bg-gray-100 hover:text-gray-700`}
                >
                  <CaretLeft size={16} className="me-2" /> Previous
                </li>
              </Button>
              {/* Page Numbers */}
              {pagesToShow.map((pageNumber) => (
                <Button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  <li
                    className={`ms-0 flex h-8 items-center justify-center border border-gray-300 ${currentPage === pageNumber ? "bg-gray-200 font-bold text-blue-600" : "bg-white text-gray-500"} px-3 leading-tight hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {pageNumber}
                  </li>
                </Button>
              ))}
              {/* Next Page Button */}
              <Button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                <li
                  className={`ms-0 flex h-8 items-center justify-center rounded-e-lg border border-s-0 border-gray-300 ${currentPage === totalPages ? "bg-gray-200" : "bg-white"} px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                >
                  Next
                  <CaretRight size={16} className="ms-2" />
                </li>
              </Button>
            </div>
          </ul>
        </nav>

        {/* -------------------------- Modal: Confirm action -------------------------- */}
        {modalAction.isOpen &&
          modalAction.actionToConfirm !== BookingModalActions.CLOSERESPONSE && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
              <div
                ref={modalRef}
                className="grid max-w-md gap-y-4 rounded-2xl bg-white p-8"
              >
                <InfoboxSingleBookingModal
                  booking={modalAction.booking}
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
