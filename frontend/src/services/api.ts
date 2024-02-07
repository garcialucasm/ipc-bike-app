import axios from "axios";

import { authHeader } from "@/app/auth/authUtils";


// api.js
const apiUrl = 'http://localhost:3000';

export const apiUrls = {
  // Auth Service
  loginUrl: "/auth/login",

  // Booking Service
  activeBookingsUrl: "/secure/booking/all",
  allBookingsUrl: "/secure/booking/all?show_inactive=true",
  createSingleBookingUrl: "/secure/booking/create/single",
  cancelBookingUrl: "/secure/booking/cancel",
  approveBookingUrl: "/secure/booking/approve/",
  returnBookingUrl: "/secure/booking/return/",

  // Bike Service
  bikeStatusCounterUrl: "/secure/bike/status",
}


// // Variable to use inside the dynamically import to avoid 'authHeader' to be accessed before it's initialized
// let headers = {};

// // Dynamically import to avoid 'authHeader' to be accessed before it's initialized
// import("@/app/auth/authUtils").then(({ authHeader }) => {
//   headers = authHeader().headers;
// });

export const ApiHeader = axios.create({
  baseURL: apiUrl,
  headers: authHeader().headers,
});