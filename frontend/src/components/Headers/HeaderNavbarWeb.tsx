"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { NavigationPaths } from "@/types/NavigationPaths"
import Button from "../Buttons/Button"
import { useFramerMotion } from "@/context/framerMotion"

export default function HeaderNavbarWeb() {
  const pathname = usePathname()
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  function handleMenuClick() {
    setIsMenuOpened(!isMenuOpened)
  }

  function handleNavigationClick() {
    if (isMenuOpened) {
      setIsMenuOpened(!isMenuOpened)
    }
  }

  useEffect(() => {
    function handleScroll() {
      const position = window.scrollY
      if (position > 10) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <nav
        className={`fixed start-0 top-0 z-20 w-full outline outline-1 outline-offset-1 outline-white/[.3] backdrop-blur-xl lg:backdrop-blur-none ${isScrolling && "backdrop-blur-xl lg:backdrop-blur-xl"} ${isMenuOpened && "bg-black bg-opacity-50 lg:bg-transparent"}`}
      >
        <div
          className={`mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4`}
        >
          <div
            className={`flex grow items-center justify-start rtl:justify-end`}
          >
            <Button
              onClick={handleMenuClick}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-slate-200 hover:bg-slate-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-slate-200 lg:hidden xl:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </Button>
            <Link
              href={NavigationPaths.homeWeb}
              className={`ms-2 flex lg:me-24`}
            >
              <Image
                src="/logo-ipc-bike-white-h.png"
                className="h-6 w-auto xl:h-8"
                width={300}
                height={399}
                alt=""
                loading="lazy"
              />
              <span className="sr-only self-center whitespace-nowrap text-xl font-semibold sm:text-2xl">
                IPC Bike App
              </span>
            </Link>
          </div>
          <div className="flex space-x-3 lg:order-2 lg:space-x-0 rtl:space-x-reverse">
            <Link
              href={NavigationPaths.home}
              className="btn-primary rounded-full text-sm"
            >
              <span className="px-1">
                Go to App
                <span className="hidden ps-2 sm:inline-block">-&gt;</span>
              </span>
            </Link>
          </div>
          <div
            className="w-full items-center justify-between px-8 lg:order-1 lg:flex lg:w-auto"
            id="navbar-sticky"
          >
            <ul
              className={`mt-4 flex flex-col rounded-lg border border-gray-700 p-4 font-medium lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:p-0 rtl:space-x-reverse ${!isMenuOpened && "hidden lg:flex"}`}
              onClick={handleNavigationClick}
            >
              <li>
                <Link
                  href={NavigationPaths.homeWeb}
                  className={`block rounded px-3 py-2 hover:text-blue-300 lg:bg-transparent lg:p-0 ${
                    pathname === NavigationPaths.homeWeb
                      ? "text-blue-500"
                      : "text-white"
                  } ${!isMenuOpened && "hidden lg:block"}`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={NavigationPaths.termsOfService}
                  className={`block rounded px-3 py-2 hover:text-blue-300 lg:bg-transparent lg:p-0 ${
                    pathname === NavigationPaths.privacyPolicy
                      ? "text-blue-500"
                      : "text-white"
                  } ${!isMenuOpened && "hidden lg:block"}`}
                  aria-current="page"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href={NavigationPaths.privacyPolicy}
                  className={`block rounded px-3 py-2 hover:text-blue-300 lg:bg-transparent lg:p-0 ${
                    pathname === NavigationPaths.project
                      ? "text-blue-500"
                      : "text-white"
                  } ${!isMenuOpened && "hidden lg:block"}`}
                  aria-current="page"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={NavigationPaths.about}
                  className={`block rounded px-3 py-2 hover:text-blue-300 lg:bg-transparent lg:p-0 ${
                    pathname === NavigationPaths.about
                      ? "text-blue-500"
                      : "text-white"
                  } ${!isMenuOpened && "hidden lg:block"}`}
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={NavigationPaths.contact}
                  className={`block rounded px-3 py-2 hover:text-blue-300 lg:bg-transparent lg:p-0 ${
                    pathname === NavigationPaths.contact
                      ? "text-blue-500"
                      : "text-white"
                  } ${!isMenuOpened && "hidden lg:block"}`}
                  aria-current="page"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
