"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { NavigationPaths } from "@/types/NavigationPaths"
import MainNavbarApp from "./NavbarApp/MainNavbarApp"
import SideBarApp from "./SideBarApp/SideBarApp"
import MenuNavbarApp from "./NavbarApp/MenuNavbarApp"

function HeaderApp() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1280) // Adjust the threshold as needed
    }

    // Initial check
    handleResize()

    // Listen for window resize events
    window.addEventListener("resize", handleResize)
    console.log("test")
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Empty dependency array ensures the effect only runs once after initial render

  // Do not render certain components for specific paths
  const pathname = usePathname()
  if (
    pathname === NavigationPaths.login ||
    pathname === NavigationPaths.logout ||
    pathname === NavigationPaths.homeWeb
  ) {
    return null
  }

  return (
    <>
      {isMobile ? (
        <MainNavbarApp />
      ) : (
        <>
          <div className="z-40 flex w-full flex-col items-center bg-slate-950 bg-gradient-to-tr from-blue-800 via-blue-800 to-blue-600 py-2 text-white">
            <div className="flex w-11/12 flex-col items-start">
              <MenuNavbarApp />
            </div>
          </div>
          <SideBarApp />
        </>
      )}
    </>
  )
}

export default HeaderApp
