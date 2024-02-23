import React from "react"

import {
  IconSvgBikeStandard,
  IconSvgPerson,
} from "@/components/Others/IconsSvg"

interface InfoboxSingleBookingProps {
  userName: string | null
  bikeSize: string | null
  bikeType: string | null
  bikeNumbering?: string | null
  bookingStatus?: string | null
}

function InfoboxSingleBooking(BookingData: InfoboxSingleBookingProps) {
  const { bikeType, bikeSize, userName, bikeNumbering, bookingStatus } =
    BookingData

  return (
    <div className="flex w-full flex-col gap-3 text-slate-700">
      <div className="flex w-full items-center rounded-2xl border bg-white p-3 shadow-md">
        <div className="flex">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-400">
            <IconSvgPerson fillColor="text-white" height="42" width="42" />
          </div>
          <div className="flex flex-col justify-start text-left">
            <p className="px-3 font-extrabold capitalize leading-4 text-blue-800">
              {userName}
            </p>
            <p className="px-3 text-xs font-extrabold leading-loose">
              Status: {bookingStatus}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center rounded-2xl border bg-white p-3 shadow-md">
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
                <span className="text-xl font-bold text-blue-800">
                  {" "}
                  {bikeNumbering}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoboxSingleBooking
