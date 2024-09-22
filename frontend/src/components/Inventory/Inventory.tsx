"use client"

import { useEffect, useRef, useState } from "react"
import TableHeader from "./modules/TableHeader"
import { useBikeContext } from "@/context/bikeAvailability"
import StatusIndicator from "../Others/StatusIndicator"
import { BikeDTO, BikeModalActions, BikeStatus } from "@/types/BikeType"
import { toPascalCase } from "@/utils/strings"
import ActionButtonReturnMaintenance from "../Buttons/ActionButtonReturnMaintenance"
import ActionButtonSendMaintenance from "../Buttons/ActionButtonSendMaintenance"
import SecondaryButton from "../Buttons/SecondaryButton"
import { toggleMaintenanceFetchApi } from "@/services/bikeApi"
import PrimaryButton from "../Buttons/PrimaryButton"
import ActionResult from "../ActionResult/ActionResult"
import { Wrench } from "@phosphor-icons/react/dist/ssr/Wrench"
import BikeDetails from "../Booking/SingleBooking/modules/BikeDetails"
import { useAuth } from "@/context/auth"
import { AccountTypePermission } from "@/types/AccountType"

const messageInitial = "Confirm Action"
const messageReturnMaintenance =
  "This will make the bike available for booking."
const messageSendMaintenance =
  "This will make the bike unavailable for booking."

const emptyBike = {
  ID: 0,
  Numbering: "",
  BikeType: "",
  Size: "",
  CurrentStatus: BikeStatus.FREE,
  IsActive: true,
}

const emptyModalAction = {
  isOpen: false,
  bike: emptyBike,
  actionToConfirm: null,
  dialogMessage: messageInitial,
  isConfirmed: null,
  resultMessage: "",
}

function Inventory() {
  const { accountData } = useAuth()
  const { allBikes: allBikes, updatingAllBikes } = useBikeContext()
  const [reloadData, setReloadData] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const isCurrentUserAdmin: boolean =
    accountData?.accountType === AccountTypePermission.ADMIN && true
  const [modalAction, setModalAction] = useState<{
    isOpen: boolean
    bike: BikeDTO
    actionToConfirm: BikeModalActions | null
    dialogMessage: string
    isConfirmed: boolean | null
    resultMessage: string
  }>(emptyModalAction)

  /* ---------------- Handle maintenance button to redirect to modal --------------- */
  async function handleClick(bike: BikeDTO) {
    let action: BikeModalActions | null = null
    let message: string = ""
    if (bike.CurrentStatus === BikeStatus.FREE) {
      action = BikeModalActions.SENDMAINTENANCE
      message = messageSendMaintenance
    } else {
      action = BikeModalActions.RETURNMAINTENANCE
      message = messageReturnMaintenance
    }
    setModalAction((prev) => ({
      ...prev,
      isOpen: true,
      bike: bike,
      actionToConfirm: action,
      dialogMessage: message,
    }))
  }

  /* ------------------------ Handle confirm action modal ------------------------ */
  async function handleConfirmAction(confirm: boolean) {
    if (confirm && modalAction.bike.Numbering) {
      const response = await toggleMaintenanceFetchApi(
        modalAction.bike.Numbering
      )
      handleServerResponse(response)
      setModalAction((prev) => ({
        ...prev,
        actionToConfirm: BikeModalActions.RESPONSE,
      }))
    } else {
      setModalAction(emptyModalAction)
    }
  }

  function handleServerResponse(response: any) {
    if (response.data) {
      // If the request is successful, proceed with the desired actions
      let actionMessage: string = "Action confirmed"
      if (modalAction.actionToConfirm === BikeModalActions.SENDMAINTENANCE) {
        actionMessage = "The bike was sent for maintenance successfully!"
      }
      if (modalAction.actionToConfirm === BikeModalActions.RETURNMAINTENANCE) {
        actionMessage = "The bike is ready to use again!"
      }
      setModalAction((prev) => ({
        ...prev,
        isConfirmed: true,
        resultMessage: actionMessage,
      }))
    } else if (response.error) {
      setModalAction((prev) => ({
        ...prev,
        isConfirmed: false,
        resultMessage: response.error,
      }))
    } else {
      // Handle unexpected errors or errors when trying to fetch data
      setModalAction((prev) => ({
        ...prev,
        isConfirmed: false,
        resultMessage: "Sorry. Something unexpected happened!",
      }))
    }
  }

  const handleModalClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleConfirmAction(false)
    }
  }

  useEffect(() => {
    updatingAllBikes()
  }, [reloadData])

  useEffect(() => {
    document.addEventListener("mousedown", handleModalClick)

    return () => {
      document.removeEventListener("mousedown", handleModalClick)
    }
  }, [])

  if (allBikes && allBikes.length > 0) {
    return (
      <>
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left text-sm text-slate-500 rtl:text-right">
            <TableHeader shouldHideActions={isCurrentUserAdmin} />
            <tbody>
              {allBikes.map((bike: BikeDTO) => (
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
                  {isCurrentUserAdmin && (
                    <td className="flex w-full flex-row items-center justify-center p-2">
                      {bike.CurrentStatus === BikeStatus.FREE && (
                        <div title="Send for Maintenance" className="flex">
                          <ActionButtonSendMaintenance
                            onClick={() => handleClick(bike)}
                            name="send-for-maintenance"
                          ></ActionButtonSendMaintenance>
                        </div>
                      )}
                      {(bike.CurrentStatus === BikeStatus.BOOKED ||
                        bike.CurrentStatus === BikeStatus.INUSE) && (
                        <div
                          title="Only bikes with free status can go for maintenance"
                          className="flex"
                        >
                          <span className="pointer-events-none opacity-20">
                            <ActionButtonSendMaintenance name="send-for-maintenance"></ActionButtonSendMaintenance>
                          </span>
                        </div>
                      )}
                      {bike.CurrentStatus === BikeStatus.DISABLED && (
                        <div title="Return from Maintenance" className="flex">
                          <ActionButtonReturnMaintenance
                            onClick={() => handleClick(bike)}
                            name="return-from-maintenance"
                          ></ActionButtonReturnMaintenance>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------------------------- Modal: Confirm action -------------------------- */}
        {modalAction.isOpen &&
          (modalAction.actionToConfirm === BikeModalActions.SENDMAINTENANCE ||
            modalAction.actionToConfirm ===
              BikeModalActions.RETURNMAINTENANCE) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
              <div
                ref={modalRef}
                className="grid min-w-72 max-w-md gap-y-4 rounded-2xl bg-white p-8 sm:min-w-96"
              >
                {/* ------------------------------- Modal Title ------------------------------ */}
                <p
                  className={`flex items-center border-b border-slate-200 pb-4 text-start text-xl font-semibold ${
                    modalAction.actionToConfirm ===
                      BikeModalActions.SENDMAINTENANCE && "text-amber-600"
                  } ${modalAction.actionToConfirm === BikeModalActions.RETURNMAINTENANCE && "text-blue-600"}`}
                >
                  <span className="me-2 font-bold">
                    <Wrench size={42} weight="fill" />
                  </span>
                  {modalAction.actionToConfirm ===
                  BikeModalActions.SENDMAINTENANCE
                    ? "Send bike for maintenance?"
                    : "Return bike from maintenance?"}
                </p>
                {/* -------------------------------------------------------------------------- */}
                <p className="text-left">{modalAction.dialogMessage}</p>
                <BikeDetails
                  bikeNumbering={modalAction.bike.Numbering}
                  bikeType={modalAction.bike.BikeType}
                  bikeSize={modalAction.bike.Size}
                />
                <div className="flex justify-end gap-x-3">
                  <SecondaryButton
                    onClick={() => handleConfirmAction(false)}
                    className="btn-secondary w-full max-w-16"
                  >
                    No
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={() => handleConfirmAction(true)}
                    className="btn-primary ms-0 w-full max-w-24"
                  >
                    Yes
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}

        {/* -------------------------- Modal: Server response -------------------------- */}
        {modalAction.isOpen &&
          modalAction.actionToConfirm == BikeModalActions.RESPONSE && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 backdrop-blur">
              <div
                ref={modalRef}
                className="m-8 grid max-w-md gap-y-4 rounded-2xl bg-white p-8 md:min-w-96"
              >
                <p
                  className={`flex items-center border-b border-slate-200 pb-4 text-start text-xl font-semibold`}
                >
                  {modalAction.isConfirmed !== null && (
                    <ActionResult
                      isConfirmed={modalAction.isConfirmed}
                      personalizedMessage={modalAction.resultMessage as string}
                    />
                  )}
                </p>
                <div className="flex justify-center">
                  <SecondaryButton
                    onClick={() => {
                      handleConfirmAction(false), setReloadData(!reloadData)
                    }}
                    className="btn-secondary w-full max-w-24"
                  >
                    Ok
                  </SecondaryButton>
                </div>
              </div>
            </div>
          )}
      </>
    )
  }
}

export default Inventory
