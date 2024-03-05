import withAuth from "@/app/auth/withAuth"
import UnderConstruction from "@/components/Others/UnderConstruction"

const HomeGroupBookingPage = () => {
  const componentName = HomeGroupBookingPage.name
  const isAuth = withAuth(componentName)
  if (isAuth) {
    return (
      <>
        <UnderConstruction />
      </>
    )
  }
}

export default HomeGroupBookingPage
