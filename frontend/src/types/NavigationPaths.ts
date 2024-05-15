export enum NavigationPaths {
  login = "/auth/login",
  logout = "/auth/logout",
  firstRegister = "/auth/register",

  /* ------------------------------ Secure pages ------------------------------ */
  register = "/secure/register",
  homeAppAdmin = "/secure/home/admin",
  homeAppStudent = "/secure/home/student",
  homeApp = "/secure/home",
  singleBooking = "/secure/booking/single-booking",
  groupBooking = "/secure/booking/group-booking",
  previousBookings = "/secure/booking/previous",
  profile = "/secure/profile",
  inventory = "/secure/inventory",
  statistics = "/secure/statistics",
  settings = "/secure/settings",
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- Web page -------------------------------- */
  homeWeb = "/web",
  about = "/web/about",
  contact = "/web/contact",
  project = "/web/project",
  becomeMember = "/secure/member",
  termsOfService = "/web/terms-of-service",
  privacyPolicy = "/web/privacy-policy",
  /* -------------------------------------------------------------------------- */
}

export enum NavigationOptions {
  next = "next",
  return = "return",
}
