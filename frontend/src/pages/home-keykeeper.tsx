import Head from "@/components/atoms/Head";
import Link from "next/link";
import Login from "./login";
import HeaderTemp from "@/components/organisms/HeaderTemp";
import AvailabilityContainer, {
  AvailabilityConfig,
} from "@/components/organisms/AvailabilityContainer";

let isLoggedIn: boolean = true;

const availabilityShowSelection = AvailabilityConfig.HomeKeyKeeper;

export default function HomeKeyKeeper() {
  return (
    <>
      {isLoggedIn ? (
        <div className="center-content">
          <div className="center-content">
            <Head title="IPC Alumni Bike" />
            <HeaderTemp heading="Home - Key Keeper" />
            <AvailabilityContainer
              availabilitySelection={availabilityShowSelection}
            />
            <Link href="/single-booking">
              <div className="button">Single Booking</div>
            </Link>
            <div className="disable-link">
              <Link href="/group-booking">
                <div className="button-disable">🚧 Group Booking 🚧</div>
              </Link>
            </div>
            <Link href="/manage-bookings">
              <div className="button">Manage Bookings</div>
            </Link>
            <div className="disable-link">
              <Link href="/return-bike">
                <div className="button-disable">🚧 Return Bike 🚧</div>
              </Link>
            </div>
            <Link href="/">
              <div className="button-return">Return</div>
            </Link>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
