import { Router, RouterOptions } from 'express'
import IAccountService from '../services/account.service'
import { validateEmail, validatePassword, validateUserName } from "../models/validators";
import { AccountDTO } from "../dto/account.dto";
import { cleanUpSpaces } from "../utils/strings";
import { getLogger } from '../logger';
import winston from 'winston/lib/winston/config';


function toAccountDTO(account: AccountDTO): AccountDTO {
    return {
        id: account.id ?? 0,
        accountName: account.accountName ?? '',
        token: account.token ?? '',
    }
}

export default function accountController(accountService: IAccountService, routerOptions?: RouterOptions) {
    const logger = getLogger('AccountController')
    const router: Router = Router(routerOptions)

    /* ----------------------------- Secure Register ---------------------------- */
    router.post("/secure/register", async (req, res) => {
        logger.info("POST /secure/register")
        const accountName = cleanUpSpaces(req.body.accountName.toLowerCase())
        const email = cleanUpSpaces(req.body.email.toLowerCase())
        const password = req.body.password

        try {
            validateUserName(accountName)
            validateEmail(email)
            validatePassword(password)

            accountService.registerAccount(accountName, email, password)
                .then((account) => {
                    logger.debug(`registerAccount for user ${account.AccountName}`)
                    res.status(200)
                        .send("Successfully registered")
                }).catch(error => {
                    logger.error(`registerAccount error | ${error}`)
                    console.error(error)
                    res.status(401)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            logger.error(`POST /secure/register error | ${error}`)
            console.error(error)
            res.status(401)
                .send({ error: error.message })
        }
    })
    /* -------------------------------------------------------------------------- */

    /* ----------------------------- First Register ----------------------------- */
    router.post("/register", async (req, res) => {
        logger.info("POST /register")
        const accountName = cleanUpSpaces(req.body.accountName.toLowerCase())
        const email = cleanUpSpaces(req.body.email.toLowerCase())
        const password = req.body.password

        try {
            validateUserName(accountName)
            validateEmail(email)
            validatePassword(password)

            accountService.registerAccount(accountName, email, password)
                .then((account) => {
                    logger.debug(`firstRegisterAccount for user ${account.AccountName}`)
                    res.status(200)
                        .send("Successfully registered")
                }).catch(error => {
                    logger.error(`firstRegisterAccount error | ${error}`)
                    console.error(error)
                    res.status(401)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            logger.error(`POST /register error | ${error}`)
            console.error(error)
            res.status(401)
                .send({ error: error.message })
        }
    })
    /* -------------------------------------------------------------------------- */

    /* ---------------------------------- Login --------------------------------- */
    router.post("/login", async (req, res) => {
        logger.info("POST /login")
        const email = cleanUpSpaces(req.body.email.toLowerCase())
        const password = req.body.password
        logger.silly('silly test')
        try {
            validateEmail(email)
            accountService.login(email, password)
                .then((account) => {
                    logger.debug(`Login successfully completed by the account id: ${account.id}`)
                    res.status(200)
                        .send({ account: toAccountDTO(account) })

                }).catch(error => {
                    logger.error("login error:  ", error)
                    res.status(401)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            logger.error(`POST /login error | ${error}`)
            console.error(error)
            res.status(401)
                .send({ error: error.message })
        }
    })
    /* -------------------------------------------------------------------------- */

    return router
}
