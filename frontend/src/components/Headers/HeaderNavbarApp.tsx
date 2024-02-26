"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"
import Button from "@/components/Buttons/Button"
import { useAuth } from "@/context/auth"
import {
  IconSvgBecomeMember,
  IconSvgGroupBooking,
  IconSvgHome,
  IconSvgPersonCircle,
  IconSvgSingleBooking,
} from "@/components/Others/IconsSvg"
import { getDecodedToken, logout } from "@/app/auth/authUtils"
import { toPascalCase } from "@/utils/strings"

export default function HeaderNavbarApp() {
  const { accountData, settingAccountData: settingAccountData } = useAuth()
  const [isOpenedAccountMenu, setIsOpenedAccountMenu] = useState(false)
  const [isOpenedSideBar, setIsOpenedSideBar] = useState(false)
  const [closedAlert, setClosedAlert] = useState(false)
  const navbarMenuRef = useRef(null) // Reference to the sidebar button
  const accountMenuRef = useRef(null) // Reference to the dropdown-user container
  const sidebarMenuRef = useRef(null) // Reference to the sidebar container
  const router = useRouter()
  const accountName = accountData?.accountName
  const pathname = usePathname()

  function toggleAlertClosed() {
    setClosedAlert(true)
  }

  function toggleSideBarOpened() {
    setIsOpenedSideBar(!isOpenedSideBar)
  }

  function toggleAccountMenu() {
    setIsOpenedAccountMenu(!isOpenedAccountMenu)
  }

  function handleClick(buttonClicked: NavigationPaths) {
    switch (buttonClicked) {
      case NavigationPaths.logout:
        logout()
        router.push("/")
        return NavigationPaths.homeAppAdmin
      default:
        console.error(`Unknown section: ${buttonClicked}`)
        return NavigationPaths.homeWeb
    }
  }

  function setAccountInfo() {
    const decodedToken = getDecodedToken()
    if (decodedToken && !accountData?.isAuthenticated) {
      const accountId = decodedToken.id
      const accountName = toPascalCase(decodedToken.accountName)
      settingAccountData({
        id: accountId,
        accountName: accountName,
        isAuthenticated: true,
      })
    }
  }

  useEffect(() => {
    setAccountInfo()
  }, [])

  /* ------------------- Close the menus when clicks outside ------------------ */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accountMenuRef.current &&
        !(accountMenuRef.current as HTMLElement).contains(
          event.target as Node
        ) &&
        isOpenedAccountMenu &&
        navbarMenuRef.current &&
        !(navbarMenuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpenedAccountMenu(false)
      } else if (
        sidebarMenuRef.current &&
        !(sidebarMenuRef.current as HTMLElement).contains(
          event.target as Node
        ) &&
        isOpenedSideBar &&
        navbarMenuRef.current &&
        !(navbarMenuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpenedSideBar(false)
      }
    }
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside)

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpenedAccountMenu, isOpenedSideBar])

  return (
    <>
      <nav
        ref={navbarMenuRef}
        className="fixed top-0 z-50 h-16 w-full bg-gradient-to-tr from-blue-800 via-blue-800 to-blue-600 transition-transform"
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Button
                onClick={toggleSideBarOpened}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-slate-200 hover:bg-slate-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-slate-200 xl:hidden"
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
              <Link href="/" className="ms-2 flex md:me-24">
                <Image
                  src="/logo-ipc-white.png"
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
            <div className="flex items-center">
              <div className="ms-3 flex items-center">
                <div className=" text-slate-200 hover:text-white">
                  <Button
                    onClick={toggleAccountMenu}
                    type="button"
                    className="flex rounded-full text-sm focus:ring focus:ring-slate-300"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open menu</span>
                    <div className="text-white hover:text-blue-300">
                      <IconSvgPersonCircle width="42" height="42" />
                    </div>
                  </Button>
                </div>
                {isOpenedAccountMenu && (
                  <div
                    className={`absolute right-0 top-14 z-50 min-w-56 list-none rounded-2xl border bg-white`}
                    id="dropdown-user"
                  >
                    <div className="flex justify-center rounded-2xl bg-white text-left text-sm shadow-lg xl:text-base">
                      <div className="block w-full">
                        <div
                          className="border-b border-slate-200 px-10 py-3"
                          role="none"
                        >
                          <p className="text-xs text-slate-900" role="none">
                            Welcome,
                          </p>
                          <p
                            className="truncate text-base font-medium text-slate-900"
                            role="none"
                          >
                            {accountName}
                          </p>
                        </div>
                        <Link
                          href={NavigationPaths.profile}
                          className="text-slate-400"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 -960 960 960"
                                width="20"
                              >
                                <path
                                  className="fill-current"
                                  d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"
                                />
                              </svg>
                              <div className="px-2">Profile</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          href={NavigationPaths.register}
                          className="text-slate-700"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 -960 960 960"
                                width="20"
                              >
                                <path
                                  className="fill-current"
                                  d="M730-400v-130H600v-60h130v-130h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420-420 478-406.5 536-393 611-360q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm260-321q39 0 64.5-25.5T450-631q0-39-25.5-64.5T360-721q-39 0-64.5 25.5T270-631q0 39 25.5 64.5T360-541Zm0-90Zm0 411Z"
                                />
                              </svg>
                              <div className="px-2">Register</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          href={NavigationPaths.inventory}
                          className="text-slate-400"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 -960 960 960"
                                width="20"
                              >
                                <path
                                  className="fill-current"
                                  d="M194-160q-81 0-137.5-57T0-355q0-81 57.038-137.5Q114.075-549 195-549q71 0 124.5 45.5T384-388h51l-82-232h-73v-60h188v60h-52l26 71h222l-71-191H488v-60h99q24 0 40.5 11t24.5 33l76 207h38q80.51 0 137.255 56.234Q960-436.532 960-356.746 960-276 903.74-218 847.48-160 766-160q-71.602 0-125.801-48T574-328H384q-11 72-64.5 120T194-160Zm0-60q48 0 83.5-31t47.5-77H206v-60h119q-12-45-48-73t-82-28q-56 0-95.5 39T60-355q0 56.25 39 95.625T194-220Zm305-168h76q4-23 15.5-51t31.5-50H463l36 101Zm267 168q56 0 95-39.375T900-355q0-56-39-95t-95-39h-16l39 113-56 19-43-112q-29 17-43.5 48T632-355q0 56.25 39 95.625T766-220ZM193-355Zm573 0Z"
                                />
                              </svg>
                              <div className="px-2">Inventory</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          href={NavigationPaths.statistics}
                          className="text-slate-400"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 -960 960 960"
                                width="20"
                              >
                                <path
                                  className="fill-current"
                                  d="M120-120v-76l60-60v136h-60Zm165 0v-236l60-60v296h-60Zm165 0v-296l60 61v235h-60Zm165 0v-235l60-60v295h-60Zm165 0v-396l60-60v456h-60ZM120-356v-85l280-278 160 160 280-281v85L560-474 400-634 120-356Z"
                                />
                              </svg>
                              <div className="px-2">Statistics</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          href={NavigationPaths.settings}
                          className="text-slate-400"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-200 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 -960 960 960"
                                width="20"
                              >
                                <path
                                  className="fill-current"
                                  d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z"
                                />
                              </svg>
                              <div className="px-2">Settings</div>
                            </div>
                          </div>
                        </Link>
                        <Button
                          onClick={() => handleClick(NavigationPaths.logout)}
                          name={NavigationPaths.logout}
                          className="w-full text-left text-rose-600"
                        >
                          <div className="block rounded-b-2xl bg-rose-50 px-10 py-2 hover:rounded-b-2xl hover:bg-slate-200 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 -960 960 960"
                                width="20"
                              >
                                <path
                                  className="fill-current"
                                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
                                />
                              </svg>
                              <div className="px-2">Log out</div>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        ref={sidebarMenuRef}
        id="logo-sidebar"
        className={`${isOpenedSideBar ? "" : "-translate-x-full"} fixed left-0 top-0 z-40 mt-[64px] h-screen w-80 border-r border-slate-200 bg-slate-50 pb-24 pt-8 text-left text-slate-700 transition-transform xl:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-3 pb-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={NavigationPaths.homeAppAdmin}
                className={`group flex items-center rounded-2xl p-2 ${
                  pathname.includes("/home")
                    ? "header-menu-item-current-page"
                    : "hover:bg-slate-200 hover:text-blue-700"
                }`}
                onClick={toggleSideBarOpened}
              >
                <IconSvgHome height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href={NavigationPaths.singleBooking}
                className={`group flex items-center rounded-2xl p-2 ${
                  pathname === NavigationPaths.singleBooking
                    ? "header-menu-item-current-page"
                    : "hover:bg-slate-200 hover:text-blue-700"
                }`}
                onClick={toggleSideBarOpened}
                prefetch={false}
              >
                <IconSvgSingleBooking height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Single Booking
                </span>
              </Link>
            </li>
            <li className="text-slate-400">
              <Link
                href={NavigationPaths.groupBooking}
                className={`group flex items-center rounded-2xl p-2 ${
                  pathname === NavigationPaths.groupBooking
                    ? "header-menu-item-current-page"
                    : "hover:bg-slate-200 hover:text-blue-700"
                }`}
                onClick={toggleSideBarOpened}
              >
                <IconSvgGroupBooking height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Group Booking
                </span>
              </Link>
            </li>
            <li className="text-slate-400">
              <Link
                href={NavigationPaths.homeAppAdmin}
                className="group flex items-center rounded-2xl p-2 hover:bg-emerald-700 hover:text-slate-100"
                onClick={toggleSideBarOpened}
              >
                <IconSvgBecomeMember height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Become a member
                </span>
              </Link>
            </li>
          </ul>
          <div className="flex-grow">
            {!closedAlert && (
              <div
                id="dropdown-cta"
                className="mt-6 hidden w-full rounded-2xl border border-blue-300 bg-slate-100 p-4 xl:inline-block"
                role="alert"
              >
                <div className="mb-3 flex items-center">
                  <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800">
                    Beta
                  </span>
                  <button
                    type="button"
                    className="-mx-1.5 -my-1.5 ms-auto inline-flex h-6 w-6 items-center justify-center rounded-2xl p-1 text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400"
                    data-dismiss-target="#dropdown-cta"
                    aria-label="Close"
                    onClick={toggleAlertClosed}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-2.5 w-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mb-3 text-balance text-sm text-blue-800">
                  If you have any suggestions, feedback, or encounter any
                  difficulties, please feel free to use the form below. 😊
                </p>
                <a
                  className="text-sm font-medium text-blue-800 underline hover:text-blue-900"
                  href={NavigationPaths.homeWeb}
                  target="_blank"
                >
                  Link to Feedback Forms
                </a>
              </div>
            )}
          </div>
          <div className="i static flex flex-col items-center justify-center">
            <Image
              src="/logo-ipc-alumni-bike-blue.png"
              className="min-h-full w-48 p-4"
              width={300}
              height={399}
              alt=""
              priority
            />
          </div>
        </div>
      </aside>
    </>
  )
}
