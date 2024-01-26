const cookieNameToken = "ipcBikeApp_authToken";

export const setCookie = (name: string, value: string, days: number = 2) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue =
        encodeURIComponent(value) +
        (days ? `; expires=${expirationDate.toUTCString()}` : "");

    document.cookie = `${name}=${cookieValue}; path=/; Secure; SameSite=None`;
};

export function getTokenFromCookies() {
    return getCookies(cookieNameToken)
}

export const getCookies = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    const cookieName = `${name}=`;

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
        }
    }

    return null;
};
