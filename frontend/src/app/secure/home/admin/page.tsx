"use client"

import { NextPage } from "next"

import withAuth from "@/app/auth/withAuth"
import BookingsOverview from "@/components/Booking/ManageBooking/BookingsOverview/BookingsOverview"
import AvailabilityContainer from "@/components/Cards/AvailabilityContainer"

const HomeAdmin: NextPage = () => {
  return (
    <>
      <AvailabilityContainer />
      <BookingsOverview />
    </>
  )
}

export default withAuth(HomeAdmin)
