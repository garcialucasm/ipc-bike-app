import React from "react"
import { IconSvgApprovalCircle, IconSvgDeleteCircle } from "../Others/IconsSvg"

function ActionResult(props: { isConfirmed: boolean }) {
  const messageServerResponseConfirmation = "Action confirmed!"
  const messageServerResponseError = "Oops... Something went wrong!"
  const isConfirmed = props.isConfirmed
  return (
    <>
      <div className="mb-8 flex p-8">
        {isConfirmed ? (
          <>
            {/* ------------------------- render action confirmed ------------------------ */}
            <span className="me-2 max-h-[26px] rounded-full border-2 border-green-700 p-0.5 font-bold text-emerald-700">
              {isConfirmed && <IconSvgApprovalCircle height="18px" />}
            </span>
            <span className="text-emerald-700">
              {messageServerResponseConfirmation}
            </span>
          </>
        ) : (
          <>
            {/* ------------------------- render action failed ------------------------ */}
            <span className="me-2 max-h-[26px] rounded-full border-2 border-rose-700 p-0.5 font-bold text-rose-700">
              <IconSvgDeleteCircle height="18px" />
            </span>
            <span className="text-rose-700">{messageServerResponseError}</span>
          </>
        )}
      </div>
    </>
  )
}

export default ActionResult
