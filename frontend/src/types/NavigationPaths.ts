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
  profile = "/secure/profile",
  inventory = "/secure/inventory",
  statistics = "/secure/statistics",
  settings = "/secure/settings",
  /* -------------------------------------------------------------------------- */


  /* ------------------- // TODO: Redirect to home web page ------------------- */
  homeWeb = "/web",
  /* ----------------- // TODO: Redirect to the rules web page ---------------- */
  rules = "/web/rules",
  /* ----------------- // TODO: Redirect to the become member web page ---------------- */
  becomeMember = "/web/become-member",
}

export enum NavigationOptions {
  next = "next",
  return = "return",
}
