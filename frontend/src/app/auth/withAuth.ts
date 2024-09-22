import { AccountTypePermission } from "@/types/AccountType"
import { NavigationPaths } from "@/types/NavigationPaths"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const jwtPublicKey = process.env.NEXT_PUBLIC_JWT_KEY?.trim()

const withAuth = (expectedAccountTypes?: AccountTypePermission[]): boolean => {
  if (!jwtPublicKey) {
    console.error("Authentication warning: JWT_SECRET_KEY is not set.")
    return false
  }

  // Get the token from the cookie
  const cookieStore = cookies()
  const token = cookieStore.get("ipcBikeApp_authToken")
  const tokenValue = token?.value

  if (!tokenValue) {
    redirect(NavigationPaths.login)
  }

  try {
    /* --------------------- Decode and verify the JWT token -------------------- */
    const getDecodedToken = jwt.verify(tokenValue, jwtPublicKey) as JwtPayload
    const currentAccountType = getDecodedToken.accountType
    if (expectedAccountTypes) {
      const hasPermission = expectedAccountTypes.includes(currentAccountType)

      if (hasPermission) {
        return true
      } else
        throw new Error(
          "withAuth ~ Account permission denied ~ hasPermission: false"
        )
    }

    return true
  } catch (error) {
    console.error("Authentication error: ", error)
    /* --------------------- Redirect to login page on error -------------------- */
    redirect(NavigationPaths.login)
  }
}

export default withAuth
