import React from "react"

import { useSingleBookingContext } from "@/context/singleBooking"
import { IconSvgBikeStandard, IconSvgPerson } from "../../../Others/IconsSvg"

function InfoboxSingleBookingDetails() {
  const { bookingData } = useSingleBookingContext()
  const { firstName, lastName, roomNumber } = bookingData.userData
  const bikeSize = bookingData.bikeSize
  const fullName = firstName + " " + lastName

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <div className="flex w-full items-center rounded-xl border bg-white p-3 shadow-md sm:mb-3">
        <div className="flex">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-400">
            <IconSvgPerson fillColor="text-white" height="42" width="42" />
          </div>
          <div className="flex flex-col justify-start text-left">
            <span className="px-3 font-extrabold capitalize leading-4 text-blue-800">
              {fullName}
            </span>
            <span className="px-3 text-xs font-semibold leading-loose">
              <span>Room: </span>
              <span className="text-blue-800">{roomNumber}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center rounded-xl border bg-white p-3 shadow-md sm:mb-3">
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
            <span className="px-3 text-xs">
              <span className="font-semibold  leading-loose">
                Bike selected
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoboxSingleBookingDetails
