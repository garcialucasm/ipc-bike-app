import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// TODO: Correct this part
// const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtSecretKey = "process.env.JWT_SECRET_KEY"

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token)

        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, jwtSecretKey);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};