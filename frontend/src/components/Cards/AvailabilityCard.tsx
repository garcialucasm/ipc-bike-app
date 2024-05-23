"use client"

import { BikeSize, BikeStatus } from "@/types/BikeType"
import StatusIndicator from "../Others/StatusIndicator"
import { useBikeContext } from "@/context/bikeAvailability"
import { Wrench } from "@phosphor-icons/react/dist/ssr/Wrench"
import { Bicycle } from "@phosphor-icons/react/dist/ssr/Bicycle"
import { Ticket } from "@phosphor-icons/react/dist/ssr/Ticket"
import { IconSvgBikeInUse } from "../Others/IconsSvg"

function AvailabilityCard(props: {
  selectedStatus: BikeStatus
  bikeSize?: BikeSize
}) {
  const selectedStatus = props.selectedStatus as BikeStatus

  const { bikeStatusCount: bikeStatusCount } = useBikeContext()

  const currentBikeCount = bikeStatusCount[selectedStatus]

  let cardTextColorByStatus = "bg-slate-200 text-slate-600"
  let cardColorByStatus = "bg-slate-600"
  let textLabel: string

  if (selectedStatus === BikeStatus.FREE) {
    textLabel = "available"
    cardTextColorByStatus = "text-emerald-600"
    cardColorByStatus = "bg-emerald-600"
  } else if (selectedStatus === BikeStatus.BOOKED) {
    textLabel = "to confirm"
    cardTextColorByStatus = "text-amber-600"
    cardColorByStatus = "bg-amber-600"
  } else if (selectedStatus === BikeStatus.INUSE) {
    textLabel = "in use"
    cardTextColorByStatus = "text-rose-600"
    cardColorByStatus = "bg-rose-600"
  } else if (selectedStatus === BikeStatus.DISABLED) {
    textLabel = "disabled"
    cardTextColorByStatus = "text-slate-600"
    cardColorByStatus = "bg-slate-600"
  } else {
    textLabel = ""
    console.error(`Unknown bike status: ${selectedStatus}`)
  }

  return (
    <>
      <div
        className={`px-auto flex h-36 w-full min-w-32 flex-col justify-between overflow-hidden rounded-2xl border-l border-r border-t border-slate-100 bg-gradient-to-tr from-slate-100 to-slate-200 font-semibold ${cardTextColorByStatus}`}
      >
        <span>
          <StatusIndicator
            currentStatus={selectedStatus}
            isStatic={false}
            height="h-4"
            width="w-4"
          />
        </span>
        <div className="flex h-12 -translate-y-5 items-center justify-end px-2 text-white">
          {selectedStatus === BikeStatus.FREE && <Bicycle size={72} />}
          {selectedStatus === BikeStatus.BOOKED && <Ticket size={72} />}
          {selectedStatus === BikeStatus.INUSE && (
            <IconSvgBikeInUse height="64" width="64" fillColor="fill-white" />
          )}
          {selectedStatus === BikeStatus.DISABLED && <Wrench size={72} />}
        </div>
        <span className="z-30 px-2 pb-2 text-left text-4xl">
          {currentBikeCount || 0}
          <span className="px-1 text-xs text-slate-500">{textLabel}</span>
        </span>
        <span className={`h-1.5 ${cardColorByStatus}`}></span>
      </div>
    </>
  )
}

export default AvailabilityCard
