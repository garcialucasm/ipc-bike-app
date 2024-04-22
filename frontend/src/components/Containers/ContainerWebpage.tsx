import FooterWeb from "../Footers/FooterWeb"

function ContainerWebpage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={`flex flex-col min-h-screen justify-center items-center bg-gray-950 px-4 pb-10 pt-[69px] text-white`}
      >
        <div className={`my-10 flex h-full max-w-6xl`}>{children}</div>
        <FooterWeb />
      </div>
    </>
  )
}

export default ContainerWebpage
