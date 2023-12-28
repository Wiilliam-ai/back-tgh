import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { newJsonToken } from "../helper/generate.js";

const prisma = new PrismaClient();

const customerSave = async (req, res) => {
  const { fullName, email, cardId, password } = req.body;
  try {
    if (!fullName || !email || !cardId || !password) {
      return res.status(400).json({
        status: false,
        msg: "Datos de entrada incompletos",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return res.status(402).json({
        status: false,
        msg: "Eror al registrar cuenta ya existente",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newCus = await prisma.customer.create({
      data: {
        fullName,
        cardId,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      status: true,
      msg: "Se registro un nuevo cliente",
    });
  } catch (error) {
    console.error(error?.message);
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor",
    });
  }
};

const customerUpdate = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, cardId, password } = req.body;
  try {
    if (!fullName || !email || !cardId || !password) {
      return res.status(400).json({
        status: false,
        msg: "Datos de entrada incompletos",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newCus = await prisma.customer.update({
      data: {
        fullName,
        cardId,
        email,
        password: hashedPassword,
      },
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      status: true,
      msg: "Se registro un nuevo cliente",
    });
  } catch (error) {
    console.error(error?.message);
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor",
    });
  }
};

const customerDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCustomer = await prisma.customer.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      status: true,
      msg: "Se elimino un cliente",
    });
  } catch (error) {
    console.error(error?.message);
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor",
    });
  }
};

const customerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        msg: "Datos de entrada incompletos",
      });
    }

    const existingUser = await prisma.customer.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return res.status(402).json({
        status: false,
        msg: "Eror al iniciar sesion el usuario no existe",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(402).json({
        status: false,
        msg: "Eror al iniciar sesion, contraseña incorrecta",
      });
    }

    const token = newJsonToken(existingUser.id);

    return res.status(200).json({
      status: true,
      token,
    });
  } catch (error) {
    console.error(error?.message);
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor",
    });
  }
};

export { customerSave, customerUpdate, customerDelete, customerLogin };
