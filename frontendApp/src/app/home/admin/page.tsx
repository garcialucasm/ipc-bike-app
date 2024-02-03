"use client"

import PrimaryButton from "@/components/Buttons/PrimaryButton"
import { useAuth } from "@/context/auth"

export default function Page() {
  const { account, login, logout } = useAuth()

  function setLogin() {
    login({ id: 1, name: "Lucas", token: "Token" })
  }
  function setLogout() {
    logout()
  }

  return (
    <>
      <div className="flex w-11/12 flex-col">
        <div className="flex flex-col items-center">
          <div className="my-3 w-full">
            {/* <AvailabilityContainer
              availabilitySelection={availabilityShowSelection}
            /> */}
            AvailabilityContainer
          </div>
          <div className="my-3 w-full">
            {/* <BookingsOverview /> */}BookingsOverview
          </div>
          <p>Page context component</p>
          <p>Account name: {account?.id}</p>
          <p>Account name: {account?.name}</p>
          <p>Account name: {account?.token}</p>
          <PrimaryButton onClick={() => setLogin()}>Login</PrimaryButton>
          <PrimaryButton onClick={() => setLogout()}>Logout</PrimaryButton>
        </div>
      </div>
    </>
  )
}
