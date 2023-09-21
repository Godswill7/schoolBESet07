import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import { publisherConnection } from '../utils/connection';

const prisma = new PrismaClient()

export const createStudent = async (req: Request, res: Response) => {
    try {

        const {studentName, email, password,className} = req.body;

        const encrypt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, encrypt);
        const token = jwt.sign({ hashed }, "starting");

        const student = await prisma.authModel.create({
            data: {
                studentName,
                email,
                password: hashed,
                token: token,
                className
            }
        })

        publisherConnection("student", student);
        console.log("read",student)
        return res.status(201).json({
            messsage: "Created student successfully",
            data: student
        })

    } catch (error:any) {
        return res.status(404).json({
            message: `Error creating student: ${error.message}`,
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

        if (student?.token === "") {

            const studentInfo = await prisma.authModel.update({
                where: { id: student?.id },
                data: {
                    verified: true,
                    token: "",
                },
            });
            return res.status(201).json({
                message: `${studentInfo.studentName} you have been verified, you can now proceed 🦾`,
                data: student,
            });
        } else {
            return res.status(404).json({
                message: "student not found",
            });
        }
    } catch (error) {
        return res.status(404).json({
            message: `Error verifying student: ${error}`,
        });
    }
}

export const signInStudent = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const student = await prisma.authModel.findUnique({
            where: { email }
        })

        if (student) {
            const pass = await bcrypt.compare(password,student?.password)
            if (pass) {
                if (student?.verified === true && student?.token === "") {

                    const token = jwt.sign({ id: student.id }, "Do Hard Things")

                    req.headers.authorization = `Do Hard Things ${token}`

                    return res.status(201).json({
                        message: `welcome ${student?.studentName}`,
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

export const getAllStudent = async (req: Request, res: Response) => {
    try {

        const student = await prisma.authModel.findMany({});

        return res.status(200).json({
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

export const getOneStudent = async (req: Request, res: Response) => {
    try {

        const { studentID } = req.params;

        const student = await prisma.authModel.findUnique({
            where: { id: studentID }
        })
        return res.status(200).json({
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