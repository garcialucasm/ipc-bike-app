import { SingleBookingProps } from "@/types/BookingType";
import { ApiHeader } from "./api";
import { cleanUpSpaces } from "@/app/utils/validators";

const apiUrls = {
  loginUrl: "/auth/login",
  activeBookingsUrl: "/secure/booking/all",
  allBookingsUrl: "/secure/booking/all?show_inactive=true",
  createSingleBookingUrl: "/secure/booking/create/single",
  cancelBookingUrl: "/secure/booking/cancel",
  approveBookingUrl: "/secure/booking/approve/",
  returnBookingUrl: "/secure/booking/return/",
}

// TODO: Handle the double requirement in a better way. Maybe by stacking.
// Flag to track whether an action is in progress
let isProcessing = false;

// Login
export async function login(email: string, password: string) {
  try {
    const response = await ApiHeader.post(apiUrls.loginUrl,
      {
        email: email,
        password: password,
      })
    return { data: response.data, error: null };

  } catch (error: any) {
    console.error('Error authenticating:', error.message);
    return {
      data: null, error: `${error.message}`
    }
  }
}

// Show all active bookings
export async function bookingFetchApi() {
  try {
    const response = await ApiHeader.get(apiUrls.activeBookingsUrl);
    const activeBookings = response.data.bookings;

    return { activeBookings, error: null };
  } catch (error: any) {
    console.error('Error getting active bookings:', error.message);
    return { activeBookings: null, error: `${error.message}` };
  }
};


//Create Single Booking
export async function createSingleBookingFetchApi(bookingData: SingleBookingProps) {
  try {
    if (isProcessing) {
      return { data: null, error: "Processing " };
    }

    isProcessing = true;

    const userName = cleanUpSpaces(bookingData.userData.firstName) + " " + cleanUpSpaces(bookingData.userData.lastName)
    const room = bookingData.userData.roomNumber
    const bikeSize = bookingData.bikeSize

    const response = await ApiHeader.post(apiUrls.createSingleBookingUrl, {
      userName: userName,
      room: room,
      bikeSize: bikeSize,
    }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const data = response
    return { data: data, error: null };
  } catch (error: any) {
    console.error('Error creating single booking:', error.message);
    return {
      data: null, error: `${error.message}`
    }
  } finally {
    isProcessing = false;
  }
}

// Approve a booking
export async function approveBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.approveBookingUrl + bookingId);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const approvedBooking = true

    return { approvedBooking, error: null };
  } catch (error: any) {
    console.error('Error approving a booking:', error.message);
    return { approvedBooking: null, error: `${error.message}` };
  }
};

// Return a booking
export async function returnBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.returnBookingUrl + bookingId);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const returnedBooking = true

    return { returnedBooking, error: null };
  } catch (error: any) {
    console.error('Error approving a return:', error.message);
    return { returnedBooking: null, error: `${error.message}` };
  }
};
