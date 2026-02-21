import jwt from 'jsonwebtoken'


export function signAccessToken(userId) {
    //payload: "sub"  = subject. which is the userID
    //24hr expiry

    const TOKEN_EXPIRY = "24h"

    const secret = process.env.JWT_SECRET

    if (!secret) throw new Error('JWT secret not set')

    return jwt.sign({ sub: userId }, secret, {expiresIn: TOKEN_EXPIRY})
    //payload: "sub"  = subject. which is the userID
    //24hr expiry
}