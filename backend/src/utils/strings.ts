// TOCHECK: Does make sense to have this file and also sql.util.ts?
function isLowerCase(s: string): boolean {
  const lowerCaseRegex = /[a-z]/
  return lowerCaseRegex.test(s)
}

function isNumber(value: any): boolean {
  return typeof value === "number"
}

function isAlpha(s: string): boolean {
  const alphaRegex = /[a-zA-Z ]+/
  return alphaRegex.test(s)
}

function isNumericString(value: any): boolean {
  if (typeof value !== "string") {
    return false
  }
  return /^\d+$/.test(value)
}

function isAlphaNumerical(s: string): boolean {
  const alphaNumRegex = /[a-zA-Z0-9 ]*/
  return alphaNumRegex.test(s)
}

function isValid(s: string): boolean {
  return isLowerCase(s.toLowerCase()) || "_".includes(s)
}

function toSnakeCase(s: string): string {
  let result: string = ""

  for (let i = 0; i < s.length; ++i) {
    if (!isValid(s[i])) continue

    if (isLowerCase(s[i])) result += s[i]
    else if ("_" === s[i]) result += "_"
    else result += "_" + s[i].toLocaleLowerCase()
  }

  return result
}

function isEmail(s: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(s)
}

function cleanUpSpaces(s: string): string {
  if (!s) {
    return ""
  }

  // Remove double or more spaces
  const noDoubleSpaces = s.replace(/\s+/g, " ")

  // Remove spaces at the end
  const trimmed = noDoubleSpaces.trim()
  return trimmed
}

function sanitizeInput(s: string): string {
  if (!s) {
    return ""
  }
  // Remove double or more spaces
  return cleanUpSpaces(s).toLowerCase()
}

export {
  isLowerCase,
  isNumber,
  isNumericString,
  isAlpha,
  isAlphaNumerical,
  toSnakeCase,
  isEmail,
  cleanUpSpaces,
  sanitizeInput,
}
