import { CheckCircle } from "@phosphor-icons/react/dist/icons/CheckCircle"
import { XCircle } from "@phosphor-icons/react/dist/icons/XCircle"
import React from "react"

function ActionResult(props: {
  isConfirmed: boolean
  personalizedMessage?: string
}) {
  const personalizedMessage = props.personalizedMessage
  const messageServerResponseConfirmation =
    personalizedMessage === "" ? "Action confirmed!" : personalizedMessage
  const messageServerResponseError =
    personalizedMessage === ""
      ? "Oops... Something unexpected happened."
      : personalizedMessage
  const isConfirmed = props.isConfirmed
  return (
    <>
      {isConfirmed ? (
        <>
          {/* ------------------------- render action confirmed ------------------------ */}
          <span className="me-2 font-bold text-emerald-700">
            {isConfirmed && <CheckCircle size={42} weight="fill" />}
          </span>
          <span className="text-emerald-700">
            {messageServerResponseConfirmation}
          </span>
        </>
      ) : (
        <>
          {/* ------------------------- render action failed ------------------------ */}
          <span className="me-2 font-bold text-rose-700">
            <XCircle size={42} weight="fill" />
          </span>
          <span className="text-rose-700">{messageServerResponseError}</span>
        </>
      )}
    </>
  )
}

export default ActionResult
