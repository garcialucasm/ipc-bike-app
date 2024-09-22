import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import { getLogger } from '../logger';
import { AccountType } from '../models/account.model';

const logger = getLogger('auth')

let publicJwtKey: string = ""

if (process.env.PUBLIC_JWT_KEY_FILE) {
  publicJwtKey = fs.readFileSync(process.env.PUBLIC_JWT_KEY_FILE, 'utf8')
} else if (process.env.PUBLIC_JWT_KEY) {
  publicJwtKey = process.env.PUBLIC_JWT_KEY;
}

let privateJwtKey: string = ""

if (process.env.PRIVATE_JWT_KEY_FILE) {
  privateJwtKey = fs.readFileSync(process.env.PRIVATE_JWT_KEY_FILE, 'utf8')
} else if (process.env.PRIVATE_JWT_KEY) {
  privateJwtKey = process.env.PRIVATE_JWT_KEY;
}

if (publicJwtKey === "") {
  throw new Error("JWT PUBLIC KEY is not set. Please configure it.");
}

if (privateJwtKey === "") {
  throw new Error("JWT PRIVATE KEY is not set. Please configure it.");
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  logger.debug("checkAuth")

  if (process.env.AUTH_DISABLED === "true" && process.env.NODE_ENV != "production") {
    logger.debug("Auth is disabled in dev mode")
    next()
  } else {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        logger.debug("No token found")
        throw new Error('No token found');
      }

      const decoded = jwt.verify(token, publicJwtKey);
      (req as CustomRequest).token = decoded;
      logger.debug('token decoded sucessfully')
      next();
    } catch (err) {
      logger.debug("auth error", err)
      res.status(401).send('Please authenticate');
    }
  }
};

export const getDecodedToken = async (req: Request): Promise<JwtPayload | null> => {
  logger.debug("getDecodedToken")

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (token) {
      const decoded = jwt.verify(token, publicJwtKey) as JwtPayload
      logger.debug("token decoded sucessfully")
      
      return decoded
    }
    logger.debug("No token found")
  } catch (err) {
    logger.debug("decoded error", err)
  }
  return null
}

export function generateAsyncToken(payload: { accountId: string, accountName: string, accountType:string }): Promise<string> {
  logger.debug("generateAsyncToken")
  return new Promise((resolve, reject) => {

    if (!privateJwtKey) {
      logger.debug("JWT PRIVATE KEY rejected")
      reject(new Error("JWT PRIVATE KEY rejected."));
      return;
    }

    jwt.sign(payload, privateJwtKey, { algorithm: 'RS256', expiresIn: '30d' }, (err, token) => {
      if (err) {
        reject(err);
        logger.debug("Error generating token", err)
      } else {
        if (token) {
          resolve(token);
        }
      }
    });
  });
}

export function generatePublicAsyncToken(payload: { userId?: number }): Promise<string> {
  logger.debug("generatePublicAsyncToken")
  return new Promise((resolve, reject) => {

    if (!privateJwtKey) {
      logger.debug("JWT PRIVATE KEY rejected")
      reject(new Error("JWT PRIVATE KEY rejected."));
      return;
    }

    jwt.sign(payload, privateJwtKey, { algorithm: 'RS256', expiresIn: '180d' }, (err, token) => {
      if (err) {
        reject(err);
        logger.debug("Error generating token", err)
      } else {
        if (token) {
          resolve(token);
        }
      }
    });
  });
}

export async function validateAccountPermission(req: Request, expectedAccountTypes: AccountType[]): Promise<boolean> {
  logger.debug("validateAccountPermission")
  
  const decodedToken = await getDecodedToken(req)
  const currentAccountType = decodedToken ? decodedToken.accountType : null
  const hasPermission = expectedAccountTypes.includes(currentAccountType)
  
  if (hasPermission) {
    logger.debug("validateAccountPermission ~ hasPermission")
    return hasPermission
  } else {
    logger.debug("validateAccountPermission ~ Account permission denied")
    throw new Error("Account permission denied")
  }
};