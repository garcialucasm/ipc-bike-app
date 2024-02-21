import { Router, RouterOptions } from 'express'
import IAccountService from '../services/account.service'
import { validateEmail, validatePassword, validateUserName } from "../models/validators";
import { AccountDTO } from "../dto/account.dto";
import { cleanUpSpaces } from "../utils/strings";


function toAccountDTO(account: AccountDTO): AccountDTO {
    return {
        id: account.id ?? 0,
        accountName: account.accountName ?? '',
        token: account.token ?? '',
    }
}

export default function accountController(accountService: IAccountService, routerOptions?: RouterOptions) {

    const router: Router = Router(routerOptions)

    router.post("/secure/register", async (req, res) => {
        const accountName = cleanUpSpaces(req.body.accountName.toLowerCase())
        const email = cleanUpSpaces(req.body.email.toLowerCase())
        const password = req.body.password

        try {
            //validateUserName(accountName)
            //validateEmail(email)
            //validatePassword(password)

            accountService.registerAccount(accountName, email, password)
                .then(() => {
                    res.status(200)
                        .send("Successfully registered")
                }).catch(error => {
                    console.error(error)
                    res.status(401)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            console.error(error)
            res.status(401)
                .send({ error: error.message })
        }
    })

    router.post("/register", async (req, res) => {
        const accountName = cleanUpSpaces(req.body.accountName.toLowerCase())
        const email = cleanUpSpaces(req.body.email.toLowerCase())
        const password = req.body.password

        try {
            //validateUserName(accountName)
            //validateEmail(email)
            //validatePassword(password)

            accountService.registerAccount(accountName, email, password)
                .then(() => {
                    res.status(200)
                        .send("Successfully registered")
                }).catch(error => {
                    console.error(error)
                    res.status(401)
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
        const email = cleanUpSpaces(req.body.email.toLowerCase())
        const password = req.body.password

        try {
            // validateEmail(email)
            accountService.login(email, password)
                .then((account) => {
                    res.status(200)
                        .send({ account: toAccountDTO(account) })
                    console.info("Authenticated successfully")
                }).catch(error => {
                    console.error(error)
                    res.status(401)
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