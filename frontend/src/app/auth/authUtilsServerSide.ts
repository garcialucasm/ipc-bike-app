import { cookies } from "next/headers";

export function getTokenFromCookiesSS(name: string) {
    try {
        // Access cookies using cookies() function
        const token = cookies().get(name);
        return token;
    } catch (error) {
        console.error("Error getting token from cookies:", error);
        return null;
    }
}