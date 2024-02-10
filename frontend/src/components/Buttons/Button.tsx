import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...attributes }: Props) {
  return (
    <button type="button" {...attributes}>
      {children}
    </button>
  )
}
