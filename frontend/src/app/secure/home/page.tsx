import { redirect } from "next/navigation"
import { NextPage } from "next"

import { NavigationPaths } from "@/types/NavigationPaths"

const Home: NextPage = () => {
  /* ----------- // TODO: Redirect according to user type by useAuth ---------- */
  redirect(NavigationPaths.homeAppAdmin)
}

export default Home
