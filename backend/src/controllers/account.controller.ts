import { Router, RouterOptions } from 'express'
import IAccountService from '../services/account.service'
import { validateEmail, validatePassword, validateUserName } from "../models/validators";
import { AccountDTO } from "../dto/account.dto";
import { cleanUpSpaces } from "../utils/strings";
import { getLogger } from '../logger';


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
                    logger.error("registerAccount error")
                    logger.error(error)
                    res.status(401)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            logger.error(error)
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
                    logger.error(error)
                    res.status(401)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            logger.error(error)
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
        logger.silly('pudim')
        try {
            validateEmail(email)
            accountService.login(email, password)
                .then((account) => {
                    logger.debug("Login successfully completed by the account", account.id)
                    res.status(200)
                        .send({ account: toAccountDTO(account) })

                }).catch(error => {
                    logger.error(error)
                    res.status(401)
                        .send({ error: error.message })
                })
        }
        catch (error: any) {
            logger.error(error)
            res.status(401)
                .send({ error: error.message })
        }
    })
    /* -------------------------------------------------------------------------- */

    return router
}
