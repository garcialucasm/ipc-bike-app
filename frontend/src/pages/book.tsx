import Header from "@/components/header/Header";
import Link from "next/link";

export default function Book() {
  return (
    <div className="container">
      <Header />
      <h1>IPC Alumni - Bike Booking</h1>
      <h2>Booking for:</h2>
      <div className="disable-link">
        <Link href="/home-teacher" >Teacher (waiting)</Link>
      </div>
      <div>
        <Link href="/home-student">Student</Link>
      </div>
    </div>
  );
}
