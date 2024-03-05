import { redirect } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"
import withAuth from "@/app/auth/withAuth"

const HomePage = () => {
  const componentName = HomePage.name
  const isAuth = withAuth(componentName)
  if (isAuth) {
    /* ----------- // TODO: Redirect according to user type by useAuth ---------- */
    redirect(NavigationPaths.homeAppAdmin)
  }
}

export default HomePage
