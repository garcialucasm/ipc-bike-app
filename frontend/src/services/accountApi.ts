import { ApiHeader, apiUrls } from "@/services/api";
import { AccountDTO } from "@/types/AccountType";


/* -------------------------- Register new account -------------------------- */
export async function registerAccountFetchApi(accountData: AccountDTO) {
    try {
        const response = await ApiHeader.post(apiUrls.registerAccountUrl, {
            accountName: accountData.accountName,
            email: accountData.email,
            password: accountData.password,
        }
        );

        return { data: response.data, error: null };
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data.error);
            return { data: null, error: error.response.data.error };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error('Error request:', error.request);
            return { data: null, error: 'No response received' };
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            return { data: null, error: error.message };
        }
    }
}

/* -------------------------- First Register new account -------------------------- */
export async function registerFirstAccountFetchApi(accountData: AccountDTO) {
    try {
        const response = await ApiHeader.post(apiUrls.firstRegisterAccountUrl, {
            accountName: accountData.accountName,
            email: accountData.email,
            password: accountData.password,
        }
        );

        return { data: response.data, error: null };
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data.error);
            return { data: null, error: error.response.data.error };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error('Error request:', error.request);
            return { data: null, error: 'No response received' };
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            return { data: null, error: error.message };
        }
    }
}

/* --------------------------- Handle Login action -------------------------- */
export async function authenticateUser(email: string, password: string) {
    try {
        const response = await ApiHeader.post(apiUrls.loginUrl, {
            email: email,
            password: password,
        });

        return { data: response.data, error: null };
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.status);
            return { data: null, error: error.response.data.error };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error('Error request:', error.request);
            return { data: null, error: 'No response received' };
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            return { data: null, error: error.message };
        }
    }
}