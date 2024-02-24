import axios from "axios";

import { authHeader } from "@/app/auth/authUtils";

const protocol: string = process.env.NEXT_PUBLIC_IPC_BIKES_PROTOCOL ?? 'http';
const host: string = process.env.NEXT_PUBLIC_IPC_BIKES_HOST ?? 'localhost';
const port: string = process.env.NEXT_PUBLIC_IPC_BIKES_PORT ?? '3000';

/* --------------------------------- api.js --------------------------------- */

let apiUrl = ""

if (port === "80" || port === "443")
  apiUrl = `${protocol}://${host}/api/`;
else 
  apiUrl = `${protocol}://${host}:${port}/api/`

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
