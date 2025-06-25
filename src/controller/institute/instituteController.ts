import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInsituteNumber from "../../services/generateRandomNo";
import { IExtendedRequest } from "../../middleWare/type";
import User from "../../database/models/userModels";


const createInstitute= async (req:IExtendedRequest,res:Response,next:NextFunction)=>{
    try {
        const{instituteName,instituteEmail,instituteContract,instituteAddress}=req.body
        const instituteVatNo=req.body.instituteVatNo || null
        const institutePanNo=req.body.institutePanNo || null
        if(!instituteName || !instituteEmail || !instituteContract || !instituteAddress){
            res.status(400).json({
                message: "Please provide full info!"
            })
            return
        }


    const instituteNumber = generateRandomInsituteNumber()    
     //raw query halne ab sabaii aayo bhane 
    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        instituteName VARCHAR(255) NOT NULL,
        instituteEmail VARCHAR(255) NOT NULL,
        instituteContract VARCHAR(255) NOT NULL,
        instituteAddress VARCHAR(255) NOT NULL,
        instituteVatNo VARCHAR(255),
        institutePanNo VARCHAR(255),
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

          //sabai aayo ab table ma halne
    await sequelize.query(`INSERT INTO institute_${instituteNumber}(
        instituteName,instituteEmail,instituteContract,instituteAddress,institutePanNo,instituteVatNo) VALUES
        (?,?,?,?,?,?)`,{
            replacements:[instituteName,instituteEmail,instituteContract,instituteAddress,institutePanNo,instituteVatNo]
        })

        await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            userId VARCHAR(255) REFERENCES users(id),
            instituteNumber INT UNIQUE
            )`)
            
            console.log(req.user)
            if(req.user){       //yaha haleko ho table ma 
            await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,{
                replacements:[req.user.id, instituteNumber]
            })

            await User.update({  //yo chaii instittue num liyeko ho basako ho dta ma
                currentInstituteNum : instituteNumber,
                role : "institute"
                },{
                where:{
                id : req.user.id
                }
            })
        }
        if(req.user){
              req.user.currentInstituteNumber = instituteNumber  
          }
        next()

        } catch (error) {
            console.log("suru", error,"sakiyo error")
        
    }

}

const createTeacherTable= async(req:IExtendedRequest,res:Response,next:NextFunction)=>{
    try {
        const instituteNumber= req.user?.currentInstituteNumber
        await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
               id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
              teacherName VARCHAR(255) NOT NULL, 
              teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
              teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
              teacherExpertise VARCHAR(255), 
              joinedDate DATE, 
              salary VARCHAR(100),
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
              updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
              )`)
        next()
    } catch (error) {
        console.log(error)
    }
}
const createStudentTable= async(req:IExtendedRequest,res:Response,next:NextFunction)=>{
   try {
     const instituteNumber= req.user?.currentInstituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
             id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            studentName VARCHAR(255) NOT NULL, 
            studentPhoneNo VARCHAR(255) NOT NULL UNIQUE, 
            studentAddress TEXT, 
            enrolledDate DATE, 
            studentImage VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
            )`)
    next()
   } catch (error) {
    console.log(error)
    
   }
}
const createCorseTable= async(req:IExtendedRequest,res:Response,next:NextFunction)=>{
    const instituteNumber= req.user?.currentInstituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseName VARCHAR(255) NOT NULL UNIQUE, 
        coursePrice VARCHAR(255) NOT NULL, 
        courseDuration VARCHAR(100) NOT NULL, 
        courseLevel ENUM('beginner','intermediate','advance') NOT NULL, 
        courseThumbnail VARCHAR(200),
        courseDescription TEXT, 
        categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber} (id), 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

        res.status(200).json({
            message : "Institute created sucessfully!!!", 
            instituteNumber, 
        })
}




export {createInstitute,createCorseTable,createStudentTable,createTeacherTable}