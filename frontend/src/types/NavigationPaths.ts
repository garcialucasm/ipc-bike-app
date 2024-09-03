export enum NavigationPaths {
  /* ------------------------------ Public pages ------------------------------ */
  home = "/",
  homeAppPublic = "/public/home",
  firstRegister = "/auth/register",
  singleBookingPublic = "/public/booking/single-booking",
  login = "/auth/login",
  logout = "/auth/logout",

  /* ------------------------------ Secure pages ------------------------------ */
  register = "/secure/register",
  homeAppAdmin = "/secure/home/admin",
  homeAppStudent = "/secure/home/student",
  homeAppSecure = "/secure/home",
  singleBookingSecure = "/secure/booking/single-booking",
  groupBookingSecure = "/secure/booking/group-booking",
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
