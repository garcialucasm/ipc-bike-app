import { redirect } from "next/navigation"

import { NavigationPaths } from "@/types/NavigationPaths"
import withAuth from "@/app/auth/withAuth"

const Home = () => {
  const isAuth = withAuth()
  if (isAuth) {
    /* ----------- // TODO: Redirect according to user type by useAuth ---------- */
    redirect(NavigationPaths.homeAppAdmin)
  }
}

export default Home
