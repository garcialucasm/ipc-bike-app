import FooterApp from "@/components/Footers/FooterApp"
import HeaderNavbarApp from "@/components/Headers/HeaderNavbarApp"
import { AppProvider } from "@/context/page"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <HeaderNavbarApp />
      <div className="container-main-webapp">{children}</div>
      <FooterApp />
      {/* <DevShowContext /> */}
    </AppProvider>
  )
}
