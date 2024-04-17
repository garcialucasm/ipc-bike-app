"use client"

import { IconSvgBikeStandard } from "@/components/Others/IconsSvg"
import { toPascalCase } from "@/utils/strings"

interface Props {
  bikeNumbering: string
  bikeType: string | null
  bikeSize: string | null
}

function BikeDetails({ bikeNumbering, bikeType, bikeSize }: Props) {
  return (
<div className="flex w-full items-center rounded-2xl border bg-white p-3 sm:mb-3">
        <div className="flex">
          <div className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-slate-400 p-1">
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
  )
}

export default BikeDetails
