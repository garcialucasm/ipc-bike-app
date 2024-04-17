"use client"

import { useEffect, useState } from "react"
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
  const router = useRouter()
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  })
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await login(formLoginData.email, formLoginData.password)

    if (response.data) {
      // If the request is successful, proceed with the desired actions
      setIsLoading(true)
      await setCookie("ipcBikeApp_authToken", response.data.account.token)
      window.location.replace(NavigationPaths.homeApp)
    } else if (response.error) {
      // If there is an error response from the server, handle specific error messages
      switch (response.error) {
        case 401:
          setErrorMessages({
            email: "Login failed.",
            password: "Please check your email and password.",
          })
          break
        // Add more cases based on specific error status codes if needed
        default:
          setErrorMessages({
            email: "",
            password:
              "Oops! Something went wrong. Please try again in a few moments.",
          })
          break
      }
    } else {
      // Handle unexpected errors or errors when trying to fetch data
      console.error("Authentication error: error when trying to fetch data ")
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

  async function isAuthRedirection() {
    const isAuth = await checkAuth()
    if (isAuth) {
      window.location.replace(NavigationPaths.homeApp)
    }
  }

  useEffect(() => {
    isAuthRedirection()
  }, [])

  return (
    <>
      <div className="h-screen md:flex">
        <div className="i relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-950 via-blue-800 to-blue-600 md:flex md:flex-col">
          <Image
            src="/logo-ipc-bike-white.png"
            className="h-56 w-auto"
            width={300}
            height={399}
            alt=""
            priority
          />
          <p className="mt-1 text-white">Book, Ride, Explore: All for Free</p>
        </div>
        <div className="fixed flex h-16 w-full items-center bg-gradient-to-tr from-blue-950 via-blue-800 to-blue-600 px-4 md:hidden">
          <Link href={NavigationPaths.homeWeb} className="ms-2 flex">
            <Image
              src="/logo-ipc-bike-white-h.png"
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
            <p className="mb-7 text-sm font-normal text-gray-600">
              Welcome Back
            </p>
            {isLoading ? (
              <IconSvgLoader height={"48"} fillColor="text-blue-800" />
            ) : (
              <div className="flex w-full flex-col gap-y-4">
                <InputText
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formLoginData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  errorMessage={errorMessages.email}
                  autoComplete="email"
                >
                  <IconSvgEmail
                    fillColor="text-gray-400"
                    width="24"
                    height="24"
                  />
                </InputText>
                <InputText
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formLoginData.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  errorMessage={errorMessages.password}
                  autoComplete="current-password"
                >
                  <IconSvgPassword
                    fillColor="text-gray-400"
                    width="24"
                    height="24"
                  />
                </InputText>
                <div className="mt-4 flex w-full flex-col gap-y-4 py-2">
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
                    <span>Go to Webpage</span>
                  </SecondaryButton>
                </div>
                {/* <span className="text ps-1-slate-500 ml-2 cursor-pointer text-xs hover:text-blue-500">
                  Forgot Password ?
                </span> */}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
