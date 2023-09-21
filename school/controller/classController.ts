import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createClass = async (req: Request, res: Response) => {
    try {

        const { className } = req.body

        const studentClass = await prisma.classModel.create({
            data: { className, students: [] }
        })
        return res.status(201).json({
            message: `Class have being created successfully`,
            data: studentClass
        })
    } catch (error: any) {
        return res.status(404).json({
            message: `Error occured while creating class: ${error}`
        })
    }
}
export const viewAllClass = async (req: Request, res: Response) => {
    try {
        const studentClass = await prisma.classModel.findMany({})
        return res.status(200).json({
            message: `Class have being created successfully`,
            data: studentClass
        })
    } catch (error: any) {
        return res.status(404).json({
            message: `Error occured while creating class: ${error}`
        })
    }
}
export const viewAClass = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params

        const studentClass = await prisma.classModel.findUnique({
            where: { id: classID }
        })
        return res.status(200).json({
            message: `Class`,
            data: studentClass
        })
    } catch (error: any) {
        return res.status(404).json({
            message: `Error occured while creating class: ${error}`
        })
    }
}
export const deleteClass = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params

        const studentClass = await prisma.classModel.delete({
            where: { id: classID }
        })
        return res.status(200).json({
            message: `Class have being deleted successfully`
        })
    } catch (error: any) {
        return res.status(404).json({
            message: `Error occured while creating class: ${error}`
        })
    }
}