interface Props {
  children: React.ReactNode
}

function ContainerWebpage({ children }: Props) {
  return (
    <>
      <div
        className={`px-4 flex min-h-screen justify-center bg-gray-800 pb-10 pt-[69px]`}
      >
        <div className={`my-10 flex h-full max-w-6xl`}>{children}</div>
      </div>
    </>
  )
}

export default ContainerWebpage
