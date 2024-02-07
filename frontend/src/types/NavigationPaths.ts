export enum NavigationPaths {
  login = "/auth/login",
  logout = "/auth/logout",
  homeAppAdmin = "/home/admin",
  homeAppStudent = "/home/student",
  homeApp = "/home",
  // TODO: Redirect to home web page
  homeWeb = "/home",
  // TODO: Redirect to the rules web page
  rules = "/rules",
  singleBooking = "/booking/single-booking",
  groupBooking = "/booking/group-booking",
  profile = "/profile",
  inventory = "/inventory",
  stats = "/stats",
}

export enum NavigationOptions {
  next = "next",
  return = "return",
}
