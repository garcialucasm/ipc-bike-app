import Head from "@/containers/Head";
import Link from "next/link";
import Login from "./login";
import HeaderTemp from "@/containers/HeaderTemp";
import AvailabilityContainer from "@/containers/AvailabilityContainer";

let isLoggedIn: boolean = true;

export default function Page() {
  return (
    <>
      {isLoggedIn ? (
        <div className="container center-content">
          <div className="center-content">
            <Head title="IPC Alumni Bike" />
            <HeaderTemp heading="IPC Alumni Bike " />
            <AvailabilityContainer />
            <Link href="/single-booking">
              <div className="button">Single Booking</div>
            </Link>
            <div className="disable-link">
              <Link href="/group-booking">
                <div className="button-disable">🚧 Group Booking 🚧</div>
              </Link>
            </div>
            <div>
              <Link href="/home-keykeeper">
                <div className="button">Key Keeper - Manage Bookings</div>
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
