import { Request } from "express";



export interface IExtendedRequest extends Request{
       user?: {
       id : string,
       currentInstituteNum : string | number
       }
       // instituteNumber? : string | number
      
} 