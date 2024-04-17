import withAuth from "@/app/auth/withAuth"
import UnderConstruction from "@/components/Others/UnderConstruction"

const ProfilePage = () => {
  const componentName = ProfilePage.name
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <UnderConstruction />
      </>
    )
  }
}

export default ProfilePage
