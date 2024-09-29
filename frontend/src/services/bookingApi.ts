import { ApiHeader, apiUrls } from "./api";
import { SingleBookingDTO } from "@/types/BookingType";

// Flag to track whether an action is in progress
let isProcessing = false;

// Helper function to handle API errors
function handleApiError(error: any) {
  if (error.response) {
    console.error('Error response data:', error.response.data.error);
    return { data: null, error: error.response.data.error };
  } else if (error.request) {
    console.error('Error request:', error.request);
    return { data: null, error: 'No response received' };
  } else {
    console.error('Error:', error.message);
    return { data: null, error: error.message };
  }
}

/* ------------------------- Show all bookings ------------------------- */
export async function allBookingsFetchApi(showInactive: boolean = true) {
  try {
    const response = await ApiHeader.get(showInactive ? apiUrls.allBookingsUrl : apiUrls.activeBookingsUrl);
    const allBookings = response.data.bookings;
    return { allBookings, error: null };
  } catch (error: any) {
    console.error(`Error getting ${showInactive ? 'inactive' : 'active'} bookings:`, error.message);
    return { allBookings: null, error: `${error.message}` };
  }
}

/* ------------------------- Show last booking ------------------------- */
export async function previousBookingsFetchApi(publicBookingToken: string) {
  try {
    const response = await ApiHeader.get(apiUrls.previousBookingUrl, {
      headers: { Authorization: `Bearer ${publicBookingToken}` },
    });
    const allBookings = response.data.bookings;
    return { allBookings, error: null };
  } catch (error: any) {
    return { allBookings: null, error: `${error.message}` };
  }
}

/* -------------------- Create Single Booking -------------------- */
export async function createSingleBookingFetchApi(bookingData: SingleBookingDTO) {
  if (isProcessing) {
    return { data: null, error: "Processing" };
  }

  isProcessing = true;

  try {
    const response = await ApiHeader.post(apiUrls.createSingleBookingUrl, {
      userName: bookingData.userName,
      room: bookingData.room,
      bikeNumbering: bookingData.bikeNumbering,
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  } finally {
    isProcessing = false;
  }
}

/* ------------------------- Approve a booking ------------------------- */
export async function approveBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.approveBookingUrl + bookingId);
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
}

/* -------------------------- Cancel a booking -------------------------- */
export async function cancelBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.cancelBookingUrl + bookingId);
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
}

/* -------------------------- Return a booking -------------------------- */
export async function returnBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.returnBookingUrl + bookingId);
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
}
