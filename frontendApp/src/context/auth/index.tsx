"use client"

import { createContext, useContext, useState } from "react"

import { AccountProps } from "@/types/AccountType"
import { AuthContextProps } from "@/types/ContextType"

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<AccountProps | null>(null)

  const login = (account: AccountProps) => {
    setAccount(account)
    console.log("Login")
    console.log(account)
  }

  const logout = () => {
    setAccount(null)
    console.log("logout")
    console.log(account)
  }
  return (
    <AuthContext.Provider value={{ account, login, logout }}>
      <>{children}</>
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export { AuthContext, AuthProvider, useAuth }
