import React from "react"

interface Props {
  children: React.ReactNode
  isSingleComponent?: boolean
}

function ContainerMain({ children, isSingleComponent }: Props) {
  return (
    <div
      className={`main-app-size flex h-full w-full flex-col items-center rounded-2xl ${isSingleComponent ? "bg-component-color px-8" : "gap-y-8"} `}
    >
      {children}
    </div>
  )
}

export default ContainerMain
