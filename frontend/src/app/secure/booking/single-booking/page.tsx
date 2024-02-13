"use client"

import { NextPage } from "next"

import withAuth from "@/app/auth/withAuth"
import HomeSingleBooking from "@/components/Booking/SingleBooking/HomeSingleBooking"

const SingleBooking: NextPage = () => {
  return <HomeSingleBooking />
}

export default withAuth(SingleBooking)
