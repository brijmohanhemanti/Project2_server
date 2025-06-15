import { Request,Response } from "express";
import User from "../../../database/models/userModels";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

// logic halne code ya lekhne 
// 3 type baat use hunxa const ani function ani class 2 ota garxau hami

// const

// const registerUser = async (req:Request,res:Response)=>{
//     const {username, password,email}=req.body     // yo auta aiuta halda ni hunxa const username =req.body.username garerr
//     if(!username || !password || ! email ){
//         res.status(400).json({
//             massage:"please provide full info!!"
//         })
//     }else{
//         await User.create({
//             username,
//             password,
//             email
//         })               // yaha role halda ni hunxa but BOLA attack hunxa so n garne
//         response.status(201).json({
//             massage:"User registered!!"
//         })
//     }
// }

// export default registerUser  

// yo ab route banayer aap.ts ma import garne

//class bat garne ab

class AuthController {
    static async registerUser (req:Request,res:Response){
        if(req.body==undefined){                 //this is for undifined data lai 
            res.status(400).json({
                massage:"No data was sent!!"
            })
            return
        }
    const {username, password,email}=req.body
    if(!username || !password || ! email ){
        res.status(400).json({
            massage:"please provide full info!!"
        })
        return
    }
    await User.create({
        username,
        password: bcrypt.hashSync(password,12) ,
        email
    })

    res.status(201).json({
        massage:"User registered Sucessfully!!"
    })

    }

    static async loginUser (req:Request,res:Response){
        const {password,email}=req.body
        if(!email|| !password){
            res.status(400).json({
                massage:"please provide email ,Password!!"
            })
            return
        }

        const data = await User.findAll({
        where:{
            email
        }
        })
        if (data.length==0){
            res.status(404).json({
                massage:"Not Reconiged"
            })
        }else{
            const isPasswordMatch=bcrypt.compareSync(password,data[0].password)
            if(isPasswordMatch){
                //login bhayo bhane token generate garnee
                const token = jwt.sign({id:data[0].id},"thisisSecreate",{
                    expiresIn:"30d"
                })
                res.status(200).json({
                    token:token,
                    massage:"Login Sucessfully"
                })


            }else{
                res.status(403).json({
                    massage:"invaild password or username"
                })
            }
        }

 
    }
}

export default AuthController 