
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


class middelware{
    static isLoggedIn (req:Request,res:Response,next:NextFunction){  //cheack login or not & token accepct & Verifry
        const token = req.headers.authorization
        if(!token){
            res.status(401).json({
                massage:"please provide token!!"
            })
            return
        }
        jwt.verify(token,"thisisSecreate",(error,result)=>{
            if(error){
                res.status(403).json({
                    massage:"token Invalid!!"
                })
            }else{
                console.log(result)
            }
        })
        next()

    }
}

export default middelware