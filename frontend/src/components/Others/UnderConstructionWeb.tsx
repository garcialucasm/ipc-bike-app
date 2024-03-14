import { NavigationPaths } from "@/types/NavigationPaths"
import React from "react"

function UnderConstructionWeb() {
  return (
    <div className="flex flex-col gap-y-8 text-left text-white">
      <p className="text-center text-6xl md:text-9xl">🏗️</p>
      <p className="border-b border-slate-400 text-xl font-bold">
        Under Construction
      </p>
      <p className="">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
      <p>
        If you have any suggestions, feedback, or encounter any difficulties,
        please feel free to use the link below. 😊
      </p>
      <a
        className="text-sm font-medium text-blue-500 underline hover:text-blue-300"
        href={NavigationPaths.homeWeb}
        target="_blank"
      >
        Link to Feedback Forms
      </a>
    </div>
  )
}

export default UnderConstructionWeb
