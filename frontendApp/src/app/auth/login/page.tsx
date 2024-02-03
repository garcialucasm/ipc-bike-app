"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import { NavigationPaths } from "@/types/NavigationPaths"
import Image from "next/image"
import { login } from "@/services/bookingApi"
import { setCookie } from "@/app/utils/cookieUtils"
import { validateLogin } from "@/app/utils/validators"

export interface ErrorMessageLogin {
  email: string
  password: string
}

const errorMessage: ErrorMessageLogin = {
  email: "",
  password: "",
}

function Login() {
  const router = useRouter()
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  })
  const [errorMessages, setErrorMessages] = useState(errorMessage)

  const handleBlur = () => {
    // TODO: turn on the login validation by removing the comment below
    // setErrorMessages(validateLogin(formLoginData));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      formLoginData.email !== "" &&
      formLoginData.password !== "" &&
      errorMessages.email === "" &&
      errorMessages.password === ""
    ) {
      try {
        const response = await login(
          formLoginData.email,
          formLoginData.password
        )

        if (response.data) {
          await setCookie("ipcBikeApp_authToken", response.data.token)
          router.replace(NavigationPaths.homeAppAdmin)
        }
      } catch (error) {
        console.error("Authentication error: ", error)
        // TODO: Handle incorrect credentials
        // Handle authentication error
      }
    }
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

  function handleReturnButton() {
    router.replace(NavigationPaths.homeWeb)
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
        <div className="flex items-center justify-center bg-white py-10 md:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white">
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Hello! 👋</h1>
            <p className="mb-7 text-sm font-normal text-gray-600">
              Welcome Back
            </p>
            <div className="flex items-center rounded-2xl border-2 px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={formLoginData.email}
                className="border-none pl-2 outline-none"
                type="text"
                name="email"
                id="email"
                required={true}
                placeholder="User name or e-mail"
              />
            </div>
            <span className="text-wrap px-1 text-xs text-red-600">
              {errorMessages.email}
            </span>
            <div className="mt-4 flex items-center rounded-2xl border-2 px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={formLoginData.password}
                className="border-none pl-2 outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required={true}
              />
            </div>
            <span className="text-wrap px-1 text-xs text-red-600">
              {errorMessages.password}
            </span>
            <div className="mt-4 block w-full py-2">
              <PrimaryButton
                type="submit"
                name={NavigationPaths.homeAppAdmin}
                className="btn-primary"
              >
                <span>Log in</span>
              </PrimaryButton>
              <PrimaryButton
                onClick={handleReturnButton}
                name={NavigationPaths.homeWeb}
                className="btn-return"
              >
                <span>Return</span>
              </PrimaryButton>
            </div>
            <span className="text ps-1-slate-500 ml-2 cursor-pointer text-xs hover:text-blue-500">
              Forgot Password ?
            </span>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
