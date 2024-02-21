"use client"

import React from "react"
import InputErrorMessage from "./InputErrorMessage"
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  errorMessage?: string
}

export default function InputText({
  children,
  errorMessage,
  ...attributes
}: Props) {
  return (
    <>
      <div className="my-2 w-full">
        <div
          className={`input-text min-h-11 ${errorMessage && "ring-1 ring-rose-600"}`}
        >
          {children}
          <input
            type="text"
            className={`w-full border-none pl-2 outline-none`}
            {...attributes}
          />
        </div>
        {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </div>
    </>
  )
}
