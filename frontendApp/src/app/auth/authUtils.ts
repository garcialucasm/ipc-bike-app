import { getCookies, setCookie } from "../utils/cookieUtils";


export interface I_AuthHeader {
    headers: {
        Authorization: string;
        'Content-Type': string
    };
}

export const authHeader = (): I_AuthHeader => {
    const token = getTokenFromCookies();
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

const cookieNameToken = "ipcBikeApp_authToken";


export function getTokenFromCookies() {
    return getCookies(cookieNameToken)
}

export const logout = async () => {

    try {
        // Clear the authentication token cookie
        await setCookie(cookieNameToken, "", -1);

        return true;
    } catch (error) {
        throw new Error("Logout error: " + error);
    }
};