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
import { ServerResult, initialServerResult } from "@/types/ServerResult"

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

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverResult, setServerResult] =
    useState<ServerResult>(initialServerResult)
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
    setServerResult(initialServerResult)
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
    <form className="h-full w-full" onSubmit={handleSubmitForm}>
      <ContainerSingleComponent>
        {/* ------------------------- render when is loading ------------------------- */}
        {isLoading && <IconSvgLoader height={"48"} fillColor="text-blue-800" />}

        {/* ------------------------- render after submit ------------------------- */}
        {!isLoading && serverResult.isConfirmed !== null && (
            <div className="mb-8 flex p-8 items-center">
              <ActionResult
                isConfirmed={serverResult.isConfirmed}
                personalizedMessage={serverResult.resultMessage as string}
              />
              {serverResult.isConfirmed === false && (
                <PrimaryButton onClick={handleCleanStates}>
                  Try again
                </PrimaryButton>
              )}
            </div>
        )}

        {/* ------------------------- render before submit ------------------------- */}
        {!isLoading && serverResult.isConfirmed === null && (
          <>
            <InstructionLabel>Please, enter the account data:</InstructionLabel>
            <InputText
              placeholder={"Name"}
              name={"accountName"}
              value={formRegisterAccount.accountName}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              errorMessage={errorMessages.email}
            >
              <IconSvgEmail fillColor="text-gray-400" width="24" height="24" />
            </InputText>
            <InputText
              name="password"
              type="password"
              placeholder="Password"
              value={formRegisterAccount.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
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
            <PrimaryButton type="submit">Register</PrimaryButton>
          </>
        )}
        <div className="link-secondary w-full">
          <Link href={NavigationPaths.homeApp}>
            <span className="block px-4 py-2">Return</span>
          </Link>
        </div>
      </ContainerSingleComponent>
    </form>
  )
}

export default RegisterForm
