import { NavigationPaths } from "@/types/NavigationPaths"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

export default function App() {
  redirect(NavigationPaths.homeApp)
  return (
    <>
      <main className="flex h-screen items-center justify-center text-center align-middle">
        <Link
          href={NavigationPaths.homeApp}
          className="m-10 flex h-80 w-80 items-center justify-center rounded-2xl bg-blue-900 text-4xl text-white"
        >
          App
        </Link>
        <div className="disabled: m-10 flex h-80 w-80 flex-col items-center justify-center rounded-2xl bg-blue-900 text-4xl text-slate-300 ">
          <div>🚧 Web 🚧</div>
          <div className="text-xs italic">under construction</div>
        </div>
      </main>
    </>
  )
}
