import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { Check } from "@phosphor-icons/react/dist/ssr/Check"
import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle"
import { User } from "@phosphor-icons/react/dist/ssr/User"
import { Info } from "@phosphor-icons/react/dist/ssr/Info"

import {
  Booking,
  BookingModalActions,
  BookingStatus,
} from "@/types/BookingType"
import { formatDateString } from "@/utils/strings"
import { Bicycle } from "@phosphor-icons/react/dist/ssr/Bicycle"

interface InfoboxSingleBookingProps {
  booking: Booking
  dialogMessage?: string | null
  actionToConfirm?: string | null
}

function InfoboxSingleBookingModal(BookingData: InfoboxSingleBookingProps) {
  const { booking, dialogMessage, actionToConfirm } = BookingData
  return (
    <>
      {/* ------------------------------- Modal Title ------------------------------ */}
      <p
        className={`flex items-center border-b border-slate-200 pb-4 text-start text-xl font-semibold ${
          actionToConfirm === BookingModalActions.CONFIRM && "text-green-700"
        } ${actionToConfirm === BookingModalActions.CANCEL && "text-rose-700"}
        `}
      >
        {actionToConfirm === BookingModalActions.INFO && (
          <span className="me-2 font-bold text-blue-700">
            <Info size={42} weight="fill" />
          </span>
        )}
        {actionToConfirm === BookingModalActions.CONFIRM && (
          <span className="me-2 font-bold text-emerald-700">
            <CheckCircle size={42} weight="fill" />
          </span>
        )}
        {actionToConfirm === BookingModalActions.CANCEL && (
          <span className="me-2 font-bold text-rose-700">
            <XCircle size={42} weight="fill" />
          </span>
        )}
        {`${actionToConfirm}`}{" "}
        {actionToConfirm !== BookingModalActions.INFO &&
          (booking.status === BookingStatus.BOOKED ? "Booking?" : "Return?")}
      </p>
      {/* -------------------------------------------------------------------------- */}

      <p className="text-start">{dialogMessage}</p>
      <div className="flex w-full flex-col gap-3 text-sm text-slate-600">
        <div className="flex w-full items-start rounded-2xl border p-3">
          <div className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-slate-300">
            <User size={32} className="text-white" />
          </div>
          <div className="flex flex-col justify-start px-3 text-left">
            <span className="line-clamp-1 text-wrap font-extrabold capitalize leading-4 text-blue-800">
              {booking.user}
            </span>
            <div className="font-semibold">Room: {booking.room}</div>
          </div>
        </div>
        <div className="flex w-full items-start rounded-2xl border p-3">
          <div className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-slate-300 p-1">
            <Bicycle size={32} className="text-white" />
          </div>
          <div className="flex flex-col justify-start px-3 text-left">
            <div className="font-extrabold capitalize text-blue-800">
              Bike {booking.bike}
            </div>
            <span className="grow">
              <p className="text-start font-semibold">
                Status:{" "}
                <span
                  className={`${booking.status === BookingStatus.BOOKED ? "text-yellow-500" : "text-rose-500"} font-extrabold capitalize`}
                >
                  {booking.status}
                </span>
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 text-left text-sm font-semibold text-slate-600">
        {booking.createdAt && (
          <>
            <p className="flex items-start">
              <span className="flex items-center">
                <Check size={12} className="me-1" /> Created:
              </span>
              <span className="px-1 font-normal">
                {formatDateString(booking.createdAt)}
              </span>
            </p>
            {/* {booking.createdByAccount && (
              <p className="flex items-start">
                <span className="flex items-center pl-4">By:</span>
                <span className="px-1 font-normal">
                  {booking.createdByAccount}
                </span>
              </p>
            )} */}
          </>
        )}
        {booking.confirmedAt && (
          <>
            <p className="flex items-start">
              <span className="flex items-center">
                <Check size={12} className="me-1" /> Confirmed:
              </span>
              <span className="px-1 font-normal">
                {formatDateString(booking.confirmedAt)}
              </span>
            </p>
            {/* {booking.confirmedByAccount && (
              <p className="flex items-start">
                <span className="flex items-center pl-4">By:</span>
                <span className="px-1 font-normal">
                  {booking.confirmedByAccount}
                </span>
              </p>
            )} */}
          </>
        )}
        {booking.returnedAt && (
          <>
            <p className="flex items-start">
              <span className="flex items-center">
                <Check size={12} className="me-1" /> Returned:
              </span>
              <span className="px-1 font-normal">
                {formatDateString(booking.returnedAt)}
              </span>
            </p>
            {/* {booking.returnedByAccount && (
              <p className="flex items-start">
                <span className="flex items-center pl-4">By:</span>
                <span className="px-1 font-normal">
                  {booking.returnedByAccount}
                </span>
              </p>
            )} */}
          </>
        )}
      </div>
    </>
  )
}

export default InfoboxSingleBookingModal
