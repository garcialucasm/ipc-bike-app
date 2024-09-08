import axios from "axios";

import { authHeader } from "@/app/auth/authUtils";

const protocol = process.env.NEXT_PUBLIC_IPC_BIKES_PROTOCOL?.trim() ?? 'http';
const host = process.env.NEXT_PUBLIC_IPC_BIKES_HOST?.trim() ?? 'localhost';
const port = process.env.NEXT_PUBLIC_IPC_BIKES_PORT?.trim() ?? '3000';

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
  allAccountsUrl: "/auth/secure/account/all",
  toggleAccountActivationUrl: "/auth/secure/account/activation",

  /* ----------------------------- Booking Service ---------------------------- */
  activeBookingsUrl: "/secure/booking/all",
  allBookingsUrl: "/secure/booking/all?show_inactive=true",
  createSingleBookingUrl: "/booking/create/single",
  cancelBookingUrl: "/secure/booking/cancel/",
  approveBookingUrl: "/secure/booking/approve/",
  returnBookingUrl: "/secure/booking/return/",

  /* ------------------------------ Bike Service ------------------------------ */
  bikeStatusCounterUrl: "/bike/status",
  allBikesUrl: "/bike/all",
  maintenance: "/secure/bike/maintenance/"
}

export const ApiHeader = axios.create({
  baseURL: apiUrl,
  headers: authHeader().headers,
});
