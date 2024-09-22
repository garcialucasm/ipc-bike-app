import ContainerMain from "@/components/Containers/ContainerMain"
import FooterApp from "@/components/Footers/FooterApp"
import BottomNavbar from "@/components/Headers/BottomNavbar"
import HeaderNavbarApp from "@/components/Headers/HeaderNavbarApp"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNavbarApp />
      <div className="my-[64px] flex flex-grow flex-col items-center gap-y-8 px-4 py-4 text-center sm:py-8">
        <ContainerMain>{children}</ContainerMain>
      </div>
      <BottomNavbar />
      <FooterApp />
      {/* <DevShowContext /> */}
    </>
  )
}
