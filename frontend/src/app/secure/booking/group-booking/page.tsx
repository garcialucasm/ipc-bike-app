import withAuth from "@/app/auth/withAuth"

const HomeGroupBooking = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <p>Group Booking</p>
      </>
    )
  }
}

export default HomeGroupBooking
