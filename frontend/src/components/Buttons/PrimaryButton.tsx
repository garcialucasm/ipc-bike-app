import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, ...attributes }: Props) {
  return (
    <button type="button" className="w-full" {...attributes}>
      {children}
    </button>
  )
}
