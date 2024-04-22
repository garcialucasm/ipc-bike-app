"use client"

import { User } from "@phosphor-icons/react/dist/ssr/User"

interface Props {
  roomNumber: string
  fullName: string
}

function UserDetails({ roomNumber, fullName }: Props) {
  return (
    <div className="flex w-full items-center rounded-2xl border bg-white p-3 sm:mb-3">
      <div className="flex">
        <div className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-slate-400">
          <User size={36} className="text-white" />
        </div>
        <div className="flex flex-col justify-start text-left text-slate-600">
          <span className="line-clamp-2 text-wrap px-3 font-extrabold capitalize leading-4 text-blue-800">
            {fullName}
          </span>
          <span className="px-3 text-xs font-semibold leading-loose">
            <span>Room: </span>
            <span className="text-blue-800">{roomNumber}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
