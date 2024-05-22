import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { z } from "zod"

import { accountMessages } from "./../../../../../../shared/constants/errorMessages"
import { authenticateUser } from "@/services/accountApi"
import { autoSignUp } from "@/app/auth/authUtils"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET

const OAUTH_PWD = process.env.OAUTH_PWD

/* --------------- Function to set authentication token cookie -------------- */
const setAuthTokenCookie = (token: string) => {
  cookies().set({
    name: "ipcBikeApp_authToken",
    value: token,
    secure: true,
  })
}

/* ---------------------- Custom authentication handler --------------------- */
const customAuthHandler = async (credentials: any, req: any) => {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(8) })
    .safeParse(credentials)

  if (parsedCredentials.success) {
    const res = await authenticateUser(credentials.email, credentials.password)
    const user = res?.data?.account

    if (res.data && user?.token) {
      try {
        setAuthTokenCookie(user.token)
        return user
      } catch (error) {
        throw new Error("Error: Setting auth token cookie")
      }
    }
  }
  return null
}

const handler = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error code passed in query string as ?error=
    // signOut: "/auth/login",
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "https://raw.githubusercontent.com/garcialucasm/ipc-bike-app/main/frontend/public/logo-bike-ipc.png",
    buttonText: "", // Hex color code
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID as string,
      clientSecret: FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "E-mail",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: customAuthHandler,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log(user)
      /* -------------------------------------------------------------------------- */
      /* --------------------------- google or facebook --------------------------- */
      /* -------------------------------------------------------------------------- */
      if (
        user &&
        user.email &&
        (account?.provider === "google" || account?.provider === "facebook")
      ) {
        let res = await authenticateUser(user.email, OAUTH_PWD + user?.id)
        if (res.error === accountMessages.EMAIL_NOT_FOUND) {
          try {
            await autoSignUp(user, OAUTH_PWD as string)
            res = await authenticateUser(user.email, OAUTH_PWD + user.id)
          } catch (error) {
            return false
          }
        } else if (res.error === accountMessages.PASSWORD_INCORRECT) {
          throw new Error(accountMessages.TRY_A_DIFFERENT_METHOD)
        }
        if (res?.data?.account?.token) {
          // If the request is successful, proceed with the desired actions
          setAuthTokenCookie(res.data.account.token)
          return true
        } else {
          return false
        }
        /* -------------------------------------------------------------------------- */

        /* -------------------------------------------------------------------------- */
        /* ------------------------------- credentials ------------------------------ */
        /* -------------------------------------------------------------------------- */
      } else if (user.id && user.email && account?.provider === "credentials") {
        return true
        /* -------------------------------------------------------------------------- */
      }
      return false
    },
  },
  //secret is necessary for production
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
