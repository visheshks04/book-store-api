import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET_KEY || "";
const JWT_EXPIRATION: string | number = (process.env.JWT_EXPIRATION) || 900;

const register = async (data: {email: string, password: string, role: string}) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data:{
            email: data.email,
            password: hashedPassword,
            role: data.role,
        },
    });

    return user;
};

const login = async (data: {email: string, password: string}) => {
    const user = await prisma.user.findUnique({ where: { email: data.email }});
    if(!user || !(await bcrypt.compare(data.password, user.password)))
        throw new Error("Invalid email or password");
    const token: string = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return { user, token }; 
};

export default { register, login };