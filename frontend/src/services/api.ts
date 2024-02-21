import axios from "axios";

import { authHeader } from "@/app/auth/authUtils";

const host: string = process.env.IPC_BIKES_HOST ?? 'localhost';
const port: string = process.env.IPC_BIKES_PORT ?? '80';

/* --------------------------------- api.js --------------------------------- */
const apiUrl = `http://${host}:${port}/api/`;

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
