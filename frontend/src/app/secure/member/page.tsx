import withAuth from "@/app/auth/withAuth"
import UnderConstruction from "@/components/Others/UnderConstruction"

const Page = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return (
      <>
        <UnderConstruction />
      </>
    )
  }
}

export default Page
