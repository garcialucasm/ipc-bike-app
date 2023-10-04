import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>IPC Alumni - Bike Booking</h1>
      <div>
        <Link href="/book">Book</Link>
      </div>
      <div>
        <Link href="/manage-bookings">Manage Bookings</Link>
      </div>
      <Link href="/Return Bike">Return Bike</Link>
    </div>
  );
}
