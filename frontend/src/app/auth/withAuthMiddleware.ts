
import { getTokenFromCookies } from "./authUtils"
import { verifyToken } from "@/services/authService"

export default function withAuthMiddleware() {
  /* ---------------------- Get the token from the cookie --------------------- */
  const token = getTokenFromCookies("ipcBikeApp_authToken");
  console.log(token)
  if (!token) {
    console.error("Authentication error: Token undefined")
    return false
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    console.error("Authentication error: Invalid token")
    return false
  }

  /* ------- Check if the token is valid and if the context is not empty ------ */
  if (decodedToken) {
    return true
  }
  else { return false }
}
