import jwt, { JwtPayload } from "jsonwebtoken"

import { ApiHeader, apiUrls } from "@/services/api";
import { getTokenFromCookies, setCookie } from "@/app/auth/authUtils";
import { cookieTokenName } from "@/types/CookieType";

const jwtSecretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY?.trim()

export function verifyToken(token: string | null) {
    if (!jwtSecretKey) {
        console.error("Authentication error: JWT_SECRET_KEY is not set.")
        return null
    }
    if (!token) {
        console.error("Authentication error: Token undefined")
        return null
    }
    try {
        // Decode and verify the JWT token
        const decodedToken = jwt.verify(token, jwtSecretKey) as JwtPayload
        return decodedToken
    } catch (error) {
        console.error("Invalid token: " + error);
        return null
    }
}



/* --------------------------- Handle Login action -------------------------- */
export async function login(email: string, password: string) {
    try {
        const response = await ApiHeader.post(apiUrls.loginUrl,
            {
                email: email,
                password: password,
            })
        return { data: response.data, error: null };

    } catch (error: any) {
        console.error('Error authenticating:', error.message);
        return {
            data: null, error: `${error.message}`
        }
    }
}

/* ------------------ Clear the authentication token cookie ----------------- */
export async function logout() {
    try {
        await setCookie(cookieTokenName, "", -1);

        return true
    } catch (error) {
        console.error("Logout error: " + error);
        return false
    }
}

/* ------------------ Check token to return if it is valid ------------------ */
export async function checkAuth() {
    const token = getTokenFromCookies(cookieTokenName)
    if (!token) {
        return false
    }
    const isAuth = verifyToken(token)
    return isAuth
} 