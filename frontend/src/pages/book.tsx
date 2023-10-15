import HeaderTemp from "@/components/header/HeaderTemp";
import Link from "next/link";

export default function Book() {
  return (
    <div className="container">
      <HeaderTemp heading="Booking for:" />
      <div className="disable-link">
        <Link href="/home-professor">
          <div className="button">Professor</div>
        </Link>
      </div>
      <div>
        <Link href="/home-student">
          <div className="button">Student</div>
        </Link>
      </div>
    </div>
  );
}
