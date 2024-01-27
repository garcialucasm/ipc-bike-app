import { Router, RouterOptions } from 'express'
import IAccountService from '../services/account.service'
import { validateEmail, validatePassword } from "../models/validators";
import { AccountDataDTO } from "../dto/account.dto";
import { cleanUpSpaces } from "../utils/strings";


function toAccountDTO(email: string): AccountDataDTO {
    email = email ? cleanUpSpaces(email.toLowerCase()) : '';
    return { email: email }
}

export default function accountController(accountService: IAccountService, routerOptions?: RouterOptions) {

    const router: Router = Router(routerOptions)

    router.post("/register", async (req, res) => {
        let email = req.body.email
        let password = req.body.password
        let account: AccountDataDTO

        try {
            // validateEmail(email)
            // validatePassword(password)
            account = toAccountDTO(email)
            accountService.registerAccount(account.email, password)
                .then(() => {
                    res.status(200)
                        .send("Successfully registered")
                }).catch(error => {
                    console.log(error)
                    res.status(500)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            console.log(error)
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
                }).catch(error => {
                    console.log(error)
                    res.status(500)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            console.log(error)
            res.status(401)
                .send({ error: error.message })
        }
    })

    return router
}