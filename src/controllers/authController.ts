import { Request, Response } from 'express';
import authService from '../services/authService';

const register = async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    return res.send(result);
}

const login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    return res.send(result);
}

export default { register, login };