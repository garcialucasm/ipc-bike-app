import { ApiHeader, apiUrls } from "@/services/api";
import { AccountRegisterType } from "@/types/AccountType";

/* ---------------------- Reusable Error Handling Function ---------------------- */
function handleApiError(error: any) {
  if (error.response) {
    console.error("Error response data:", error.response.data.error);
    return { data: null, error: error.response.data.error };
  } else if (error.request) {
    console.error("Error request:", error.request);
    return { data: null, error: "No response received" };
  } else {
    console.error("Error:", error.message);
    return { data: null, error: error.message };
  }
}

/* -------------------------- Register new account -------------------------- */
export async function registerAccountFetchApi(accountData: AccountRegisterType) {
  try {
    const response = await ApiHeader.post(apiUrls.registerAccountUrl, {
      accountName: accountData.accountName,
      email: accountData.email,
      password: accountData.password,
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
}

/* ----------------------- Toggle Account Activation ----------------------- */
export async function toggleAccountActivationFetchApi(email: string) {
  try {
    const response = await ApiHeader.post(apiUrls.toggleAccountActivationUrl, {
      email: email,
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    return handleApiError(error);
  }
}

/* --------------------------- Get All Accounts -------------------------- */
export async function getAllAccountsFetchApi() {
  try {
    const response = await ApiHeader.get(apiUrls.allAccountsUrl);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Error getting status counter:", error.message);
    return { data: null, error: error.message };
  }
}

/* -------------------------- First Register new account -------------------------- */
export async function registerFirstAccountFetchApi(accountData: AccountRegisterType) {
  try {
    const response = await ApiHeader.post(apiUrls.firstRegisterAccountUrl, {
      accountName: accountData.accountName,
      email: accountData.email,
      password: accountData.password,
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    return handleApiError(error);
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
    return handleApiError(error);
  }
}
