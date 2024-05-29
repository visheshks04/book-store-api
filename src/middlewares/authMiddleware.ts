import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET_KEY || "";

const authMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if(!token) return res.sendStatus(401);

        try{
            const verified = jwt.verify(token, JWT_SECRET);
            (req as any).user = verified;
            if(!roles.includes((req as any).user.role)) return res.sendStatus(403);
            next();
        } catch(error){
            console.log(error);
            return res.sendStatus(400);
        }
    }
}


export default authMiddleware;