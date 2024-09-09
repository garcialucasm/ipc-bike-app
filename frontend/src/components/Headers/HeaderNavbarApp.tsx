"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { PersonSimpleBike } from "@phosphor-icons/react/dist/ssr/PersonSimpleBike"
import { Users } from "@phosphor-icons/react/dist/ssr/Users"
import { HandHeart } from "@phosphor-icons/react/dist/ssr/HandHeart"
import { House } from "@phosphor-icons/react/dist/ssr/House"
import { UserCircle } from "@phosphor-icons/react/dist/ssr/UserCircle"
import { XCircle } from "@phosphor-icons/react/dist/ssr/XCircle"
import { UserCirclePlus } from "@phosphor-icons/react/dist/ssr/UserCirclePlus"
import { Bicycle } from "@phosphor-icons/react/dist/ssr/Bicycle"
import { SignOut } from "@phosphor-icons/react/dist/ssr/SignOut"
import { Info } from "@phosphor-icons/react/dist/ssr/Info"
import { UserCircleGear } from "@phosphor-icons/react/dist/ssr/UserCircleGear"

import { NavigationPaths } from "@/types/NavigationPaths"
import Button from "@/components/Buttons/Button"
import { useAuth } from "@/context/auth"
import { getDecodedToken, logout } from "@/app/auth/authUtils"
import { toPascalCase } from "@/utils/strings"
import { FileText } from "@phosphor-icons/react/dist/ssr/FileText"
import { useSession } from "next-auth/react"
import { AccountTypePermission } from "@/types/AccountType"

export default function HeaderNavbarApp() {
  const { accountData, settingAccountData } = useAuth()
  const { data: session } = useSession()
  const [isOpenedAccountMenu, setIsOpenedAccountMenu] = useState(false)
  const [isOpenedSideBar, setIsOpenedSideBar] = useState(false)
  const [closedAlert, setClosedAlert] = useState(false)
  const navbarMenuRef = useRef(null) // Reference to the sidebar button
  const accountMenuRef = useRef(null) // Reference to the dropdown-user container
  const sidebarMenuRef = useRef(null) // Reference to the sidebar container
  const router = useRouter()
  const accountName = accountData?.accountName
  const pathname = usePathname()
  const isSecure = pathname.includes("/secure")
  const isCurrentUserAdmin =
    accountData?.accountType === AccountTypePermission.ADMIN && true

  function toggleAlertClosed() {
    setClosedAlert(true)
  }

  function toggleSideBarOpened() {
    setIsOpenedSideBar(!isOpenedSideBar)
  }

  function toggleAccountMenu() {
    setIsOpenedAccountMenu(!isOpenedAccountMenu)
  }

  async function handleClick(buttonClicked: NavigationPaths) {
    switch (buttonClicked) {
      case NavigationPaths.logout:
        await logout()
        window.location.replace(NavigationPaths.login)
        return NavigationPaths.home
      case NavigationPaths.home:
        router.push(NavigationPaths.home)
      default:
        console.error(`Unknown section: ${buttonClicked}`)
        return NavigationPaths.homeWeb
    }
  }

  function setAccountInfo() {
    const decodedToken = getDecodedToken("ipcBikeApp_authToken")
    if (decodedToken && !accountData?.isAuthenticated) {
      const accountId = decodedToken.id
      const accountName = toPascalCase(decodedToken.accountName)
      const accountType = decodedToken.accountType
      settingAccountData({
        id: accountId,
        accountName: accountName,
        isAuthenticated: true,
        accountType: accountType,
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
              <Link
                href={NavigationPaths.homeWeb}
                className="ms-2 flex items-center md:me-24"
              >
                <Image
                  src="/logo-ipc-bike-white-h.png"
                  className="h-8 w-auto xl:h-10"
                  width={720}
                  height={119}
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
                    className="flex rounded-full text-sm"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open menu</span>
                    <div className="text-white hover:text-slate-100">
                      {isOpenedAccountMenu ? (
                        <XCircle size={42} weight="fill" />
                      ) : (
                        <UserCircle size={42} weight="fill" />
                      )}
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
                          className="flex gap-x-2 border-b border-slate-200 px-8 py-3"
                          role="none"
                        >
                          {session?.user?.image && (
                            <img
                              src={session.user.image}
                              className="h-10 w-10 rounded-full border-2"
                              alt=""
                            />
                          )}
                          <div>
                            <p className="text-xs" role="none">
                              Welcome,
                            </p>
                            <p
                              className="truncate text-base font-medium"
                              role="none"
                            >
                              {session?.user?.name
                                ? toPascalCase(session.user.name)
                                : accountName && toPascalCase(accountName)}
                            </p>
                          </div>
                        </div>
                        {isSecure && (
                          <>
                            {/* <Link
                              href={NavigationPaths.register}
                              className="text-slate-700"
                              onClick={() => setIsOpenedAccountMenu(false)}
                            >
                              <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                                <div className="flex w-fit items-center">
                                  <UserCirclePlus size={20} />
                                  <div className="px-2">Register</div>
                                </div>
                              </div>
                            </Link> */}
                            {isCurrentUserAdmin && (
                              <Link
                                href={NavigationPaths.accountManager}
                                className="text-slate-700"
                                onClick={() => setIsOpenedAccountMenu(false)}
                              >
                                <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                                  <div className="flex w-fit items-center">
                                    <UserCircleGear size={20} />
                                    <div className="px-2">Manage Accounts</div>
                                  </div>
                                </div>
                              </Link>
                            )}
                            <Link
                              href={NavigationPaths.inventory}
                              onClick={() => setIsOpenedAccountMenu(false)}
                            >
                              <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                                <div className="flex w-fit items-center">
                                  <Bicycle size={20} />
                                  <div className="px-2">Inventory</div>
                                </div>
                              </div>
                            </Link>
                          </>
                        )}
                        {/* <Link
                          href={NavigationPaths.statistics}
                          className="text-slate-400"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-100 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <ChartLine size={20} />
                              <div className="px-2">Statistics</div>
                            </div>
                          </div>
                        </Link> */}
                        <a
                          href={NavigationPaths.termsOfService}
                          target="_blank"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-200 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <FileText size={20} />
                              <div className="px-2">Usage rules</div>
                            </div>
                          </div>
                        </a>
                        <a
                          href={NavigationPaths.project}
                          target="_blank"
                          onClick={() => setIsOpenedAccountMenu(false)}
                        >
                          <div className="block px-10 py-2 hover:bg-slate-200 hover:text-blue-700">
                            <div className="flex w-fit items-center">
                              <Info size={20} />
                              <div className="px-2">About</div>
                            </div>
                          </div>
                        </a>
                        {isSecure ? (
                          <Button
                            onClick={() => handleClick(NavigationPaths.logout)}
                            name={NavigationPaths.logout}
                            className="w-full text-left text-rose-600"
                          >
                            <div className="block rounded-b-2xl bg-rose-50 px-10 py-2 hover:rounded-b-2xl hover:bg-slate-200 hover:text-blue-700">
                              <div className="flex w-fit items-center">
                                <SignOut size={20} weight="fill" />
                                <div className="px-2">Log out</div>
                              </div>
                            </div>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleClick(NavigationPaths.home)}
                            name={NavigationPaths.home}
                            className="w-full text-left text-rose-600"
                          >
                            <div className="block rounded-b-2xl bg-rose-50 px-10 py-2 hover:rounded-b-2xl hover:bg-slate-200 hover:text-blue-700">
                              <div className="flex w-fit items-center">
                                <SignOut size={20} weight="fill" />
                                <div className="px-2">Home Page</div>
                              </div>
                            </div>
                          </Button>
                        )}
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
        className={`${isOpenedSideBar ? "" : "-translate-x-full"} fixed left-0 top-0 z-40 mt-[64px] h-screen w-[17rem] border-r border-slate-200 bg-slate-50 pb-20 pt-8 text-left text-slate-600 transition-transform xl:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-3 pb-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={
                  isSecure
                    ? NavigationPaths.homeAppAdmin
                    : NavigationPaths.homeAppPublic
                }
                className={`group flex items-center rounded-2xl p-2 ${
                  pathname.includes("/home")
                    ? "header-menu-item-current-page"
                    : "hover:bg-slate-200 hover:text-blue-700"
                }`}
                onClick={toggleSideBarOpened}
              >
                <House size={28} weight="fill" />
                <span className="ms-3 flex-1 whitespace-nowrap">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href={
                  isSecure
                    ? NavigationPaths.singleBookingSecure
                    : NavigationPaths.singleBookingPublic
                }
                className={`group flex items-center rounded-2xl p-2 ${
                  (pathname === NavigationPaths.singleBookingSecure || pathname === NavigationPaths.singleBookingPublic)
                    ? "header-menu-item-current-page"
                    : "hover:bg-slate-200 hover:text-blue-700"
                }`}
                onClick={toggleSideBarOpened}
                prefetch={false}
              >
                <PersonSimpleBike size={28} weight="fill" />
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Single Booking
                </span>
              </Link>
            </li>
            {isSecure ? (
              <li className="text-slate-400">
                <Link
                  href={NavigationPaths.groupBookingSecure}
                  className={`group flex items-center rounded-2xl p-2 ${
                    pathname === NavigationPaths.groupBookingSecure
                      ? "header-menu-item-current-page"
                      : "hover:bg-slate-200 hover:text-blue-700"
                  }`}
                  onClick={toggleSideBarOpened}
                >
                  <Users size={28} weight="fill" />
                  <span className="ms-3 flex-1 whitespace-nowrap">
                    Group Booking
                  </span>
                </Link>
              </li>
            ) : (
              <li className="text-slate-400">
                <Link
                  href={NavigationPaths.termsOfService}
                  className={`group flex items-center rounded-2xl p-2 ${
                    pathname === NavigationPaths.termsOfService
                      ? "header-menu-item-current-page"
                      : "hover:bg-slate-200 hover:text-blue-700"
                  }`}
                  onClick={toggleSideBarOpened}
                >
                  <Info size={28} weight="fill" />
                  <span className="ms-3 flex-1 whitespace-nowrap">
                    Rules & Terms
                  </span>
                </Link>
              </li>
            )}
            <li className="text-slate-400">
              <Link
                href={NavigationPaths.becomeMember}
                className="group flex items-center rounded-2xl p-2 hover:bg-emerald-700 hover:text-slate-100"
                onClick={toggleSideBarOpened}
              >
                <HandHeart size={28} weight="fill" />
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
                className="mt-6 hidden w-full rounded-2xl border border-blue-300 bg-slate-100 p-4 text-xs xl:inline-block"
                role="alert"
              >
                <div className="mb-3 flex items-center">
                  <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 font-semibold text-orange-800">
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
                <p className="mb-3 text-pretty text-blue-800">
                  If you have any suggestions, feedback, or encounter any
                  difficulties, please feel free to use the form below. 😊
                </p>
                <a
                  className="font-medium text-blue-800 underline hover:text-blue-900"
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
              src="/logo-ipc-bike-blue.png"
              className="min-h-full w-44 p-4 2xl:w-48"
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
