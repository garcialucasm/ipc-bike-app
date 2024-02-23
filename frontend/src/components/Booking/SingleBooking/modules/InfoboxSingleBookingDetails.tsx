import React from "react"

import { useSingleBookingContext } from "@/context/singleBooking"
import { IconSvgBikeStandard, IconSvgPerson } from "../../../Others/IconsSvg"
import { toPascalCase } from "@/utils/strings"

function InfoboxSingleBookingDetails() {
  const { bookingData } = useSingleBookingContext()
  const { firstName, lastName, roomNumber } = bookingData.userData
  const bikeSize = bookingData.bikeSize
  const bikeType = bookingData.bikeType
  const bikeNumbering = bookingData.bikeNumbering
  const fullName = firstName + " " + lastName

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <div className="flex w-full items-center rounded-2xl border bg-white p-3 sm:mb-3">
        <div className="flex">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-400">
            <IconSvgPerson fillColor="text-white" height="42" width="42" />
          </div>
          <div className="flex flex-col justify-start text-left text-slate-600">
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
      <div className="flex w-full items-center rounded-2xl border bg-white p-3 sm:mb-3">
        <div className="flex">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-400 p-1">
            <IconSvgBikeStandard
              height="42"
              width="42"
              fillColor="fill-white"
            />
          </div>
          <div className="flex flex-col justify-start text-left text-slate-600">
            <p className="px-3 font-extrabold capitalize leading-4 text-blue-800">
              Bike {bikeNumbering}
            </p>
            <div className="gap-x-2 divide-x divide-slate-400 px-3 text-xs font-semibold leading-loose">
              <span className="pe-1">{bikeType && toPascalCase(bikeType)}</span>
              <span className="px-1">{bikeSize && toPascalCase(bikeSize)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoboxSingleBookingDetails
