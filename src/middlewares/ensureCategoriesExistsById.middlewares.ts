import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Category } from "../entities"


const ensureCategoryExistsByIdMiddlewares = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

    const categoryId: number = Number(req.params.id)
    const categoryRepository : Repository<Category> = AppDataSource.getRepository(Category)

    const categoryExists = await categoryRepository.exist({where : {id: categoryId}})

    if(categoryExists === true){
        return next()
    }
    
    throw new AppError("Category not found", 404)


}
export default ensureCategoryExistsByIdMiddlewares