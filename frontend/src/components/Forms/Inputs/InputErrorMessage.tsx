"use client"

import React from "react"
interface Props {
  children: React.ReactNode
}

export default function InputErrorMessage({ children, ...attributes }: Props) {
  return (
    <p
      className="text-wrap px-4 py-1 text-start text-xs text-red-600 transition duration-1000"
      {...attributes}
    >
      {children}
    </p>
  )
}

export function InputErrorMessageInvalidPassword() {
  return (
    <>
      <div className="px-4 py-1 text-start text-xs text-red-600 transition duration-1000">
        <p>Password requirements:</p>
        <ul className="list-disc pl-5">
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Contains at least one lowercase letter</li>
          <li>Contains at least one number</li>
          <li>Contains at least one special character</li>
        </ul>
      </div>
    </>
  )
}
