import { NextFunction, Request, Response } from "express"


const asyncErrorHandle = (fn:Function)=>{
   return (req:Request,res:Response,next:NextFunction)=>{
        fn(req,res,next).catch((err:Error)=>{
            console.log( "suru bhayo tero kam ab ",err, "ERROR")
            return res.status(500).json({
                message : err.message, 
                fullError : err
            })
        })
    }
}

export default asyncErrorHandle