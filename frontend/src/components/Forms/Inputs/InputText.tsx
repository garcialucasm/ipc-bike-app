"use client"

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
      <div className="w-full">
        <div
          className={`${errorMessage && "ring-1 ring-rose-400"} flex min-h-11 w-full items-center rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm`}
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
