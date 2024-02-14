"use client"

import { createContext, useContext, useState } from "react"

import { AccountProps } from "@/types/AccountType"
import { AuthContextProps } from "@/types/ContextType"

export const initialAccountState = {
  id: null,
  accountName: null,
  isAuthenticated: false,
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accountData, setAccountData] =
    useState<AccountProps>(initialAccountState)

  const useLogin = (accountDataResponse: AccountProps) => {
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
        useLogin,
        useLogout,
        settingIsAuthenticated,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export { AuthContext, AuthProvider, useAuth }
