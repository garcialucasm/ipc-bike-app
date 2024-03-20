export enum NavigationPaths {
  login = "/auth/login",
  logout = "/auth/logout",

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
  rules = "/web/rules",
  becomeMember = "/secure/member",
  termsAndConditions = "/web",
  /* -------------------------------------------------------------------------- */

}

export enum NavigationOptions {
  next = "next",
  return = "return",
}
