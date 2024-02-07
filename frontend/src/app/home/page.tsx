"use client"

import { useRouter } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"

export default function Home() {
  const router = useRouter()

  // TODO: Redirect according to user type by useAuth
  router.replace(NavigationPaths.homeAppAdmin)

  return <></>
}
