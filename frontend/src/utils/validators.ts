import { ErrorMessageLogin } from "@/components/Login/Login";


export function cleanUpSpaces(s: string): string {
    // Remove double or more spaces
    const noDoubleSpaces = s.replace(/\s{2,}/g, ' ');

    // Remove spaces at the end
    const trimmed = noDoubleSpaces.trim();

    return trimmed;
}

export function validateFirstName(s: string): string {
    if (!s) {
        return "First name is required";
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

export function validateLastName(s: string): string {
    if (!s) {
        return "Last name is required";
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

export function validateLogin(formValues: any) {
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

export function toPascalCase(input: string): string {
    return input.replace(/(\w)(\w*)/g, (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase());
}

export function joinFistLastName(fName: string, lName: string) {
    const userName = cleanUpSpaces(fName) + " " + cleanUpSpaces(lName)
    return userName
}