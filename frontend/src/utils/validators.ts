import { ErrorMessageLogin } from "@/pages/login";

export function cleanUpSpaces(s: string): string {
    // Remove double or more spaces
    const noDoubleSpaces = s.replace(/\s{2,}/g, ' ');

    // Remove spaces at the end
    const trimmed = noDoubleSpaces.trim();

    return trimmed;
}

export function validateName(s: string): string {
    if (!s) {
        return "First and last name are required";
    } else if (
        s.length < 2 ||
        s.length > 50
    ) {
        return "Please enter a valid name";
    } else if (!/^[a-zA-Z\s]+$/.test(s)) {
        return "Please enter a name without special characters";
    } else {
        return "";
    }
}

export function validateRoomNumber(s: string): string {
    if (!s) {
        return "Room number is required";
    } else if (
        s.length < 2 ||
        s.length > 20
    ) {
        return "Please enter a valid room number";
    } else {
        return "";
    }
}

export const validateLogin = (formValues: any) => {
    let error: ErrorMessageLogin = {
        email: "",
        password: "",
    };
    if (!formValues.email) {
        error.email = "User name or e-mail are required";
    } else if (!isEmail(formValues.email)) {
        error.email = "Please enter a valid email or email";
    } else {
        error.email = "";
    }
    if (formValues.password.length < 8) {
        error.password = "Password must have at least 8 characters";
    } else {
        error.password = "";
    }
    return error;
};

export function isEmail(s: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(s)
}