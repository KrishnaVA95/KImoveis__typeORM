import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { AppError } from "../error"


const ensureUserIsAdminOrHimselfMiddlewares = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> =>{
    const  isadm: boolean  = res.locals.admin

    if(isadm ===  true){
        return next()
    }

    let token: string  = req.headers.authorization!

    token = token.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
    const idUserToken  = decoded.sub
    res.locals.idUserToken = idUserToken

    const idUserToBeUpdate = req.params.id

    if(idUserToken === idUserToBeUpdate){
        return next()
    }


    throw new AppError("Insufficient permission", 403)        
}

export { ensureUserIsAdminOrHimselfMiddlewares }