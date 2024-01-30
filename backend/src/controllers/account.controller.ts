import { Router, RouterOptions } from 'express'
import IAccountService from '../services/account.service'
import { validateEmail, validatePassword } from "../models/validators";
import { AccountDataDTO } from "../dto/account.dto";
import { cleanUpSpaces } from "../utils/strings";


function toAccountDTO(email: string, name?: string): AccountDataDTO {
    email = email ? cleanUpSpaces(email.toLowerCase()) : '';
    name = name ? cleanUpSpaces(name.toLowerCase()) : '';
    return { name: name, email: email }
}

export default function accountController(accountService: IAccountService, routerOptions?: RouterOptions) {

    const router: Router = Router(routerOptions)

    router.post("/register", async (req, res) => {
        let accountName = req.body.accountName
        let email = req.body.email
        let password = req.body.password
        let account: AccountDataDTO

        try {
            // TODO: create validationUserName(accountName)
            // validateEmail(email)
            // validatePassword(password)
            account = toAccountDTO(accountName, email)

            if (!account.name) {
                throw new Error("The account name cannot be empty")
            }

            accountService.registerAccount(account.name, account.email, password)
                .then(() => {
                    res.status(200)
                        .send("Successfully registered")
                }).catch(error => {
                    console.error(error)
                    res.status(500)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            console.error(error)
            res.status(401)
                .send({ error: error.message })
        }
    })

    router.post("/login", async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        let account: AccountDataDTO

        try {
            account = toAccountDTO(email)
            // validateEmail(account.email)
            accountService.login(account.email, password)
                .then((account) => {
                    res.status(200)
                        .send(account)
                    console.info("Authenticated successfully")
                }).catch(error => {
                    console.error(error)
                    res.status(500)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            console.error(error)
            res.status(401)
                .send({ error: error.message })
        }
    })

    return router
}