import Head from "@/components/header/Head";
import Link from "next/link";
import Login from "./login";
import Navbar from "@/components/header/Navbar";
import HeaderTemp from "@/components/header/HeaderTemp";

let isLoggedIn: boolean = true;

export default function Page() {
  return (
    <>
      {isLoggedIn ? (
        <div className="container center-content">
          <div className="center-content">
            <Head title="IPC Alumni Bike" />
            <Navbar />
            <HeaderTemp heading="Booking" />

            <Link href="/book">
              <div className="button">Book</div>
            </Link>
            <div className="disable-link">
              <Link href="/manage-bookings">
                <div className="button">Manage Bookings (waiting)</div>
              </Link>
            </div>
            <div className="disable-link">
              <Link href="/return-bike">
                <div className="button">Return Bike (waiting)</div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
