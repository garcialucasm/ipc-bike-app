import HeaderNavbarWeb from "@/components/Headers/HeaderNavbarWeb"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNavbarWeb />
      <div>{children}</div>
    </>
  )
}
