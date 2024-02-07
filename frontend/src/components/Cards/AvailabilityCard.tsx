"use client"

import { BikeSize, BikeStatus } from "@/types/BikeType"
import {
  IconSvgBikeStandard,
  IconSvgBikeBooked,
  IconSvgBikeInUse,
  IconSvgBikeDisabled,
} from "../Others/IconsSvg"
import StatusIndicator from "../Others/StatusIndicator"
import { useBikeAvailabilityContext } from "@/context/bikeAvailability"

function AvailabilityCard(props: {
  selectedStatus: BikeStatus
  bikeSize?: BikeSize
}) {
  const selectedStatus = props.selectedStatus as BikeStatus

  const { bikeAvailabilityCardData } = useBikeAvailabilityContext()

  const currentBikeCount = bikeAvailabilityCardData[selectedStatus] ?? 2

  let cardTextColorByStatus = "bg-slate-200 text-slate-600"
  let cardColorByStatus = "border border-s-2"
  let textLabel: string

  if (selectedStatus === BikeStatus.FREE) {
    textLabel = "available"
    cardTextColorByStatus = "text-emerald-600 border-slate-200"
    cardColorByStatus = "bg-emerald-600"
  } else if (selectedStatus === BikeStatus.BOOKED) {
    textLabel = "to confirm"
    cardTextColorByStatus = "text-amber-600 border-slate-200"
    cardColorByStatus = "bg-amber-600"
  } else if (selectedStatus === BikeStatus.INUSE) {
    textLabel = "in use"
    cardTextColorByStatus = "text-rose-600 border-slate-200"
    cardColorByStatus = "bg-rose-600"
  } else if (selectedStatus === BikeStatus.DISABLED) {
    textLabel = "disabled"
    cardTextColorByStatus = "text-slate-600 border-slate-200"
    cardColorByStatus = "bg-slate-600"
  } else {
    textLabel = ""
    console.error(`Unknown bike status: ${selectedStatus}`)
  }

  return (
    <>
      <div
        className={`px-auto flex w-full flex-col justify-between overflow-hidden rounded-2xl border-l border-r border-t border-slate-100 bg-gradient-to-tr from-slate-100 via-slate-100 to-slate-50 font-semibold ${cardTextColorByStatus}`}
      >
        <span>
          <StatusIndicator
            currentStatus={selectedStatus}
            isStatic={false}
            height="h-3"
            width="w-3"
          />
        </span>
        <div className="flex items-center justify-center p-2">
          <div className="rounded-full border-2 border-slate-500 p-3 shadow-inner">
            {selectedStatus === BikeStatus.FREE && (
              <IconSvgBikeStandard
                height="48"
                width="48"
                fillColor="fill-slate-600"
              />
            )}
            {selectedStatus === BikeStatus.BOOKED && (
              <IconSvgBikeBooked
                height="48"
                width="48"
                fillColor1="fill-slate-600"
                fillColor2="fill-slate-600"
                fillColor3="fill-slate-400"
                fillColor4="fill-slate-400"
              />
            )}
            {selectedStatus === BikeStatus.INUSE && (
              <IconSvgBikeInUse
                height="48"
                width="48"
                fillColor1="fill-slate-600"
                fillColor2="fill-slate-400"
              />
            )}
            {selectedStatus === BikeStatus.DISABLED && (
              <IconSvgBikeDisabled
                height="48"
                width="48"
                fillColor1="fill-slate-500"
                fillColor2="fill-slate-600"
              />
            )}
          </div>
        </div>
        <span className="px-2 pb-2 text-left text-4xl">
          {currentBikeCount}
          <span className="px-1 text-xs text-slate-500">{textLabel}</span>
        </span>
        <span className={`h-1 ${cardColorByStatus}`}></span>
        {/* <div
          className={`{flex w-full pb-1 items-center justify-center rounded-b-xl text-slate-100 ${cardColorByStatus}`}
        ></div> */}
      </div>
    </>
  )
}

export default AvailabilityCard
