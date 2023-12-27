import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { newJsonToken, newToken } from "../helper/generate.js";

const prisma = new PrismaClient();

const saveUser = async (req, res) => {
    const { firstName, lastName,email, phone,password,roleId } = req.body;
    try {

        if (!firstName || !lastName || !email || !phone || !password || !roleId) {
            return res.status(400).json({
                status: false,
                msg: 'Datos de entrada incompletos',
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(402).json({
                status: false,
                msg: 'Eror al registrar cuenta ya existente'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);


        const newUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                phone,
                roleId
            }
        });

        return res.status(200).json({
            status: true,
            msg: 'Se registro un nuevo usuario'
        });

    } catch (error) {
        console.error(error?.message);
        return res.status(500).json({
            status: false,
            msg: 'Error en el servidor'
        });
    }
}

const loginUser = async (req,res) =>{
    const {email,password} = req.body
    try {
        
        if (!email ||!password) {
            return res.status(400).json({
                status: false,
                msg: 'Datos de entrada incompletos'
            })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return res.status(400).json({
                status: false,
                msg: 'El usuario no existe'
            })
        } 

        const { firstName,lastName,email: correo,roleId } = existingUser;

        const verifyUser = bcrypt.compareSync(password, existingUser.password)
        if (!verifyUser) {
            return res.status(400).json({
                status: false,
                msg: 'La contraseña es incorrecta',
            })
        }

        const myToken = newJsonToken(existingUser.id);

        return res.status(200).json({
            status: true,
            token: myToken,
            fullName: `${firstName} ${lastName}`,
            email: correo,
            roleId
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: 'Error en el servidor'
        })
    }
}

const profileUser = async (req, res) => {
    const { user } = req
    const { id,email,roleId } = user
    res.status(200).json({
        status: true,
        id,
        email,
        roleId
    })
}

export {
    saveUser,
    checkUser,
    loginUser,
    profileUser
}