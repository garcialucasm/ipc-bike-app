import withAuth from "@/app/auth/withAuth"
import UnderConstruction from "@/components/Others/UnderConstruction"

const HomeGroupBooking = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <UnderConstruction />
      </>
    )
  }
}

export default HomeGroupBooking
