import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities"


const ensureEmailNotExistsMiddleware = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

    const userEmail = req.body.email
 
    if(userEmail === undefined){
        return  next()
    } 

    const userRepository : Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.exist({where : {email: userEmail}})


    if(user === true){
        throw new AppError("Email already exists", 409)
    }

    return next()

}
export default ensureEmailNotExistsMiddleware


