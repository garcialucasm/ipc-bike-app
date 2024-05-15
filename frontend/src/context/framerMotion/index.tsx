"use client"

import { motion } from "framer-motion"
import { createContext, useContext } from "react"

interface FramerMotionContextType {
  motion: typeof motion
}

const FramerMotionContext = createContext<FramerMotionContextType | undefined>(
  undefined
)

export const useFramerMotion = () => {
  const context = useContext(FramerMotionContext)
  if (!context) {
    throw new Error(
      "useFramerMotion must be used within a FramerMotionProvider"
    )
  }
  return context
}

export const FramerMotionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <FramerMotionContext.Provider value={{ motion }}>
      {children}
    </FramerMotionContext.Provider>
  )
}
