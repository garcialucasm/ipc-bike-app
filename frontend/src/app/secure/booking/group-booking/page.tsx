import { NextPage } from "next"

import withAuth from "@/app/auth/withAuth"

const HomeGroupBooking: NextPage = () => {
  return (
    <>
      <p>Group Booking</p>
    </>
  )
}

export default withAuth(HomeGroupBooking)
