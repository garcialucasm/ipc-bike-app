"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { X } from "@phosphor-icons/react/dist/ssr/X"

import { NavigationPaths } from "@/types/NavigationPaths"
import PrimaryButton from "@/components/Buttons/PrimaryButton"
import SecondaryButton from "@/components/Buttons/SecondaryButton"
import { checkAuth } from "@/app/auth/authUtils"
import { useFramerMotion } from "@/context/framerMotion"
import HalfPageLogo from "./modules/HalfPageLogo"
import { Bicycle } from "@phosphor-icons/react/dist/ssr/Bicycle"
import { Key } from "@phosphor-icons/react/dist/ssr/Key"

const HomePage = () => {
  const { data: session } = useSession()
  const { motion } = useFramerMotion()
  const router = useRouter()
  const [showTooltip, setShowTooltip] = useState(false)

  function handleBookBikeButton() {
    router.push(NavigationPaths.homeAppPublic)
  }

  function handleKeykeeperButton() {
    router.push(NavigationPaths.login)
  }

  function handleReturnButton() {
    router.push(NavigationPaths.homeWeb)
  }

  async function isAuthRedirection() {
    const isAuth = await checkAuth()
    if (isAuth && session) {
      window.location.replace(NavigationPaths.homeAppSecure)
    }
  }

  useEffect(() => {
    isAuthRedirection()
  }, [])

  return (
    <>
      <div className="h-screen text-sm md:flex">
        <HalfPageLogo />
        <div className="mt-[72px] flex h-full flex-col items-center bg-white py-10 md:mt-0 md:w-1/2 md:justify-center md:py-0">
          <motion.div
            viewport={{ once: true }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex w-2/3 flex-col gap-y-2 md:w-2/3 lg:w-1/2 2xl:w-1/3"
          >
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Hello! 👋</h1>
            <p className="mb-6 font-normal text-gray-600">Welcome Back</p>
            <div className="relative py-1">
              New here?{" "}
              <span
                className="cursor-help underline"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                Let's get started!
              </span>
              {showTooltip && (
                <div className="background-solid-noise absolute left-0 top-8 rounded bg-blue-700 px-4 py-6 text-white shadow-2xl">
                  <span className="absolute right-0 top-0 p-2 opacity-50">
                    <X size={20} />
                  </span>
                  <p>
                    You can learn more about the rules and the terms of service
                    by clicking the 'About the Project' button below this pop
                    up. 👇
                  </p>
                  <span className="my-2 flex justify-center">
                    <hr className="my-1 w-4/5 border-white border-opacity-20" />
                  </span>
                  <p>
                    For more information, please contact the student council.
                  </p>
                </div>
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
              <PrimaryButton onClick={handleBookBikeButton}>
                <div className="flex items-center gap-x-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white p-1 text-blue-600">
                    <Bicycle size={32} weight="bold" />
                  </div>
                  <div className="flex w-full justify-center pr-9">
                    Book a Bike
                  </div>
                </div>
              </PrimaryButton>
              <div className="my-4 flex items-center justify-center">
                <hr className="w-1/4 border-gray-300" />
                <span className="mx-4 text-gray-500">or</span>
                <hr className="w-1/4 border-gray-300" />
              </div>
            </motion.span>
            <PrimaryButton onClick={handleKeykeeperButton}>
              <div className="flex items-center gap-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white p-1.5 text-blue-600">
                  <Key size={32} weight="fill" />
                </div>
                <div className="flex w-full justify-center pr-9">
                  I'm a Keykeeper
                </div>
              </div>
            </PrimaryButton>

            <div className="mt-2">
              <SecondaryButton
                onClick={handleReturnButton}
                name={NavigationPaths.homeWeb}
              >
                <span>About the Project</span>
              </SecondaryButton>
            </div>
            <p className="mt-2">
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

export default HomePage
