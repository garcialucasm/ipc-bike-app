import withAuth from "@/app/auth/withAuth"
import UnderConstruction from "@/components/Others/UnderConstruction"

const StatisticsPage = () => {
  const componentName = StatisticsPage.name
  const isAuth = withAuth(componentName)
  if (isAuth) {
    return (
      <>
        <UnderConstruction />
      </>
    )
  }
}

export default StatisticsPage
