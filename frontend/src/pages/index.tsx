import Header from "@/components/header/Header";
import Link from "next/link";
import Login from "./login";

let isLoggedIn: boolean = true;

export default function Page() {
  return (
    <div className="container">
      {isLoggedIn ? (
        <div>
          <Header />
          <h1>IPC Alumni - Bike Booking</h1>
          <div>
            <Link href="/book">Book</Link>
          </div>
          <div className="disable-link">
            <Link href="/manage-bookings">Manage Bookings (waiting)</Link>
          </div>
          <div className="disable-link">
            <Link href="/Return Bike">Return Bike (waiting)</Link>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
