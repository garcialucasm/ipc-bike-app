import React from "react"

interface Props {
  children: React.ReactNode
}

function ContainerWebpage({ children }: Props) {
  return (
    <>
      <div className={`flex items-center justify-center bg-gray-800 py-10`}>
        <div className={`flex h-full max-w-6xl`}>{children}</div>
      </div>
    </>
  )
}

export default ContainerWebpage
