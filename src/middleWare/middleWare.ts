
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userModels";
import { IExtendedRequest } from "./type";


class middelware{
    static async isLoggedIn (req:IExtendedRequest,res:Response,next:NextFunction){  //cheack login or not & token accepct & Verifry
        try {
            const token = req.headers.authorization
        if(!token){             // yadi token xain vane
            res.status(401).json({
                massage:"please provide token!!"
            })
            return
        }

        //yadi token xa bhane
        jwt.verify(token,"thisisSecreate",async (error,result:any)=>{        
            if(error){           //token mistake xa bhane
                res.status(403).json({
                    massage:"token Invalid!!" 
                })
            }else{         //token right bhayo bahne tyo id ko manxe xa xiin herne
                const userData = await User.findByPk(result.id)
            
                if(!userData){
                    res.status(403).json({
                    message : "No user with that id, invalid token "
                })
                }else{
                    req.user = userData
                    next()
                }

            }
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export default middelware