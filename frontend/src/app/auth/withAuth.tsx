"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextPage } from "next"

import { getTokenFromCookies } from "./authUtils"
import { initialAccountState, useAuth } from "@/context/auth"
import { AccountProps } from "@/types/AccountType"
import { NavigationPaths } from "@/types/NavigationPaths"

const jwtSecretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY?.trim()

const withAuth = (WrappedComponent: NextPage) => {
  const SecureComponent: NextPage = (props) => {
    const router = useRouter()
    const { accountData, login } = useAuth()
    const [accountState, setAccountState] =
      useState<AccountProps>(initialAccountState)

    // Check authentication
    useEffect(() => {
      const isAuth = () => {
        // Get the token from the cookie
        const token = getTokenFromCookies("ipcBikeApp_authToken")

        if (!token) {
          console.error("Authentication error: Token undefined")
          return false
        }

        try {
          if (!jwtSecretKey) {
            throw new Error("Authentication error: JWT_SECRET_KEY is not set.")
          }

          // Decode and verify the JWT token
          const decodedToken = jwt.verify(token, jwtSecretKey) as JwtPayload

          // Check if the token is valid, and optionally, check additional claims or conditions
          if (decodedToken) {
            const accountId = decodedToken.id
            const accountName = decodedToken.name
            // TODO: Change backend to name instead of email
            login({ id: accountId, name: accountName, isAuthenticated: true })
            return true
          } else {
            throw new Error("Authentication error: Invalid token.")
          }
        } catch (error) {
          // Handle token verification errors (e.g., token expired, invalid signature, etc.)
          console.error("Authentication error: ", error)
          return false
        }
      }

      if (!isAuth()) {
        // Redirect to the login page if the user is not authenticated
        router.push(NavigationPaths.login)
      }
    }, [router])

    return <WrappedComponent {...props} />
  }

  return SecureComponent
}

export default withAuth
