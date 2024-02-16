"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { NavigationPaths } from "@/types/NavigationPaths"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import { checkAuth, setCookie } from "@/app/auth/authUtils"
import { login } from "@/services/accountApi"
import { ErrorMessageLogin } from "@/types/ErrorMessageTypes"
import InputText from "./Inputs/InputText"
import {
  IconSvgEmail,
  IconSvgLoader,
  IconSvgPassword,
} from "../Others/IconsSvg"

const initialErrorMessages: ErrorMessageLogin = {
  email: "",
  password: "",
}

const Login = () => {
  useEffect(() => {
    isAuthRedirection()
  }, [])
  const router = useRouter()
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  })
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages)
  const [isLoading, setIsLoading] = useState(false)

  async function isAuthRedirection() {
    const isAuth = checkAuth()
    if (await isAuth) {
      router.replace(NavigationPaths.homeApp)
    }
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await login(formLoginData.email, formLoginData.password)
      if (response.data) {
        setIsLoading(true)
        await setCookie("ipcBikeApp_authToken", response.data.account.token)
        window.location.reload()
      } else {
        setErrorMessages({
          email: "Login failed.",
          password: "Please check your email and password.",
        })
      }
    } catch (error) {
      console.log("Authentication error: ", error)
      setErrorMessages({
        email: "",
        password:
          "Oops! Something went wrong. Please try again in a few moments.",
      })
    }
  }

  function handleReturnButton() {
    router.push(NavigationPaths.homeWeb)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormLoginData({
      ...formLoginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFocus = () => {
    setErrorMessages({
      email: "",
      password: "",
    })
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
              src="/logo-ipc-alumni-bike-white-h.png"
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
        <div className="my-24 flex justify-center bg-white md:w-1/2">
          <form
            onSubmit={handleSubmitForm}
            className="flex w-1/2 flex-col items-center justify-center bg-white md:w-1/3"
          >
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Hello! 👋</h1>
            <p className="mb-7 text-sm font-normal text-gray-600">
              Welcome Back
            </p>
            {isLoading ? (
              <IconSvgLoader height={"48"} fillColor="text-blue-800" />
            ) : (
              <>
                <InputText
                  name="email"
                  placeholder="Email"
                  value={formLoginData.email}
                  onChange={handleChange}
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
                  value={formLoginData.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  errorMessage={errorMessages.password}
                >
                  <IconSvgPassword
                    fillColor="text-gray-400"
                    width="24"
                    height="24"
                  />
                </InputText>
                <div className="mt-4 w-full py-2">
                  <PrimaryButton
                    type="submit"
                    name={NavigationPaths.homeAppAdmin}
                  >
                    <span>Log in</span>
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={handleReturnButton}
                    name={NavigationPaths.homeWeb}
                  >
                    <span>Return</span>
                  </SecondaryButton>
                </div>
                <span className="text ps-1-slate-500 ml-2 cursor-pointer text-xs hover:text-blue-500">
                  Forgot Password ?
                </span>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
