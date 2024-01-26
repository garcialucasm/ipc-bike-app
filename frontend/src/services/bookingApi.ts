import { Booking, BookingStatus } from "@/types/BookingType";
import { ApiHeader, api } from "./api";
import { number } from "prop-types";
import { authHeader } from '@/utils/authUtils';

//Url to Show all active bookings
const loginUrl = "/auth/login";
//Url to Show all active bookings
const activeBookingsUrl = "/secure/booking/all";
//Url to Show all bookings
const allBookingsUrl = "/secure/booking/all?show_inactive=true";
//Url to Show number of bikes in each status 
const bikeStatusCounterUrl = "/secure/booking/";
//Url to Create Single booking
const createSingleBookingUrl = "/secure/booking/create/single";
//Url to Cancel a booking
const cancelBookingUrl = "/secure/booking/cancel";
//Url to Approve a booking
const approveBookingUrl = "/secure/booking/approve/";
//Url to Return a booking
const returnBookingUrl = "/secure/booking/return/";


// Login
export const login = async (email: string, password: string) => {
  try {
    const response = await ApiHeader.post(api.baseUrl + loginUrl,
      {
        email: email,
        password: password,
      }, authHeader())
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
    const response = await ApiHeader.get(api.baseUrl + activeBookingsUrl, authHeader());
    const activeBookings = response.data.bookings;

    return { activeBookings, error: null };
  } catch (error: any) {
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
    const response = await ApiHeader.get(api.baseUrl + bikeStatusCounterUrl, authHeader());

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
    return {
      bikeCountFree: number,
      bikeCountBooked: number,
      bikeCountInUse: number,
      bikeCountDisabled: number,
      error: `${error.message}`
    };
  }
}

//Create Single Booking
export const createSingleBookingFetchApi = async (bookingData: Booking) => {
  try {
    const response = await ApiHeader.post(api.baseUrl + createSingleBookingUrl, {
      userName: bookingData.bookingUserData.firstName + " " + bookingData.bookingUserData.lastName,
      room: bookingData.bookingUserData.roomNumber,
      bikeSize: bookingData.bookingBikeSize,
    }, authHeader()
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
    const response = await ApiHeader.post(api.baseUrl + approveBookingUrl + bookingId, authHeader());

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const approvedBooking = true

    return { approvedBooking, error: null };
  } catch (error: any) {
    return { approvedBooking: null, error: `${error.message}` };
  }
};

// Return a booking
export const returnBookingFetchApi = async (bookingId: number) => {
  try {
    const response = await ApiHeader.post(api.baseUrl + returnBookingUrl + bookingId, authHeader());

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const returnedBooking = true

    return { returnedBooking, error: null };
  } catch (error: any) {
    return { returnedBooking: null, error: `${error.message}` };
  }
};
