import { Response } from "express";
import { IExtendedRequest } from "../../../middleWare/type";
import sequelize from "../../../database/connection";


const getAllStudents = async ( req:IExtendedRequest,res:Response)=>{
    // const instituteNumber=req.currentInstituteNum
    const instituteNumber = req.user?.currentInstituteNum
    const students = await sequelize.query(`SELECT * FROM student_${instituteNumber}`)
    res.status(200).json({
        messgae : "student fetched", 
        data : students
    })
}

export default getAllStudents