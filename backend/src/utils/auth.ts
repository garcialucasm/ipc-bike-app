import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs'
import path from 'path';

const pathPrivateJwtKey = path.join(__dirname, '../../', 'private.pem');
const pathPublicJwtKey = path.join(__dirname, '../../', 'public.pem');
const privateJwtKey = fs.readFileSync(pathPrivateJwtKey, 'utf-8').trim();
const publicJwtKey = fs.readFileSync(pathPublicJwtKey, 'utf-8').trim();

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

export function generateAsyncToken(payload: { id: string, email: string }): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!privateJwtKey) {
            reject(new Error("JWT PRIVATE KEY is not set. Please configure it."));
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