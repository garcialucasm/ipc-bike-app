import withAuth from "@/app/auth/withAuth"
import UnderConstruction from "@/components/Others/UnderConstruction"

const InventoryPage = () => {
  const componentName = InventoryPage.name
  const isAuth = withAuth(componentName)
  if (isAuth) {
    return (
      <>
        <UnderConstruction />
      </>
    )
  }
}

export default InventoryPage
