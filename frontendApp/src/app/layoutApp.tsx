import HeaderApp from "@/components/Headers/HeaderApp";

export default function LayoutApp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {" "}
      <HeaderApp />
      {children}
    </div>
  );
}
