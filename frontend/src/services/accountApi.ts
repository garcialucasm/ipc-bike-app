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

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        const data = response
        return { data: data, error: null };
    } catch (error: any) {
        console.error('Error registering new account booking:', error.message);
        return {
            data: null, error: `${error.message}`
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

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        const data = response
        return { data: data, error: null };
    } catch (error: any) {
        console.error('Error registering new account booking:', error.message);
        return {
            data: null, error: `${error.message}`
        }
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
