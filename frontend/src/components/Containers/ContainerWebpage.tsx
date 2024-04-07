function ContainerWebpage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`flex min-h-screen justify-center bg-gray-950 px-4 pb-10 pt-[69px]`}
      >
        <div className={`my-10 flex h-full max-w-6xl`}>{children}</div>
      </div>
    </>
  )
}

export default ContainerWebpage
