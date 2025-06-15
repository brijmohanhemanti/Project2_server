import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInsituteNumber from "../../services/generateRandomNo";


class instituteController{
    static async createInstitute(req:Request,res:Response){
        const{instituteName,instituteEmail,instituteContract,instituteAddress}=req.body
        const instituteVatNo=req.body.instituteVatNo || null
        const institutePanNo=req.body.institutePanNo || null
        if(!instituteName || !instituteEmail || !instituteContract || !instituteAddress){
            res.status(400).json({
                massage:"please Provided Full Info!!!"
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

    await sequelize.query(`INSERT INTO institute_${instituteNumber}(
        instituteName,instituteEmail,instituteContract,instituteAddress,institutePanNo,institutevatNo) VALUES
        (?,?,?,?,?,?)`,{
            replacements:[instituteName,instituteEmail,instituteContract,instituteAddress,institutePanNo,instituteVatNo]
        })    
        res.status(200).json({
            massage:"institute Created Sucessfully!!!"
        })

    }


}

export default instituteController