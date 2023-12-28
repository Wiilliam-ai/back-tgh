import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listProject = async (req, res) => {
    const {id} = req.customer;

    const projects = await prisma.project.findMany({
        where: {
            customerId: parseInt(id)
        }
    })
    res.status(200).json(projects)
}


const createProject = async (req, res) => {
    const {title,description,dateSend,requiriments,customerId} = req.body;
    try {
        const project = await prisma.project.create({
            data: {
                title,
                description,
                dateSend,
                requiriments,
                customerId
            }
        })
        res.status(200).json({
            status: true,
            msg: "Se registro un nuevo proyecto",
            project
        })
        
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Error en el servidor",
          })
    }
}

export {
    listProject,
    createProject
}