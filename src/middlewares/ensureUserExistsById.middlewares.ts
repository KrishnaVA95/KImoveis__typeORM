import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities"


const ensureUserExistsByIdMiddlewares = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

    const userId: number = Number(req.params.id)
    const userRepository : Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.exist({where : {id: userId}})

    if(user === true){
        return next()
    }
    
    throw new AppError("User not found", 404)


}
export default ensureUserExistsByIdMiddlewares