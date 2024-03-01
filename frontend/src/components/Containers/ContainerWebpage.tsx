import React from "react"

interface Props {
  children: React.ReactNode
}

function ContainerWebpage({ children }: Props) {
  return (
    <>
      <div
        className={`flex justify-center items-center bg-gray-800 py-10`}
      >
        <div
          className={`flex h-full w-full max-w-6xl`}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default ContainerWebpage
