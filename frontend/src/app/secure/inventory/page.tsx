import withAuth from "@/app/auth/withAuth"
import Inventory from "@/components/Inventory/Inventory"

const Page = () => {
  const isAuth = withAuth()
  if (isAuth) {
    return <Inventory />
  }
}

export default Page
