import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function SecondaryButton({ children, ...attributes }: Props) {
  return (
    <button type="button" className="btn-secondary w-full" {...attributes}>
      {children}
    </button>
  )
}
