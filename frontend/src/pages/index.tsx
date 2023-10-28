import FooterWeb from "@/components/organisms/FooterWeb";
import BodyHomeWeb from "../components/organisms/BodyHomeWeb";
import HeaderWeb from "../components/organisms/HeaderWeb";

export default function Page() {
  return (
    <div className="bg-white">
      <HeaderWeb />
      <BodyHomeWeb />
      <FooterWeb />
    </div>
  );
}
