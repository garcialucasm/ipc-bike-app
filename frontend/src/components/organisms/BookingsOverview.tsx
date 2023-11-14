import React from "react";
import StatusIndicator from "../atoms/StatusIndicator";
import { BookingStatus } from "@/types/BookingType";
import Button from "../atoms/Button";

// Sample data
const data = [
  {
    id: 1,
    status: BookingStatus.BOOKED,
    user: "John Smith",
    bikeType: "Standard",
    bike: "04",
  },
  {
    id: 2,
    status: BookingStatus.BOOKED,
    user: "Emily Johnson",
    bikeType: "Standard",
    bike: "11",
  },
  {
    id: 3,
    status: BookingStatus.HANDEDOVER,
    user: "Sarah Davis",
    bikeType: "Classic",
    bike: "05",
  },
  {
    id: 4,
    status: BookingStatus.HANDEDOVER,
    user: "Michael Brown",
    bikeType: "Standard",
    bike: "08",
  },
  {
    id: 5,
    status: BookingStatus.HANDEDOVER,
    user: "David Wilson",
    bikeType: "Small",
    bike: "02",
  },
];

function BookingsOverview() {
  return (
    <>
      <div className="w-full my-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="ps-2 md:ps-6 py-3">
                  <span className="relative flex h-2.5 w-2.5 m-2"></span>
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Bike Type
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Bike
                </th>
                <th scope="col" className="px-4 md:px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="px-4 md:px-6 py-4 text-gray-900 whitespace-nowrap bg-white border-b"
                >
                  <th scope="row" className="ps-2 md:ps-6 py-4">
                    <StatusIndicator status={item.status} />
                  </th>
                  <td className="flex items-center px-4 md:px-6 py-4 font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      className=" text-gray-400"
                    >
                      <path
                        fill="currentColor"
                        d="M247.846-260.615q51-36.693 108.231-58.039Q413.308-340 480-340q66.692 0 123.923 21.346 57.231 21.346 108.231 58.039 39.615-41 63.731-96.847Q800-413.308 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 66.692 24.115 122.538 24.116 55.847 63.731 96.847ZM480.023-460q-50.562 0-85.292-34.707Q360-529.415 360-579.977t34.707-85.292Q429.415-700 479.977-700t85.292 34.708Q600-630.585 600-580.023q0 50.562-34.708 85.292Q530.585-460 480.023-460ZM480-120q-75.308 0-141-28.038-65.692-28.039-114.308-76.654Q176.077-273.308 148.038-339 120-404.692 120-480t28.038-141q28.039-65.692 76.654-114.308Q273.308-783.923 339-811.962 404.692-840 480-840t141 28.038q65.692 28.039 114.308 76.654Q783.923-686.692 811.962-621 840-555.308 840-480t-28.038 141q-28.039 65.692-76.654 114.308Q686.692-176.077 621-148.038 555.308-120 480-120Zm0-40q55.308 0 108.846-19.346 53.539-19.346 92.539-52.962-39-31.307-90.231-49.5Q539.923-300 480-300q-59.923 0-111.538 17.808-51.616 17.807-89.847 49.884 39 33.616 92.539 52.962Q424.692-160 480-160Zm0-340q33.692 0 56.846-23.154Q560-546.308 560-580q0-33.692-23.154-56.846Q513.692-660 480-660q-33.692 0-56.846 23.154Q400-613.692 400-580q0 33.692 23.154 56.846Q446.308-500 480-500Zm0-80Zm0 350Z"
                      />
                    </svg>
                    {item.user}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-500">
                    {item.bikeType}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-500">
                    {item.bike}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex w-fit text-gray-400">
                      <Button>
                        <div className="w-fit border rounded-full border-gray-400 mx-0.5 hover:bg-gray-400 hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 -960 960 960"
                            width="20"
                          >
                            <path
                              fill="currentColor"
                              d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z"
                            />
                          </svg>
                        </div>
                      </Button>
                      <Button>
                        <div className="w-fit border rounded-full border-gray-400 mx-0.5 hover:bg-gray-400 hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 -960 960 960"
                            width="20"
                          >
                            <path
                              fill="currentColor"
                              d="M249.231-420.001q-24.749 0-42.374-17.625-17.624-17.625-17.624-42.374 0-24.749 17.624-42.374 17.625-17.625 42.374-17.625 24.75 0 42.374 17.625Q309.23-504.749 309.23-480q0 24.749-17.625 42.374-17.624 17.625-42.374 17.625Zm230.769 0q-24.749 0-42.374-17.625-17.625-17.625-17.625-42.374 0-24.749 17.625-42.374 17.625-17.625 42.374-17.625 24.749 0 42.374 17.625 17.625 17.625 17.625 42.374 0 24.749-17.625 42.374-17.625 17.625-42.374 17.625Zm230.769 0q-24.75 0-42.374-17.625Q650.77-455.251 650.77-480q0-24.749 17.625-42.374 17.624-17.625 42.374-17.625 24.749 0 42.374 17.625 17.624 17.625 17.624 42.374 0 24.749-17.624 42.374-17.625 17.625-42.374 17.625Z"
                            />
                          </svg>
                        </div>
                      </Button>
                      <Button>
                        <div className="w-fit border rounded-full border-gray-400 mx-0.5 hover:bg-gray-400 hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 -960 960 960"
                            width="20"
                          >
                            <path
                              fill="currentColor"
                              d="M382-253.847 168.616-467.231l42.769-42.768L382-339.384l366.615-366.615 42.769 42.768L382-253.847Z"
                            />
                          </svg>
                        </div>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BookingsOverview;
