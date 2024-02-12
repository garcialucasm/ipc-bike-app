import jwt, { JwtPayload } from "jsonwebtoken"

const jwtSecretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY?.trim()

export function verifyToken(token: string) {
    if (!jwtSecretKey) {
        throw new Error("JWT_SECRET_KEY is not set.")
    }
    try {
        return jwt.verify(token, jwtSecretKey) as JwtPayload;
    } catch (error) {
        throw new Error("Invalid token.");
    }
}