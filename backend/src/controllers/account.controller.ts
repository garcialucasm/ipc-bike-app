import { Router, RouterOptions } from 'express'
import IAccountService from '../services/account.service'
import { validateEmail, validatePassword } from "../models/validators";
import { userAccount } from "../models/account.model";
import { AccountDataDTO } from "../dto/account.dto";
import { cleanUpSpaces } from "../utils/strings";


function toAccountEmailDTO(email: string): string {
    return email ? cleanUpSpaces(email.toLowerCase()) : '';
}

export default function accountController(accountService: IAccountService, routerOptions?: RouterOptions) {

    const router: Router = Router(routerOptions)

    router.post("/register", async (req, res) => {
        let email = req.body.email
        let password = req.body.password

        try {
            email = toAccountEmailDTO(email)
            validateEmail(email)
            validatePassword(password)
            accountService.registerAccount(email, password)
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
        let email = req.body.email
        let password = req.body.password

        try {
            email = toAccountEmailDTO(email)
            validateEmail(email)
            accountService.login(email, password)
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

    router.post("/email", (req, res) => {

        let email = req.body.email
        email = toAccountEmailDTO(email)
        accountService.findByEmail(email)
            .then(userAccount => {
                res.status(200)
                    .send({ userAccount: userAccount })
            }).catch(error => {
                console.log(error)
                res.status(401)
                    .send({ error: error.message })
            })
    })

    return router
}