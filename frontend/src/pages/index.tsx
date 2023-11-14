import FooterWeb from "@/components/organisms/FooterWeb";
import BodyHomeWeb from "../components/organisms/BodyHomeWeb";
import HeaderWebPage from "@/components/organisms/HeaderWebpage";

export default function Page() {
  return (
    <div className="bg-white">
      <HeaderWebPage />
      <BodyHomeWeb />
      <FooterWeb />
    </div>
  );
}
