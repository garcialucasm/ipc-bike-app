import React from "react"

import { IconSvgBikeStandard } from "@/components/Others/IconsSvg"
import { BookingModalActions, BookingStatus } from "@/types/BookingType"
import { CheckCircle, User, XCircle } from "@phosphor-icons/react"

interface InfoboxSingleBookingProps {
  userName: string | null
  bikeType: string | null
  bikeNumbering?: string | null
  bookingStatus?: string | null
  dialogMessage?: string | null
  actionToConfirm?: string | null
}

function InfoboxSingleBookingModal(BookingData: InfoboxSingleBookingProps) {
  const {
    bikeType: bikeSize,
    userName,
    bikeNumbering,
    bookingStatus,
    dialogMessage,
    actionToConfirm,
  } = BookingData

  return (
    <>
      <p
        className={`flex items-center border-b border-slate-200 pb-4 text-start text-xl font-semibold ${
          actionToConfirm === BookingModalActions.CONFIRM
            ? "text-green-700"
            : "text-rose-700"
        }`}
      >
        {actionToConfirm === BookingModalActions.CONFIRM ? (
          <span className="me-2 font-bold text-emerald-700">
            <CheckCircle size={42} weight="fill" />
          </span>
        ) : (
          <span className="me-2 font-bold text-rose-700">
            <XCircle size={42} weight="fill" />
          </span>
        )}
        {`${actionToConfirm} ${
          bookingStatus === BookingStatus.BOOKED ? "Booking" : "Return"
        } ?`}
      </p>
      <p className="text-start">{dialogMessage}</p>
      <div className="flex w-full flex-col gap-3 text-slate-600">
        <div className="flex w-full items-center rounded-2xl border bg-white p-3">
          <div className="flex">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-400">
              <User size={36} className="text-white" />
            </div>
            <div className="flex flex-col justify-start text-left">
              <p className="px-3 font-extrabold capitalize leading-4 text-blue-800">
                {userName}
              </p>
              <p className="px-3 text-xs font-semibold leading-loose">
                Status:{" "}
                <span
                  className={`${bookingStatus === BookingStatus.BOOKED ? "text-yellow-500" : "text-rose-500"} font-extrabold`}
                >
                  {bookingStatus}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center rounded-2xl border bg-white p-3">
          <div className="flex">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-400 p-1">
              <IconSvgBikeStandard
                height="42"
                width="42"
                fillColor="fill-white"
              />
            </div>
            <div className="flex flex-col justify-start text-left">
              <span className="px-3 font-extrabold capitalize leading-4 text-blue-800">
                {bikeSize}
              </span>
              <span className="grow px-3 text-xs">
                <span className="font-semibold leading-loose">
                  Bike selected:{" "}
                  <span className="text-lg font-bold leading-4 text-blue-800">
                    {" "}
                    {bikeNumbering}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoboxSingleBookingModal
