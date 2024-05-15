"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { WarningCircle } from "@phosphor-icons/react/dist/ssr/WarningCircle"
import { X } from "@phosphor-icons/react/dist/ssr/X"
import { LockSimple } from "@phosphor-icons/react/dist/ssr/LockSimple"

import { NavigationPaths } from "@/types/NavigationPaths"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import InputText from "./Inputs/InputText"
import { IconSvgEmail, IconSvgLoader } from "../Others/IconsSvg"
import { checkAuth } from "@/app/auth/authUtils"
import { useFramerMotion } from "@/context/framerMotion"

const ERROR_MESSAGE_LOGIN =
  "Sign in failed. Check the details you provided are correct."

const ERROR_UNEXPECTED = "Ops... Something went wrong."

const Login = () => {
  const { data: session, status } = useSession()
  const { motion } = useFramerMotion()
  const router = useRouter()
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [errorLogin, setErrorLogin] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)
  const [credentialsData, setCredentialsData] = useState({
    email: "",
    password: "",
  })

  const signInCredentials = async (e: { preventDefault: () => void }) => {
    setErrorLogin("")
    e.preventDefault()
    const res = await signIn("credentials", {
      ...credentialsData,
      redirect: false,
    })
    if (res?.status == 200) {
      router.push(NavigationPaths.homeApp)
    } else if (res?.status == 401) {
      setErrorLogin(ERROR_MESSAGE_LOGIN)
    } else setErrorLogin(ERROR_UNEXPECTED)
  }

  const singInGoogle = async () => {
    await signIn("google", {
      redirect: false,
      callbackUrl: NavigationPaths.homeApp, // Optional: Redirect URL after successful sign-in
    })
  }

  const singInFacebook = async () => {
    await signIn("facebook", {
      redirect: false,
      callbackUrl: NavigationPaths.homeApp, // Optional: Redirect URL after successful sign-in
    })
  }

  function handleReturnButton() {
    router.push(NavigationPaths.homeWeb)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentialsData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  async function isAuthRedirection() {
    const isAuth = await checkAuth()
    if (isAuth && session) {
      window.location.replace(NavigationPaths.homeApp)
    }
  }

  useEffect(() => {
    isAuthRedirection()
  }, [])

  return (
    <>
      <div className="h-screen md:flex">
        <div className="background-mash-noise-light relative hidden w-1/2 items-center justify-center overflow-hidden md:flex md:flex-col">
          <motion.span
            viewport={{ once: true }}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Image
              src="/logo-ipc-bike-white.png"
              className="h-56 w-auto"
              width={224}
              height={224}
              alt=""
              priority
            />
          </motion.span>
          <motion.p
            viewport={{ once: true }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="mt-1 text-white"
          >
            Book, Ride, Explore: All for Free
          </motion.p>
        </div>
        <div className="fixed flex h-16 w-full items-center bg-blue-700 px-4 md:hidden">
          <Link href={NavigationPaths.homeWeb} className="ms-2 flex">
            <Image
              src="/logo-ipc-bike-white-h.png"
              className="h-8 w-auto"
              width={194}
              height={32}
              alt=""
            />
            <span className="sr-only self-center whitespace-nowrap text-xl font-semibold sm:text-2xl">
              IPC Bike App
            </span>
          </Link>
        </div>
        <div className="mt-[64px] flex flex-col items-center justify-center bg-white py-10 md:mt-0 md:w-1/2 md:py-0">
          <motion.div
            viewport={{ once: true }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex w-1/2 flex-col gap-y-2 md:w-2/3 lg:w-1/2 2xl:w-1/3"
          >
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Hello! 👋</h1>
            <p className="mb-6 text-sm font-normal text-gray-600">
              Welcome Back
            </p>
            {status === "loading" ? (
              <div className="flex w-full justify-center">
                <IconSvgLoader height={"48"} fillColor="text-blue-800" />
              </div>
            ) : (
              <>
                {!isEmailOpen && (
                  <>
                    <div className="relative pb-2 text-sm">
                      New here?{" "}
                      <span
                        className="cursor-help underline"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        Let's get started!
                      </span>
                      {showTooltip && (
                        <motion.div
                          viewport={{ once: true }}
                          initial={{ y: -10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01],
                          }}
                          className="absolute left-0 top-8 rounded bg-blue-600 px-4 py-8 text-white shadow-2xl"
                        >
                          <span className="absolute right-0 top-0 p-2 opacity-40">
                            <X size={20} />
                          </span>
                          If you don't have an account yet, we'll create one for
                          you when you sign in with{" "}
                          <span className="underline">Google</span> or{" "}
                          <span className="underline">Facebook</span>.
                        </motion.div>
                      )}
                    </div>
                    <motion.span
                      viewport={{ once: true }}
                      initial={{ y: -20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      className="flex flex-col gap-y-2"
                    >
                      <PrimaryButton onClick={singInGoogle}>
                        <div className="flex items-center gap-x-2 text-sm">
                          <Image
                            src="/google-logo.png"
                            className="h-9 w-auto rounded-full bg-white p-1"
                            width={40}
                            height={40}
                            alt=""
                            priority
                          />
                          Sign in with Google
                        </div>
                      </PrimaryButton>
                      <PrimaryButton onClick={singInFacebook}>
                        <div className="flex items-center gap-x-2 text-sm">
                          <Image
                            src="/facebook-logo.png"
                            className="h-9 w-auto rounded-full"
                            width={40}
                            height={40}
                            alt=""
                            priority
                          />
                          Sign in with Facebook
                        </div>
                      </PrimaryButton>
                      <div className="my-4 flex items-center justify-center">
                        <hr className="w-1/4 border-gray-300" />
                        <span className="mx-4 text-gray-500">or</span>
                        <hr className="w-1/4 border-gray-300" />
                      </div>
                    </motion.span>
                  </>
                )}

                {isEmailOpen ? (
                  <motion.span
                    viewport={{ once: true }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <>
                      <SecondaryButton
                        onClick={() => {
                          setIsEmailOpen(!isEmailOpen)
                          setErrorLogin("")
                        }}
                      >
                        <div className="flex items-center gap-x-2 text-sm">
                          <ArrowLeft size={24} className="h-9 w-auto py-1.5" />
                          Sign in with E-mail
                        </div>
                      </SecondaryButton>{" "}
                      <form
                        className="mt-4 flex flex-col items-center justify-center bg-white"
                        onSubmit={signInCredentials}
                      >
                        <div className="flex w-full flex-col gap-y-2">
                          <InputText
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Email"
                            value={credentialsData.email}
                            onChange={handleChange}
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
                            autoComplete="current-password"
                            value={credentialsData.password}
                            onChange={handleChange}
                          >
                            <LockSimple
                              size={24}
                              weight="fill"
                              className="text-slate-400"
                            />
                          </InputText>
                          <div className="flex w-full flex-col ">
                            <PrimaryButton
                              type="submit"
                              name={NavigationPaths.homeAppAdmin}
                            >
                              <span>Sign in</span>
                            </PrimaryButton>
                          </div>
                        </div>
                      </form>
                    </>
                  </motion.span>
                ) : (
                  <motion.div
                    viewport={{ once: true }}
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <PrimaryButton
                      onClick={() => {
                        setIsEmailOpen(!isEmailOpen)
                        setErrorLogin("")
                      }}
                    >
                      <div className="flex items-center gap-x-2 text-sm">
                        <span className="h-9 w-auto rounded-full bg-white p-1.5">
                          <IconSvgEmail
                            fillColor="text-gray-700"
                            width="24"
                            height="24"
                          />
                        </span>
                        Sign in with E-mail
                      </div>
                    </PrimaryButton>
                  </motion.div>
                )}
                {errorLogin && (
                  <div className="flex items-start justify-start text-sm text-rose-400">
                    <span className="px-2">
                      <WarningCircle size={20} />
                    </span>
                    {errorLogin}
                  </div>
                )}
                <div className="mt-2">
                  <SecondaryButton
                    onClick={handleReturnButton}
                    name={NavigationPaths.homeWeb}
                  >
                    <span>Go to Webpage</span>
                  </SecondaryButton>
                </div>
              </>
            )}
            <p className="text-sm">
              Learn about our{" "}
              <Link
                href={NavigationPaths.privacyPolicy}
                className="text-blue-600"
              >
                Privacy Policy
              </Link>{" "}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Login
