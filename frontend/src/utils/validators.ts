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
