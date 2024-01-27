import { Booking, BookingStatus } from "@/types/BookingType";
import { ApiHeader } from "./api";
import { cleanUpSpaces } from "@/utils/validators";

const apiUrls = {
  loginUrl: "/auth/login",
  activeBookingsUrl: "/secure/booking/all",
  allBookingsUrl: "/secure/booking/all?show_inactive=true",
  bikeStatusCounterUrl: "/secure/booking/",
  createSingleBookingUrl: "/secure/booking/create/single",
  cancelBookingUrl: "/secure/booking/cancel",
  approveBookingUrl: "/secure/booking/approve/",
  returnBookingUrl: "/secure/booking/return/",
}


// Login
export const login = async (email: string, password: string) => {
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

// Bike Status Counter
export const bikeStatusCounterFetchApi = async () => {
  let bikeCountFree: number = 0;
  let bikeCountBooked: number = 0;
  let bikeCountInUse: number = 0;
  let bikeCountDisabled: number = 0;
  try {
    const response = await ApiHeader.get(apiUrls.bikeStatusCounterUrl);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return {
      bikeCountFree,
      bikeCountBooked,
      bikeCountInUse,
      bikeCountDisabled,
      error: null
    };
  } catch (error: any) {
    console.error('Error getting status counter:', error.message);
    return {
      data: null, error: `${error.message}`
    }
  }
}

//Create Single Booking
export const createSingleBookingFetchApi = async (bookingData: Booking) => {
  try {
    const userName = cleanUpSpaces(bookingData.bookingUserData.firstName) + " " + cleanUpSpaces(bookingData.bookingUserData.lastName)
    const room = bookingData.bookingUserData.roomNumber
    const bikeSize = bookingData.bookingBikeSize

    const response = await ApiHeader.post(apiUrls.createSingleBookingUrl, {
      userName: userName,
      room: room,
      bikeSize: bikeSize,
    }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const data = response.data

    return { booking: data.booking, error: null }; // Assuming the server returns the booking information
  } catch (error: any) {
    console.error('Error creating single booking:', error.message);
    return {
      data: null, error: `${error.message}`
    }
  }
}

// Approve a booking
export const approveBookingFetchApi = async (bookingId: number) => {
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
export const returnBookingFetchApi = async (bookingId: number) => {
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
