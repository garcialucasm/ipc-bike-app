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
    status: BookingStatus.HANDEDOVER,
    user: "Michael Brown",
    bike: "08",
  },
  { id: 5, status: BookingStatus.HANDEDOVER, user: "David Wilson", bike: "02" },
];

function BookingsOverview() {
  return (
    <>
      <div className="w-full my-5">
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 bg-white">
                <tr>
                  <th>Status</th>
                  <th>User</th>
                  <th>Bike</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-200">
                    <td>
                      <StatusIndicator status={item.status} />
                    </td>
                    <td>{item.user}</td>
                    <td>{item.bike}</td>
                    <td>
                      <a href="">
                        <div className="border rounded-full w-fit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                          >
                            <path d="M249.231-420.001q-24.749 0-42.374-17.625-17.624-17.625-17.624-42.374 0-24.749 17.624-42.374 17.625-17.625 42.374-17.625 24.75 0 42.374 17.625Q309.23-504.749 309.23-480q0 24.749-17.625 42.374-17.624 17.625-42.374 17.625Zm230.769 0q-24.749 0-42.374-17.625-17.625-17.625-17.625-42.374 0-24.749 17.625-42.374 17.625-17.625 42.374-17.625 24.749 0 42.374 17.625 17.625 17.625 17.625 42.374 0 24.749-17.625 42.374-17.625 17.625-42.374 17.625Zm230.769 0q-24.75 0-42.374-17.625Q650.77-455.251 650.77-480q0-24.749 17.625-42.374 17.624-17.625 42.374-17.625 24.749 0 42.374 17.625 17.624 17.625 17.624 42.374 0 24.749-17.624 42.374-17.625 17.625-42.374 17.625Z" />
                          </svg>
                        </div>
                      </a>
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
