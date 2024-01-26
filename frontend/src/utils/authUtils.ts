import { getTokenFromCookies } from "./cookieUtils";


export interface I_AuthHeader {
    headers: {
        Authorization: string;
    };
}

export const authHeader = (): I_AuthHeader => {
    const token = getTokenFromCookies();
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
};