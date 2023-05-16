import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"

const ensureSchedulingIsInBusinessHoursMiddlewares = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

    let currentHour = req.body.hour
    currentHour = currentHour.split(':')[0]
 
    if(currentHour >= 8 && currentHour < 18){
       return  next()
    }

    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)
}
export default ensureSchedulingIsInBusinessHoursMiddlewares


