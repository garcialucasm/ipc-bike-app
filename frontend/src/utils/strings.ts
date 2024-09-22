export function cleanUpSpaces(s: string): string {
    // Remove double or more spaces
    const noDoubleSpaces = s.replace(/\s{2,}/g, ' ');

    // Remove spaces at the end
    const trimmed = noDoubleSpaces.trim();

    return trimmed;
}

export function toPascalCase(input: string): string {
  if (!input) {
    return input
  }
    return input.replace(/(\w)(\w*)/g, (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase());
}

export function formatDateString(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC' // Adjust timezone if needed
    };

    return date.toLocaleString('en-GB', options);
}