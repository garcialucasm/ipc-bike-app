
import { toSnakeCase } from "../utils/strings"

function createWhereClausule(searchCriteria: {}) : string {
    let where: string = ""
    let searchKeys = Object.keys(searchCriteria)

    if (searchKeys.length > 0) {
        where += " WHERE "
        let whereArguments: string[] = []

        searchKeys.forEach( (criteria, idx) => {
            let sanitized = toSnakeCase(criteria)
            whereArguments.push(`${sanitized} = $${idx + 1}`)
        });
        
        where += whereArguments.reduce( (l, r) => l + " AND " + r)
    }

    return where
}

export {createWhereClausule}
