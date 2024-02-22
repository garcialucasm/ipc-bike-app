"use client"

import React, { useState } from "react"
import Link from "next/link"

import {
  IconSvgPassword,
  IconSvgPersonFilled,
  IconSvgEmail,
  IconSvgLoader,
} from "@/components/Others/IconsSvg"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import { NavigationPaths } from "@/types/NavigationPaths"
import InputText from "@/components/Forms/Inputs/InputText"
import { AccountDTO } from "@/types/AccountType"
import ActionResult from "../ActionResult/ActionResult"
import { registerAccountFetchApi } from "@/services/accountApi"
import InstructionLabel from "../Others/InstructionLabel"
import { ErrorMessageRegister } from "@/types/ErrorMessageTypes"
import {
  errorMessagePasswordInvalid,
  formValidationRegister,
} from "@/utils/validators"
import { InputErrorMessageInvalidPassword } from "./Inputs/InputErrorMessage"
import ContainerSingleComponent from "../Containers/ContainerSingleComponent"

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

function RegisterForm() {
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
      const response = await registerAccountFetchApi(formRegisterAccount)
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
    <ContainerSingleComponent>
      <form className="h-full w-full" onSubmit={handleSubmitForm}>
        {/* ------------------------- render when is loading ------------------------- */}
        {isLoading && <IconSvgLoader height={"48"} fillColor="text-blue-800" />}

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
            <InstructionLabel>Please, enter the account data:</InstructionLabel>
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
            <span className="block px-4 py-2">Return</span>
          </Link>
        </div>
      </form>
    </ContainerSingleComponent>
  )
}

export default RegisterForm
