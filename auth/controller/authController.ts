import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const createStudent = async (req: Request, res: Response) => {
    try {

        const { parentName, childAge, stateOFOrigin, childName, occupation, localGovt,email, password, contact, address, } = req.body;

        const encrypt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, encrypt);
        const token = jwt.sign({ hashed }, "starting");

        const student = await prisma.authModel.create({
            data: {
                parentName,
                childName,
                email,
                childAge,
                stateOFOrigin,
                occupation,
                localGovt,
                password: hashed,
                contact,
                address,
                token,
                class
            }
        })
        return res.status(201).json({
            messsage: "Created student successfully",
            data: student
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error creating student",
            data: error
        })
    }
}

export const signInStudent = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const student = await prisma.authModel.findUnique({
            where: { email }
        })

        if (student) {
            const pass = await bcrypt.compare(student.password, password)
            if (pass) {
                if (student.verified === true && student.token === "") {

                    const token = jwt.sign({ id: student.id }, "Do Hard Things")

                    req.headers.authorization = `Do Hard Things ${token}`

                    return res.status(201).json({
                        message: `welcome ${student.name}`,
                        data: token,
                    })
                } else {
                    return res.status(404).json({
                        message: "Go and verify your credentials"
                    })
                }

            } else {
                return res.status(404).json({
                    message: "password is incorrect"
                })
            }
        } else {
            return res.status(404).json({
                message: "Student not found"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error signing in student",
            data: error
        })
    }
}

export const getOneStudent = async (req: Request, res: Response) => {
    try {

        const { studentID } = req.params;

        const student = await prisma.authModel.findUnique({
            where: { id: studentID }
        })
        return res.status(201).json({
            messsage: "student gotten successfully",
            data: student
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error getting one student",
            data: error
        })
    }
}

export const getAllStudent = async (req: Request, res: Response) => {
    try {

        const student = await prisma.authModel.findMany({});

        return res.status(201).json({
            messsage: "All students gotten successfully",
            data: student
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error getting All student",
            data: error
        })
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {

        const { studentID } = req.params;

        const { contact, address } = req.body;

        const student = await prisma.authModel.update({
            where: { id: studentID },
            data: {
                contact,
                address,
            },
        });

        return res.status(201).json({
            messsage: `${student.name} deleted successfully`,
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error deleting one student",
            data: error
        })
    }
}

export const deleteOneStudent = async (req: Request, res: Response) => {
    try {

        const { studentID } = req.params;

        const student = await prisma.authModel.delete({
            where: { id: studentID }
        });

        return res.status(201).json({
            messsage: `${student.name} deleted successfully`,
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error deleting one student",
            data: error
        })
    }
}

export const deleteAllStudent = async (req: Request, res: Response) => {
    try {

        const student = await prisma.authModel.deleteMany({});

        return res.status(201).json({
            messsage: "All students deleted successfully",
            data: student
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error deleting All student",
            data: error
        })
    }
}

export const verifyStudent = async (req: Request, res: Response) => {
    try {
        const { studentID } = req.params;

        const student = await prisma.authModel.findUnique({
            where: {
                id: studentID,
            },
        });

        if (student?.token !== "") {

            const studentInfo = await prisma.authModel.update({
                where: { id: student?.id },
                data: {
                    verified: true,
                    token: "",
                },
            });
            return res.status(201).json({
                message: `${studentInfo.name} you have been verified, you can now proceed 🦾`,
                data: student,
            });
        } else {
            return res.status(404).json({
                message: "student not found",
            });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error verifying student",
        });
    }
}