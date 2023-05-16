import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Category } from "../entities"


const ensureTheCategoryHasAUniqueNameMiddleware = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

    const categoryName = req.body.name
 
    const userRepository : Repository<Category> = AppDataSource.getRepository(Category)

    const category = await userRepository.exist({where : {name: categoryName}})


    if(category === true){
        throw new AppError("Category already exists", 409)
    }

    return next()

}
export default ensureTheCategoryHasAUniqueNameMiddleware


