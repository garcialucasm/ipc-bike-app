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
        <div className="flex flex-col items-center text-center h-screen">
          <div className="card-layout flex flex-col items-center">
            <HeaderTemp heading="Home - Key Keeper" />
            <div className="w-11/12 flex flex-col">
              <div className="flex flex-col items-center">
                <Head title="IPC Alumni Bike" />
                <AvailabilityContainer
                  availabilitySelection={availabilityShowSelection}
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <Link href="/single-booking">
                    <div className="btn-primary">Single Booking</div>
                  </Link>
                </div>
                <div className="w-full disable-link ">
                  <Link href="/group-booking">
                    <div className="btn-disable">🚧 Group Booking 🚧</div>
                  </Link>
                </div>
                <div className="w-full">
                  <Link href="/manage-bookings">
                    <div className="btn-primary">Manage Bookings</div>
                  </Link>
                </div>
                <div className="w-full">
                  <Link href="/">
                    <div className="btn-return">Return</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
