import React from "react";
import StatusIndicator from "../atoms/StatusIndicator";
import { BookingStatus } from "@/types/BookingType";

// Sample data
const data = [
  { id: 1, status: BookingStatus.BOOKED, user: "John Smith", bike: "04" },
  {
    id: 2,
    status: BookingStatus.BOOKED,
    user: "Emily Johnson",
    bike: "11",
  },
  { id: 3, status: BookingStatus.HANDEDOVER, user: "Sarah Davis", bike: "05" },
  {
    id: 4,
    status: BookingStatus.RETURNED,
    user: "Michael Brown",
    bike: "08",
  },
  { id: 5, status: BookingStatus.CANCELED, user: "David Wilson", bike: "02" },
];

function BookingsOverview() {
  return (
    <>
      <div className="w-full my-5">
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-white">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Bike</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <StatusIndicator status={item.status} />
                    </td>
                    <td>{item.user}</td>
                    <td>{item.bike}</td>
                    <td>
                      <a href="">...</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingsOverview;
