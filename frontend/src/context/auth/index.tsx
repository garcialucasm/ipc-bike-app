"use client"

import { createContext, useContext, useState } from "react"
import { SessionProvider } from "next-auth/react"

import { AccountProps } from "@/types/AccountType"
import { AuthContextProps } from "@/types/ContextType"

export const initialAccountState = {
  id: null,
  accountName: "",
  isAuthenticated: false,
  accountType: "",
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accountData, setAccountData] =
    useState<AccountProps>(initialAccountState)

  const settingAccountData = (accountDataResponse: AccountProps) => {
    setAccountData(accountDataResponse)
  }

  const useLogout = () => {
    setAccountData(initialAccountState)
  }

  const settingIsAuthenticated = (isAuth: boolean | null) => {
    setAccountData((prevValues) => ({
      ...prevValues,
      isAuthenticated: isAuth,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        accountData: accountData,
        settingAccountData,
        useLogout,
        settingIsAuthenticated,
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export { AuthContext, AuthProvider, useAuth }
