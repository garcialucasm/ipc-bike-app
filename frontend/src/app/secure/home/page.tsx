"use client"

import { NextPage } from "next"

import withAuth from "@/app/auth/withAuth"
import { redirect } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"

const Home: NextPage = () => {
  /* ----------- // TODO: Redirect according to user type by useAuth ---------- */
  redirect(NavigationPaths.homeAppAdmin)
}

export default withAuth(Home)
