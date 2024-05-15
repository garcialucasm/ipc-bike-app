import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

import { login } from "@/services/accountApi"
import { z } from "zod"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET

const OAUTH_PWD = process.env.OAUTH_PWD

const handler = NextAuth({
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/login",
    // error: '/auth/error', // Error code passed in query string as ?error=
    //   verifyRequest: '/auth/verify-request', // (used for check email message)
    //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
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
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const res = await login(credentials?.email!, credentials?.password!)
          let user = await res.data.account
          // If no error and we have user data, return it
          if (res.data && user) {
            // If the request is successful, proceed with the desired actions
            cookies().set({
              name: "ipcBikeApp_authToken",
              value: user.token,
              secure: true,
            })
            return user
          }
        } // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, user, account }) {
      if (profile?.email && profile.sub && account?.provider === "google") {
        const res = await login(profile.email, OAUTH_PWD + profile.sub)
        if (res.data.account.token) {
          // If the request is successful, proceed with the desired actions
          cookies().set({
            name: "ipcBikeApp_authToken",
            value: res.data.account.token,
            secure: true,
          })
          return true
        } else {
        }
      } else if (user.id && user.email && account?.provider === "facebook") {
        const res = await login(user.email, OAUTH_PWD + user.id)
        // console.log(res.error.error.message)
        if (res.data.account.token) {
          // If the request is successful, proceed with the desired actions
          cookies().set({
            name: "ipcBikeApp_authToken",
            value: res.data.account.token,
            secure: true,
          })
          return true
        }
      } else if (user.id && user.email && account?.provider === "credentials") {
        return true
      }
      return false
    },
  },
  //secret is necessary for production
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
