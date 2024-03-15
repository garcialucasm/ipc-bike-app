import HeaderNavbarWeb from "@/components/Headers/HeaderNavbarWeb"
import { AppProvider } from "@/context/page"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <HeaderNavbarWeb />
      <div>{children}</div>
    </AppProvider>
  )
}
