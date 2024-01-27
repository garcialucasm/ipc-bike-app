import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"

dotenv.config()

const jwtSecretKey = process.env.JWT_SECRET_KEY


export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error('No token found');
        }

        if (!jwtSecretKey) {
            throw new Error("JWT_SECRET_KEY is not set.Please configure it.");
        }
        const decoded = jwt.verify(token, jwtSecretKey);
        (req as CustomRequest).token = decoded;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};