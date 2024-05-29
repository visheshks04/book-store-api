import { Request, Response } from 'express';
import authService from '../services/authService';

const register = async (req: Request, res: Response) => {
    try{
        const result = await authService.register(req.body);
        res.send(result);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Couldn't register. Some internal error." })
    }
}

const login = async (req: Request, res: Response) => {
    try{
        const result = await authService.login(req.body);
        res.send(result);
    } catch(error){
        console.log(error);
        res.status(400).json({ message: "Invalid email or password." })
    }
}

export default { register, login };