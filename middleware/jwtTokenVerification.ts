
import { NextFunction, Request, Response } from "express";

export const jwtTokenVerification = async (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.cookies["next-auth.session-token"] ||
        req.cookies["__Secure-next-auth.session-token"];
   
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
 
    next()
}