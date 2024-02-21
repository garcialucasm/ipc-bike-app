import { cookieTokenName } from "@/types/CookieType";
import jwt, { JwtPayload } from "jsonwebtoken"

const jwtSecretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY?.trim()

export interface I_AuthHeader {
    headers: {
        Authorization: string;
        'Content-Type': string
    };
}

export function authHeader(): I_AuthHeader {
    const token = getTokenFromCookies("ipcBikeApp_authToken");
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

export function getTokenFromCookies(name: string) {
    try {
        if (typeof document !== 'undefined') {
            const cookies = document.cookie.split(';');
            const cookieName = `${name}=`;

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.startsWith(cookieName)) {
                    return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
                }
            }
        }
    }
    catch {
        throw new Error("Cookie error: error getting cookies")
    }
};

export async function setCookie(name: string, value: string, days: number = 7) {
    try {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);

        const cookieValue =
            encodeURIComponent(value) +
            (days ? `; expires=${expirationDate.toUTCString()}` : "");

        document.cookie = `${name}=${cookieValue}; path=/; Secure; SameSite=None`;
        return true
    } catch (error) {
        throw new Error("Error setting cookie: " + error)
    }
};

export function getDecodedToken() {
    /* ---------------------- Get the token from the cookie --------------------- */
    const token = getTokenFromCookies("ipcBikeApp_authToken")

    try {
        if (!jwtSecretKey) {
            throw new Error("Authentication error: JWT_SECRET_KEY is not set.")
        }

        if (!token) {
            console.error("Authentication error: Token undefined")
            return false
        }

        /* --------------------- Decode and verify the JWT token -------------------- */
        const decodedToken = jwt.verify(token, jwtSecretKey) as JwtPayload

        return decodedToken
    } catch (error) {
        console.error("Authentication error: ", error)
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
