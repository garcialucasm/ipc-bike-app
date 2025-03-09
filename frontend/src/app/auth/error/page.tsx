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
          <div className="mx-8 text-center">
            <p className="font-bold">Auth Error: {searchParams.error}.</p>
            <p>
              If this is your first login, your account must be approved by the
              admin first.{" "}
            </p>
          </div>
          <button onClick={handleClick} className="fixed right-2 p-2">
            <X size={24} />
          </button>
        </div>
      )}
      <Login />
    </>
  )
}
