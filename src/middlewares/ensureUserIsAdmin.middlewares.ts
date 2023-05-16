import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"


const ensureUserIsAdminMiddlewares = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> =>{

    const  isadm: boolean  = res.locals.admin

    if(isadm ===  true){
        return next()
    }

    throw new AppError("Insufficient permission", 403)
            
}

export { ensureUserIsAdminMiddlewares }