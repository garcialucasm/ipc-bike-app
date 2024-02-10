import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function ActionButton({ children, ...attributes }: Props) {
  return (
    <button type="button" {...attributes} className="btn-action">
      {children}
    </button>
  )
}
