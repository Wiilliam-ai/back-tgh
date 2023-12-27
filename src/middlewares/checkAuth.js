import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

const checkAuth = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await prisma.user.findUnique({
                where: { 
                    id: decoded.id 
                },
                select: {
                    id: true,
                    email: true,
                    roleId: true,
                }
            })
            return next();
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error" });
        }
    }

    if (!token) {
        const error = new Error("Token no válido");
        return res.status(401).json({ msg: error.message });
    }
    next();
}


export {
    checkAuth
}