import LayoutApp from "@/app/layoutApp";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <LayoutApp>{children}</LayoutApp>
    </div>
  );
}
