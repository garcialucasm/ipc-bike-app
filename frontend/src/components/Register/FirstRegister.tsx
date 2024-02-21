"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { NavigationPaths } from "@/types/NavigationPaths"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import { registerFirstAccountFetchApi } from "@/services/accountApi"
import { AccountDTO } from "@/types/AccountType"
import {
  errorMessagePasswordInvalid,
  formValidationRegister,
} from "@/utils/validators"
import { ErrorMessageRegister } from "@/types/ErrorMessageTypes"
import { InputErrorMessageInvalidPassword } from "../Forms/Inputs/InputErrorMessage"
import InputText from "../Forms/Inputs/InputText"
import {
  IconSvgEmail,
  IconSvgLoader,
  IconSvgPassword,
  IconSvgPersonFilled,
} from "../Others/IconsSvg"
import ActionResult from "../ActionResult/ActionResult"

const initialAccountData: AccountDTO = {
  accountName: "",
  email: "",
  password: "",
}
const initialErrorMessages: ErrorMessageRegister = {
  accountName: "",
  email: "",
  password: "",
}

function FirstRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverResult, setServerResult] = useState<boolean | null>(null)
  const [formRegisterAccount, setFormRegisterAccount] =
    useState<AccountDTO>(initialAccountData)
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages)

  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // Prevent default form submission
    const validationErrors = formValidationRegister(formRegisterAccount)
    setErrorMessages(validationErrors)

    if (isFormValid()) {
      setIsLoading(true)
      const response = await registerFirstAccountFetchApi(formRegisterAccount)
      if (response.error) {
        setServerResult(false)
      } else {
        setServerResult(true)
      }
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormRegisterAccount({
      ...formRegisterAccount,
      [e.target.name]: e.target.value,
    })
  }

  const handleCleanStates = (): void => {
    setFormRegisterAccount(initialAccountData)
    setIsLoading(false)
    setServerResult(null)
  }

  const handleBlur = () => {
    setErrorMessages(formValidationRegister(formRegisterAccount))
  }

  const handleFocus = () => {
    setErrorMessages({
      accountName: "",
      email: "",
      password: "",
    })
  }

  const isFormValid = () => {
    if (
      formRegisterAccount.accountName &&
      formRegisterAccount.email &&
      formRegisterAccount.password &&
      !errorMessages.accountName &&
      !errorMessages.email &&
      !errorMessages.password
    ) {
      return true
    }
  }

  return (
    <>
      <div className="h-screen md:flex">
        <div className="i relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-950 via-blue-800 to-blue-600 md:flex md:flex-col">
          <Image
            src="/logo-ipc-alumni-bike-white.png"
            className="h-56 w-auto"
            width={300}
            height={399}
            alt=""
            priority
          />
          <p className="mt-1 text-white">Book, Ride, Explore: All for Free</p>
        </div>
        <div className="fixed flex h-16 w-full items-center bg-gradient-to-tr from-blue-950 via-blue-800 to-blue-600 px-4 md:hidden">
          <Link href="/" className="ms-2 flex">
            <Image
              src="/logo-ipc-alumni-bike-white-h2.png"
              className="h-8 w-auto"
              width={300}
              height={399}
              alt=""
            />
            <span className="sr-only self-center whitespace-nowrap text-xl font-semibold sm:text-2xl">
              IPC Bike App
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center bg-white py-10 md:w-1/2">
          <form onSubmit={handleSubmitForm} className="bg-white">
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Hello! 👋</h1>
            <p className="mb-7 text-sm font-normal text-gray-600">Welcome</p>
            {/* ------------------------- render when is loading ------------------------- */}
            {isLoading && (
              <IconSvgLoader height={"48"} fillColor="text-blue-800" />
            )}

            {/* ------------------------- render after submit ------------------------- */}
            {!isLoading && serverResult !== null && (
              <>
                <ActionResult isConfirmed={serverResult} />
                {!serverResult && (
                  <PrimaryButton onClick={handleCleanStates}>
                    Try again
                  </PrimaryButton>
                )}
              </>
            )}

            {/* ------------------------- render before submit ------------------------- */}
            {!isLoading && serverResult === null && (
              <>
                <div className="flex w-full flex-col">
                  <InputText
                    placeholder={"Name"}
                    name={"accountName"}
                    value={formRegisterAccount.accountName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    errorMessage={errorMessages.accountName}
                  >
                    <IconSvgPersonFilled
                      fillColor="text-gray-400"
                      width="24"
                      height="24"
                    />
                  </InputText>
                  <InputText
                    name="email"
                    placeholder="Email"
                    value={formRegisterAccount.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    errorMessage={errorMessages.email}
                  >
                    <IconSvgEmail
                      fillColor="text-gray-400"
                      width="24"
                      height="24"
                    />
                  </InputText>
                  <InputText
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formRegisterAccount.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    errorMessage={errorMessages.password}
                  >
                    <IconSvgPassword
                      fillColor="text-gray-400"
                      width="24"
                      height="24"
                    />
                  </InputText>
                  {errorMessages.password === errorMessagePasswordInvalid && (
                    <InputErrorMessageInvalidPassword />
                  )}
                </div>
                <PrimaryButton type="submit">Register</PrimaryButton>
              </>
            )}
            <div className="link-secondary w-full">
              <Link href={NavigationPaths.homeApp}>
                <span className="block px-4 py-2 text-center">Main Page</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FirstRegister
