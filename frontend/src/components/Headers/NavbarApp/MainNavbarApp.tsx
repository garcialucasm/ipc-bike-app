"use client"

import Link from "next/link"
import React from "react"
import { usePathname } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"

import {
  IconSvgBecomeMember,
  IconSvgGroupBooking,
  IconSvgHome,
  IconSvgSingleBooking,
} from "@/components/Others/IconsSvg"
import MenuNavbarApp from "./MenuNavbarApp"

const headingTitle = "Alumni Bike"
const headingSubTitle = "Book, Ride, Explore: All for Free"

function MainNavbarApp() {
  const pathname = usePathname()

  return (
    <div className="flex w-full flex-col items-center bg-gradient-to-tr from-blue-800 via-blue-800 to-blue-600 py-2 text-white">
      <div className="flex w-11/12 flex-col items-start">
        <MenuNavbarApp />
        <div className="flex w-full overflow-x-auto text-left text-xxs md:text-xs">
          <Link
            href={NavigationPaths.homeAppAdmin}
            className={`header-menu-items ms-0 flex items-center ${
              pathname.includes("/home") && "header-menu-item-current-page"
            }`}
          >
            <IconSvgHome height="28" />
            <span className="pl-1 pr-2">Home</span>
          </Link>
          <Link
            href={NavigationPaths.singleBooking}
            className={`header-menu-items flex items-center ${
              pathname === NavigationPaths.singleBooking &&
              "header-menu-item-current-page"
            }`}
          >
            <IconSvgSingleBooking height="28" />
            <span className="pl-1 pr-2">
              Single
              <br />
              Booking
            </span>
          </Link>
          <Link
            href={NavigationPaths.groupBooking}
            className={`header-menu-items flex items-center ${
              pathname === NavigationPaths.groupBooking &&
              "header-menu-item-current-page"
            }`}
          >
            <IconSvgGroupBooking height="28" />
            <span className="pl-1 pr-2">
              Group
              <br />
              Booking
            </span>
          </Link>
          <Link
            href={NavigationPaths.homeAppAdmin}
            className="header-menu-items flex items-center"
          >
            <IconSvgBecomeMember height="28" />
            <span className="pl-1 pr-2">
              Become
              <br />a member
            </span>
          </Link>
        </div>
        <div className="pt-8 text-left text-xl font-black tracking-tight">
          {headingTitle}
        </div>
        <div className="pb-3 text-left text-sm tracking-wider">
          {headingSubTitle}
        </div>
      </div>
    </div>
  )
}

export default MainNavbarApp
