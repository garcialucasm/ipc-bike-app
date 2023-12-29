import { BookingStatus } from "@/types/BookingType";
import { api } from "./api";

//Url to Show all active bookings
const activeBookingsUrl = "/booking/all";


// Show all active bookings
const bookingFetchApi = async () => {
  try {
    const response = await fetch(`${api.baseUrl + activeBookingsUrl}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    console.log(`Status: ${response.status}`)

    const data = await response.json();
    const activeBookings = data.bookings;

    // Loop through each booking and log relevant information
    activeBookings.forEach((booking: any) => {
      console.log(`- ID: ${booking.ID}`);
      console.log(`- User Name: ${booking.User.Name}`);
      console.log(`- Bike: ${booking.Bike[0].Numbering}`);
      console.log(`- Type: ${booking.User.Type}`);
      console.log(`- Status: ${booking.User.Status}`);
      // Add more details as needed
    });

    return { activeBookings, error: null };
  } catch (error: any) {
    return { activeBookings: null, error: `Error fetching data: ${error.message}` };
  }
};

export default bookingFetchApi;
