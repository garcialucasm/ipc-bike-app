import { Router, RouterOptions } from "express";
import IAccountService from "../services/account.service";
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from "../models/validators";
import { AccountDTO } from "../dto/account.dto";
import { cleanUpSpaces } from "../utils/strings";
import { getLogger } from "../logger";
import { Account } from "../models/account.model";

function toAccountDTO(account: Account): AccountDTO {
  return {
    id: account.ID ?? 0,
    type: account.Type ?? "",
    name: account.Name ?? "",
    email: account.Email ?? "",
    token: account.Token ?? "",
    isActive: account.IsActive ?? undefined,
    createdAt: account.CreatedAt ?? undefined,
    updatedAt: account.UpdatedAt ?? undefined,
    deletedAt: account.DeletedAt ?? undefined,
  };
}

export default function accountController(
  accountService: IAccountService,
  routerOptions?: RouterOptions
) {
  const logger = getLogger("AccountController");
  const router: Router = Router(routerOptions);

  /* ----------------------------- Secure Register ---------------------------- */
  router.post("/secure/register", async (req, res) => {
    logger.info("POST /secure/register");
    const accountName = cleanUpSpaces(req.body.accountName.toLowerCase());
    const email = cleanUpSpaces(req.body.email.toLowerCase());
    const password = req.body.password;

    try {
      validateUserName(accountName);
      validateEmail(email);
      validatePassword(password);

      accountService
        .registerAccount(accountName, email, password)
        .then((account) => {
          logger.debug(`registerAccount for user ${account.Name}`);
          res.status(200).send("Successfully registered");
        })
        .catch((error) => {
          logger.error("registerAccount error");
          logger.error(error);
          res.status(401).send({ error: error.message });
        });
    } catch (error: any) {
      logger.error(error);
      res.status(401).send({ error: error.message });
    }
  });
  /* -------------------------------------------------------------------------- */

  /* ----------------------- Secure Account Activation ------------------------ */
  router.post("/secure/account/activation", async (req, res) => {
    logger.info("POST /secure/account/activation");
    const email = req.body.email;

    accountService
      .toggleAccountActivation(email)
      .then((email) => {
        logger.debug(`toggleAccountActivation for account ${email}`);
        res.status(200).send("Success");
      })
      .catch((error) => {
        logger.error("toggleAccountActivation error");
        logger.error(error);
        res.status(401).send({ error: error.message });
      });
  });
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Find all accounts --------------------------- */
  router.get("/secure/account/all", (req, res) => {
    logger.info("GET /secure/account/all")

    accountService.findAllAccounts()
      .then(allAccounts => {
        logger.debug(`findAll successfully`)
        allAccounts.map(account => toAccountDTO(account))
        res.status(200)
          .send({ allAccounts: allAccounts })
      }).catch(error => {
        logger.error(error)
        res.status(401)
          .send({ error: error.message })
      })
  })

  /* ----------------------------- First Register ----------------------------- */
  router.post("/register", async (req, res) => {
    logger.info("POST /register");
    const accountName = cleanUpSpaces(req.body.accountName.toLowerCase());
    const email = cleanUpSpaces(req.body.email.toLowerCase());
    const password = req.body.password;

    try {
      validateUserName(accountName);
      validateEmail(email);
      validatePassword(password);

      accountService
        .registerAccount(accountName, email, password)
        .then((account) => {
          logger.debug(`firstRegisterAccount for user ${account.Name}`);
          res.status(200).send("Successfully registered");
        })
        .catch((error) => {
          logger.error(error);
          res.status(401).send({ error: error.message });
        });
    } catch (error: any) {
      logger.error(error);
      res.status(401).send({ error: error.message });
    }
  });
  /* -------------------------------------------------------------------------- */

  /* ---------------------------------- Login --------------------------------- */
  router.post("/login", async (req, res) => {
    logger.info("POST /login");
    const email = cleanUpSpaces(req.body.email.toLowerCase());
    const password = req.body.password;
    logger.silly("pudim");
    try {
      validateEmail(email);
      accountService
        .login(email, password)
        .then((account) => {
          logger.debug(
            "Login successfully completed by the account",
            account.ID
          );
          res.status(200).send({ account: toAccountDTO(account) });
        })
        .catch((error) => {
          logger.error(error);
          res.status(401).send({ error: error.message });
        });
    } catch (error: any) {
      logger.error(error);
      res.status(401).send({ error: error.message });
    }
  });
  /* -------------------------------------------------------------------------- */

  return router;
}
