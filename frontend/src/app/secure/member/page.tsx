import withAuth from "@/app/auth/withAuth"
import UnderConstruction from "@/components/Others/UnderConstruction"

const MemberPage = () => {
  const componentName = MemberPage.name
  const isAuth = withAuth(componentName)
  if (isAuth) {
    return (
      <>
        <UnderConstruction />
      </>
    )
  }
}

export default MemberPage
