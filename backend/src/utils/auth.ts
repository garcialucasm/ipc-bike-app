import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs'
import path from 'path';
import dotenv from "dotenv"

dotenv.config()

const privateJwtKey = process.env.PIVATE_JWT_KEY;
const publicJwtKey = process.env.PUBLIC_JWT_KEY;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token found');
        }

        if (!publicJwtKey) {
            throw new Error("JWT PUBLIC KEY is not set. Please configure it.");
        }
        const decoded = jwt.verify(token, publicJwtKey);
        (req as CustomRequest).token = decoded;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};

export function generateAsyncToken(payload: { id: string, accountName: string }): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!privateJwtKey) {
            reject(new Error("JWT PRIVATE KEY is not set. Please configure it."));
            return;
        }

        jwt.sign(payload, privateJwtKey, { algorithm: 'RS256' }, (err, token) => {
            if (err) {
                reject(err);
                console.error('Error generating token:', err);
            } else {
                if (token) {
                    resolve(token);
                }
            }
        });
    });
}