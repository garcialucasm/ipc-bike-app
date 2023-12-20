import assert from "assert"
import { createWhereClausule } from "../../repositories/sql.util"


describe ("create where clausule", () => {
    it("with empty search criteria returns empty string", () => {
        const where = createWhereClausule({})
        assert.strictEqual(where, "")
    })

    it("returns one comparision for one field", () => {
        const where = createWhereClausule({oneField: 1})
        assert.strictEqual(where, " WHERE one_field = $1")
    })

    it("concatenate with and for more fields", () => {
        const where = createWhereClausule({oneField: 1, anotherField: 1})
        assert.strictEqual(where, " WHERE one_field = $1 AND another_field = $2")
    })

    it("doesnt destroy snake case search", () => {
        const where = createWhereClausule({snake_case: 1})

        assert.strictEqual(where, " WHERE snake_case = $1")
    })

    it("sanitize search fields", () => {
        const where = createWhereClausule({"'select * from database'": ""})
        assert.strictEqual(where, " WHERE selectfromdatabase = $1")
    })
})
