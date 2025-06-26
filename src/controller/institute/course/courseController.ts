import { Response } from "express";
import { IExtendedRequest } from "../../../middleWare/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";


const createCourse= async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
    const {coursePrice, courseName,courseDescription, courseDuration, courseLevel } = req.body 
    if(!coursePrice || !courseName || !courseDescription || !courseDuration || !courseLevel){
    return res.status(400).json({
        messsage : "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel,categoryId"
    })
    }
    const courseThumbnail = null

    await sequelize.query(`INSERT INTO course_${instituteNumber}(coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail) VALUES(?,?,?,?,?,?)`,{
        type : QueryTypes.INSERT,
        replacements : [coursePrice, courseName,courseDescription,courseDuration,courseLevel,courseThumbnail]
    })


    res.status(200).json({
    message : 'course created successfully'
    })

}

const deleteCourse = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber 
    const courseId = req.params.id 
    // first check if course exists or not , if exists --> delete else not delete 
    const courseData = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`,{
        replacements : [courseId], 
        type : QueryTypes.SELECT
    })

    if(courseData.length == 0){
        return res.status(404).json({
            message : "no course with that id"
        })
    }

    await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`,{
        replacements : [courseId], 
        type : QueryTypes.DELETE
    })
    res.status(200).json({
        message : "course deleted successfully"
    })
}


const getAllCourse = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber; 

    const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`,{
        type : QueryTypes.SELECT
    })
    res.status(200).json({
        message : "Course fetched", 
        data : courses, 
    
    })
}

const getSingleCourse = async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber; 
    const courseId = req.params.id
    const course = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ?`,{
        replacements : [courseId], 
        type : QueryTypes.SELECT
    })
    res.status(200).json({
        message : "single course fetched", 
        data : course
    })
}

export {createCourse,deleteCourse,getSingleCourse,getAllCourse}