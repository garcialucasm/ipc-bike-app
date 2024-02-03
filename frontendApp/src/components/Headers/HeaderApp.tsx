"use client"

import React from "react"
import { usePathname } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"

import MainNavbarApp from "./NavbarApp/MainNavbarApp"

function HeaderApp() {
  const pathname = usePathname()
  if (
    pathname == NavigationPaths.login ||
    pathname == NavigationPaths.logout ||
    pathname == NavigationPaths.homeWeb
  ) {
    return <></>
  }

  return (
    <>
      <MainNavbarApp />
    </>
  )
}

export default HeaderApp
