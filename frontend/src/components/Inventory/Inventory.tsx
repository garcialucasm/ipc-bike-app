"use client"

import { useEffect } from "react"
import TableHeader from "./modules/TableHeader"
import { useBikeContext } from "@/context/bikeAvailability"
import StatusIndicator from "../Others/StatusIndicator"
import ActionButtonInfo from "../Buttons/ActionButtonInfo"
import { BikeDTO, BikeStatus } from "@/types/BikeType"
import { toPascalCase } from "@/utils/strings"

function Inventory() {
  const { allBikes: allBikes, updatingAllBikes: updatingAllBikesAvailable } =
    useBikeContext()

  useEffect(() => {
    updatingAllBikesAvailable()
  }, [])

  // Function to sort bikes by numbering
  const sortByNumbering = (a: BikeDTO, b: BikeDTO) => {
    const numberingA = parseInt(a.Numbering)
    const numberingB = parseInt(b.Numbering)
    return numberingA - numberingB
  }

  if (allBikes && allBikes.length > 0) {
    // Sorting the bikes by numbering
    const sortedBikes = [...allBikes].sort(sortByNumbering)

    return (
      <>
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm text-slate-500 rtl:text-right">
            <TableHeader />
            <tbody>
              {sortedBikes.map((bike: BikeDTO) => (
                <tr
                  key={bike.ID}
                  className="whitespace-nowrap border-b-2 border-white bg-slate-100 py-4 text-slate-900"
                >
                  <th scope="row" className="p-2">
                    <div
                      className="flex justify-center"
                      title={bike.CurrentStatus}
                    >
                      <StatusIndicator
                        currentStatus={bike.CurrentStatus as BikeStatus}
                      />
                    </div>
                  </th>
                  <td className="p-2 font-medium">{bike.Numbering}</td>
                  <td className="p-2 text-slate-500">
                    {toPascalCase(bike.BikeType)}
                  </td>
                  <td className="p-2 text-slate-500">
                    {toPascalCase(bike.Size)}
                  </td>
                  {/* <td className="flex w-full flex-row items-center justify-center p-2">
                    <div title="Info">
                      <ActionButtonInfo name="info-booking"></ActionButtonInfo>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default Inventory
