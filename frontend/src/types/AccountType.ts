export type AccountProps = {
    id: number | null;
    accountName: string | null;
    isAuthenticated: boolean | null;
}

export type AccountDTO = {
    accountName: string;
    email: string;
    password: string;
    passwordConfirmation?: string;
}