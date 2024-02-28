import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function ActionButton({ children, ...attributes }: Props) {
  return (
    <button
      type="button"
      {...attributes}
      className="rounded-full text-slate-500 transition-all duration-200"
    >
      {children}
    </button>
  )
}
