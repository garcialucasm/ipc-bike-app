"use client"

import { useRouter } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"
import { IconSvgLoader } from "@/components/Others/IconsSvg"
import { NextPage } from "next"
import withAuth from "@/app/auth/withAuth"

const Home: NextPage = () => {
  const router = useRouter()

  /* ----------- // TODO: Redirect according to user type by useAuth ---------- */
  router.replace(NavigationPaths.homeAppAdmin)

  return (
    <>
      <div className="container-page-webapp flex h-full items-center justify-center p-20">
        <IconSvgLoader fillColor="text-blue-800" height="48" />
      </div>
    </>
  )
}

export default withAuth(Home)
