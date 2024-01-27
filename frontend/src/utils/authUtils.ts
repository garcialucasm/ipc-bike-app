import { getTokenFromCookies } from "./cookieUtils";


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