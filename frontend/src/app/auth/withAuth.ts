import { NavigationPaths } from "@/types/NavigationPaths";
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

const jwtSecretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY?.trim()

const withAuth = (): boolean => {

    if (!jwtSecretKey) {
        console.error("Authentication warning: JWT_SECRET_KEY is not set.");
        return false
    }

    // Get the token from the cookie
    const cookieStore = cookies()
    const token = cookieStore.get('ipcBikeApp_authToken')
    const tokenValue = token?.value

    if (!tokenValue) {
        redirect(NavigationPaths.login);
    }

    try {
        /* --------------------- Decode and verify the JWT token -------------------- */
        jwt.verify(tokenValue, jwtSecretKey) as JwtPayload;

        return true;
    } catch (error) {
        console.error("Authentication error: ", error)
        /* --------------------- Redirect to login page on error -------------------- */
        redirect(NavigationPaths.login)
    }
}

export default withAuth