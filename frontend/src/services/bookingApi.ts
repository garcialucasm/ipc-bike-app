import { BookingStatus } from "@/types/BookingType";
import { api } from "./api";

//Url to Show all active bookings
const activeBookingsUrl = "/booking/all";

// Sample data
const sampleData = [
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
    bike: "01",
  },
];

// Show all active bookings
const bookingFetchApi = async () => {
  try {
    const response = await fetch(`${api.baseUrl + activeBookingsUrl}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const activeBookings = data.booking || sampleData; //TODO remove sampleData

    return { activeBookings, error: null };
  } catch (error: any) {
    return { activeBookings: null, error: `Error fetching data: ${error.message}` };
  }
};

export default bookingFetchApi;
