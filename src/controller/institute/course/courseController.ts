import { Response } from "express";
import { IExtendedRequest } from "../../../middleWare/type";
import sequelize from "../../../database/connection";


const createCourse= async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user
    const {coursePrice, courseName,courseDescription, courseDuration, courseLevel,categoryId } = req.body 
    if(!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel || !categoryId){
    return res.status(400).json({
        messsage : "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel,categoryId"
    })
    }
    await sequelize.query(`IN`)


}