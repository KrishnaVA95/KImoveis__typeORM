import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"

const ensureThatSchedulingIsOnOneBusinessDayMiddlewares = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

    let date: Date = new Date(req.body.date)
    if(date.getDay() === 6 || date.getDay() === 0){
        throw new AppError("Invalid date, work days are monday to friday", 400)
    }
    
    return  next()
}
export default ensureThatSchedulingIsOnOneBusinessDayMiddlewares


