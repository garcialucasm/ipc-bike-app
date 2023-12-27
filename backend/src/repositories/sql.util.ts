

function isLowerCase(s: string) : boolean {
    return "abcdefghijklmnopqrstuvwxyz".includes(s)
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

function createWhereClausule(searchCriteria: {}, prefix: string = "") : string {
    let where: string = ""
    let searchKeys = Object.keys(searchCriteria)

    if (searchKeys.length > 0) {
        where += " WHERE "
        let whereArguments: string[] = []

        searchKeys.forEach( (criteria, idx) => {
            let sanitized = toSnakeCase(criteria)
            sanitized = prefix.length > 0 ? `${prefix}.${sanitized}` : sanitized
            whereArguments.push(`${sanitized} = $${idx + 1}`)
        });
        
        where += whereArguments.reduce( (l, r) => l + " AND " + r)
    }

    return where
}


export {createWhereClausule}
