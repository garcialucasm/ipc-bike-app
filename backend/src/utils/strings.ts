
function isLowerCase(s: string) : boolean {
  const lowerCaseRegex = /[a-z]/
  return lowerCaseRegex.test(s)
}

function isAlpha(s: string) : boolean {
  const alphaRegex = /[a-zA-Z ]+/
  return alphaRegex.test(s)
}

function isAlphaNumerical(s: string) : boolean {
  const alphaNumRegex = /[a-zA-Z0-9 ]*/
  return alphaNumRegex.test(s)
}

function isValid(s: string) : boolean {
  return isLowerCase(s.toLowerCase()) || "_".includes(s)
}

function toSnakeCase(s: string) : string {
  let result: string = ""

  for (let i = 0; i < s.length; ++i) {
    if (!isValid(s[i]))
      continue

    if (isLowerCase(s[i]))
      result += s[i]
    else if("_" === s[i])
      result += '_'
    else 
      result += '_' + s[i].toLocaleLowerCase()
  }

  return result
}

export {isLowerCase, isAlpha, isAlphaNumerical, toSnakeCase}
