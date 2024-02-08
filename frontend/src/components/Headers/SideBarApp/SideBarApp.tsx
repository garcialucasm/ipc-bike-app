"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"
import { logout } from "@/app/auth/authUtils"

import PrimaryButton from "../../Buttons/PrimaryButton"
import {
  IconSvgBecomeMember,
  IconSvgGroupBooking,
  IconSvgHome,
  IconSvgSingleBooking,
} from "@/components/Others/IconsSvg"

function SideBarApp() {
  const pathname = usePathname()
  const [closedAlert, setClosedAlert] = useState(false)
  function toggleClosed() {
    setClosedAlert(true)
    console.log(closedAlert.toString())
  }

  return (
    <>
      <aside
        id="cta-button-sidebar"
        className="absolute left-0 mt-28 h-full max-h-[80dvh] w-80 overflow-y-auto rounded-r-2xl bg-gradient-to-bl from-blue-800 via-blue-800 to-blue-600 transition-transform"
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col justify-between px-3 py-4">
          <span className="sr-only">IPC Alumni</span>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={NavigationPaths.homeAppAdmin}
                className={`className="group hover:bg-blue-600" flex items-center rounded-full p-2 text-slate-100 ${
                  pathname.includes("/home") && "header-menu-item-current-page"
                }`}
              >
                <IconSvgHome height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href={NavigationPaths.singleBooking}
                className={`group flex items-center rounded-full p-2 text-slate-100 hover:bg-blue-600 ${
                  pathname === NavigationPaths.singleBooking &&
                  "header-menu-item-current-page"
                }`}
              >
                <IconSvgSingleBooking height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Single Booking
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={NavigationPaths.groupBooking}
                className={`group flex items-center rounded-full p-2 text-slate-100 hover:bg-blue-600  ${
                  pathname === NavigationPaths.groupBooking &&
                  "header-menu-item-current-page"
                }`}
              >
                <IconSvgGroupBooking height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Group Booking
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={NavigationPaths.homeAppAdmin}
                className="group flex items-center rounded-full p-2 text-slate-100 hover:bg-blue-600 "
              >
                <IconSvgBecomeMember height="28" />
                <span className="ms-3 flex-1 whitespace-nowrap">
                  {" "}
                  Become a member
                </span>
              </Link>
            </li>
          </ul>
          <div className=" flex-grow">
            {!closedAlert && (
              <div
                id="dropdown-cta"
                className="mt-6 rounded-2xl bg-blue-50 p-4"
                role="alert"
              >
                <div className="mb-3 flex items-center">
                  <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800">
                    Beta
                  </span>
                  <button
                    type="button"
                    className="-mx-1.5 -my-1.5 ms-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 p-1 text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400"
                    data-dismiss-target="#dropdown-cta"
                    aria-label="Close"
                    onClick={toggleClosed}
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
                <p className="mb-3 text-sm text-blue-800 ">
                  Text about Beta version.
                </p>
                <a
                  className="text-sm font-medium text-blue-800 underline hover:text-blue-900"
                  href="#"
                >
                  Turn new navigation off
                </a>
              </div>
            )}
          </div>
          <div className="i static flex flex-col items-center justify-center">
            <Image
              src="/logo-ipc-alumni-bike-white.png"
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

export default SideBarApp
