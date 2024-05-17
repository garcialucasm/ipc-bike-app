"use client"

import Login from "@/components/Forms/LoginForm"
import { X } from "@phosphor-icons/react/dist/ssr"
import { useState } from "react"

type Props = {
  searchParams: {
    error?: string
  }
}

export default function AuthErrorPage({ searchParams }: Props) {
  const [isErrorVisible, setIsErrorVisible] = useState(true)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setIsErrorVisible(false)
  }

  return (
    <>
      {isErrorVisible && (
        <div className="fixed z-40 mb-4 flex w-full items-center justify-center rounded-sm bg-rose-700 p-4 text-white">
          <span className="mx-8">Auth Error: {searchParams.error}</span>
          <button onClick={handleClick} className="fixed right-2 p-2">
            <X size={24} />
          </button>
        </div>
      )}
      <Login />
    </>
  )
}
