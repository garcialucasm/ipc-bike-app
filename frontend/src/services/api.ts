import axios from "axios";

import { authHeader } from "@/app/auth/authUtils";


/* --------------------------------- api.js --------------------------------- */
const apiUrl = 'http://localhost:3000';

export const apiUrls = {
  /* ------------------------------ Auth Service ------------------------------ */
  loginUrl: "/auth/login",

  /* ------------------------------ Account Service ------------------------------ */
  registerAccountUrl: "/auth/secure/register",
  firstRegisterAccountUrl: "/auth/register",

  /* ----------------------------- Booking Service ---------------------------- */
  activeBookingsUrl: "/secure/booking/all",
  allBookingsUrl: "/secure/booking/all?show_inactive=true",
  createSingleBookingUrl: "/secure/booking/create/single",
  cancelBookingUrl: "/secure/booking/cancel/",
  approveBookingUrl: "/secure/booking/approve/",
  returnBookingUrl: "/secure/booking/return/",

  /* ------------------------------ Bike Service ------------------------------ */
  bikeStatusCounterUrl: "/secure/bike/status",
  allBikesAvailableUrl: "/secure/bike/all/available",
}

export const ApiHeader = axios.create({
  baseURL: apiUrl,
  headers: authHeader().headers,
});