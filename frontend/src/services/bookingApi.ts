import { ApiHeader, apiUrls } from "./api";
import { SingleBookingDTO } from "@/types/BookingType";

// TODO: Handle the double requirement in a better way. Maybe by stacking.
// Flag to track whether an action is in progress
let isProcessing = false;

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

/* --------- // TODO: replace allBookingsFetchApi to bookingFetchApi -------- */
// Show all bookings
export async function allBookingsFetchApi(showInactive: boolean = true) {
  try {
    const response = await ApiHeader.get(showInactive ? apiUrls.allBookingsUrl : apiUrls.activeBookingsUrl);
    const allBookings = response.data.bookings;
    return { allBookings, error: null };
  } catch (error: any) {
    console.error(`Error getting ${showInactive ? 'inactive' : 'active'} bookings:`, error.message);
    return { allBookings: null, error: `${error.message}` };
  }
};


//Create Single Booking
export async function createSingleBookingFetchApi(bookingData: SingleBookingDTO) {
  try {
    /* ------------------------ handling double requests ------------------------ */
    if (isProcessing) {
      return { data: null, error: "Processing" };
    }

    isProcessing = true;

    const response = await ApiHeader.post(apiUrls.createSingleBookingUrl, {
      userName: bookingData.userName,
      room: bookingData.room,
      bikeNumbering: bookingData.bikeNumbering,
    }
    );

    return { data: response.data, error: null };
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data.error);
      return { data: null, error: error.response.data.error };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Error request:', error.request);
      return { data: null, error: 'No response received' };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return { data: null, error: error.message };
    }
  } finally {
    isProcessing = false;
  }
}

/* ---------------------------- approve a booking --------------------------- */
export async function approveBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.approveBookingUrl + bookingId);

    return { data: response.data, error: null };
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data.error);
      return { data: null, error: error.response.data.error };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Error request:', error.request);
      return { data: null, error: 'No response received' };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return { data: null, error: error.message };
    }
  }
};

// Cancel a booking
export async function cancelBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.cancelBookingUrl + bookingId);

    return { data: response.data, error: null };
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data.error);
      return { data: null, error: error.response.data.error };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Error request:', error.request);
      return { data: null, error: 'No response received' };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return { data: null, error: error.message };
    }
  }
};

// Return a booking
export async function returnBookingFetchApi(bookingId: number) {
  try {
    const response = await ApiHeader.post(apiUrls.returnBookingUrl + bookingId);

    return { data: response.data, error: null };
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data.error);
      return { data: null, error: error.response.data.error };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Error request:', error.request);
      return { data: null, error: 'No response received' };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return { data: null, error: error.message };
    }
  }
};
