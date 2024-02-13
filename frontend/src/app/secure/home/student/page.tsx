"use client"

import { NextPage } from "next"

import withAuth from "@/app/auth/withAuth"

const HomeStudent: NextPage = () => {
  return (
    <>
      <p>Home Page Student</p>
    </>
  )
}

export default withAuth(HomeStudent)
