import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function ActionButton({ children, ...attributes }: Props) {
  return (
    <button
      type="button"
      {...attributes}
      className="mx-0.5 w-fit rounded-full border border-slate-500 bg-white text-slate-500 transition-all duration-200 hover:bg-slate-500 hover:text-white hover:shadow-lg"
    >
      {children}
    </button>
  )
}
