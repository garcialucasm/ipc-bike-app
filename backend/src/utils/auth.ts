import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
import * as fs from 'fs';
import { logger } from '../logger';

dotenv.config()

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
    logger.debug("Auth called: checkAuth")
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            logger.debug("Auth called: checkAuth error | No token found")
            throw new Error('No token found');
        }

        const decoded = jwt.verify(token, publicJwtKey);
        (req as CustomRequest).token = decoded;
        next();
    } catch (err) {
        logger.debug(`Auth called: checkAuth error | ${err}`)
        res.status(401).send('Please authenticate');
    }
};

export function generateAsyncToken(payload: { id: string, accountName: string }): Promise<string> {
    logger.debug(`Auth called: generateAsyncToken`)
    return new Promise((resolve, reject) => {

        if (!privateJwtKey) {
            logger.debug(`Auth called: generateAsyncToken error | JWT PRIVATE KEY rejected`)
            reject(new Error("JWT PRIVATE KEY rejected."));
            return;
        }

        jwt.sign(payload, privateJwtKey, { algorithm: 'RS256' }, (err, token) => {
            if (err) {
                reject(err);
                logger.debug(`Auth called: generateAsyncToken error | Error generating token | ${err}`)
            } else {
                if (token) {
                    resolve(token);
                }
            }
        });
    });
}
