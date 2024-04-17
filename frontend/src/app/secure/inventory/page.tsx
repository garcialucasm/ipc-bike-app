import withAuth from "@/app/auth/withAuth"
import Inventory from "@/components/Inventory/Inventory"

const InventoryPage = () => {
  const componentName = InventoryPage.name
  const isAuth = withAuth()
  if (isAuth) {
    return <Inventory />
  }
}

export default InventoryPage
