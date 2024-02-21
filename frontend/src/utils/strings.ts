export function cleanUpSpaces(s: string): string {
    // Remove double or more spaces
    const noDoubleSpaces = s.replace(/\s{2,}/g, ' ');

    // Remove spaces at the end
    const trimmed = noDoubleSpaces.trim();

    return trimmed;
}

export function toPascalCase(input: string): string {
    return input.replace(/(\w)(\w*)/g, (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase());
}