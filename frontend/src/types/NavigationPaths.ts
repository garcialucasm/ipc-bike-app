export enum NavigationPaths {
  login = "/auth/login",
  logout = "/auth/logout",
  homeAppAdmin = "/secure/home/admin",
  homeAppStudent = "/secure/home/student",
  homeApp = "/secure/home",
  /* ------------------- // TODO: Redirect to home web page ------------------- */
  homeWeb = "/website",
  /* ----------------- // TODO: Redirect to the rules web page ---------------- */
  rules = "/rules",
  singleBooking = "/secure/booking/single-booking",
  groupBooking = "/secure/booking/group-booking",
  profile = "/profile",
  inventory = "/inventory",
  stats = "/stats",
}

export enum NavigationOptions {
  next = "next",
  return = "return",
}
