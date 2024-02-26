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
import SecondaryButton from "../Buttons/SecondaryButton"
import { ServerResult } from "@/types/ServerResult"

const initialAccountData: AccountDTO = {
  accountName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
}
const initialErrorMessages: ErrorMessageRegister = {
  accountName: "",
  email: "",
  password: "",
}

const inicialServerResult: ServerResult = {
  isConfirmed: null,
  resultMessage: "",
}

function FirstRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverResult, setServerResult] =
    useState<ServerResult>(inicialServerResult)
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
      if (response.data) {
        // If the request is successful, proceed with the desired actions
        setServerResult({
          isConfirmed: true,
          resultMessage: "Successfully registered",
        })
      } else if (response.error) {
        setServerResult({
          isConfirmed: false,
          resultMessage: response.error,
        })
      }
    } else {
      // Handle unexpected errors or errors when trying to fetch data
      setServerResult({
        isConfirmed: false,
        resultMessage: "Unexpected error. Please try again later.",
      })
    }
    setIsLoading(false)
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
    setServerResult(inicialServerResult)
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
      formRegisterAccount.passwordConfirmation &&
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
        <div className="mt-[64px] flex items-center justify-center bg-white py-10 md:mt-0 md:w-1/2">
          <form
            onSubmit={handleSubmitForm}
            className="flex w-1/2 flex-col items-center justify-center bg-white md:w-2/3 lg:w-1/2 2xl:w-1/3"
          >
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Hello! 👋</h1>
            <p className="mb-7 text-sm font-normal text-gray-600">Welcome</p>
            {/* ------------------------- render when is loading ------------------------- */}
            {isLoading && (
              <div className="flex items-center justify-center">
                <IconSvgLoader height={"48"} fillColor="text-blue-800" />
              </div>
            )}

            {/* ------------------------- render after submit ------------------------- */}
            {!isLoading && serverResult.isConfirmed !== null && (
              <>
                <ActionResult
                  isConfirmed={serverResult.isConfirmed}
                  personalizedMessage={serverResult.resultMessage as string}
                />
                {serverResult.isConfirmed === false && (
                  <div className="my-4 w-full">
                    <PrimaryButton onClick={handleCleanStates}>
                      Try again
                    </PrimaryButton>
                  </div>
                )}
                {serverResult.isConfirmed && (
                  <div className="my-4 flex w-full flex-col gap-y-4">
                    <div className="link-primary w-full">
                      {/* TODO:-------------------- Create an automatic login process ------------------- */}
                      <Link href={NavigationPaths.login}>
                        <span className="block px-4 py-2 text-center">
                          Login
                        </span>
                      </Link>
                    </div>
                    <SecondaryButton onClick={handleCleanStates}>
                      Register another user
                    </SecondaryButton>
                  </div>
                )}
              </>
            )}

            {/* ------------------------- render before submit ------------------------- */}
            {!isLoading && serverResult.isConfirmed === null && (
              <>
                <div className="flex w-full flex-col gap-y-4">
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
                  <InputText
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confirm Password"
                    value={formRegisterAccount.passwordConfirmation}
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
                <div className="mb-4 mt-8 w-full">
                  <PrimaryButton type="submit">Register</PrimaryButton>
                </div>
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
