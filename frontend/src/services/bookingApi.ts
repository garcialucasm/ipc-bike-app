import { BookingStatus } from "@/types/BookingType";
import { api } from "./api";

//Url to Show all active bookings
const activeBookingsUrl = "/booking/all";
//Url to Cancel a booking
const cancelBookingUrl = "/booking/all";
//Url to Approve a booking
const approveBookingUrl = "/booking/approve/";
//Url to Return a booking
const returnBookingUrl = "/booking/return/";


// Show all active bookings
export const bookingFetchApi = async () => {
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

// Approve a booking
export const approveBookingFetchApi = async (bookingId: number) => {
  try {
    const response = await fetch(api.baseUrl + approveBookingUrl + bookingId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    console.log(`Status: ${response.status}`)
    console.log(`Booking ID ${bookingId} approved`);
    const approvedBooking = true

    return { approvedBooking, error: null };
  } catch (error: any) {
    return { approvedBooking: null, error: `Error fetching data: ${error.message}` };
  }
};

// Return a booking
export const returnBookingFetchApi = async (bookingId: number) => {
  try {
    const response = await fetch(api.baseUrl + returnBookingUrl + bookingId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    console.log(`Status: ${response.status}`)
    console.log(`Booking ID ${bookingId} returned`);
    const returnedBooking = true

    return { returnedBooking, error: null };
  } catch (error: any) {
    return { returnedBooking: null, error: `Error fetching data: ${error.message}` };
  }
};
