import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { RealEstate } from "../entities"


const ensureRealEstateExistsByIdMiddlewares = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

    const realEstateId: number = Number(req.body.realEstateId) || Number(req.params.id)
    const realEstateRepository : Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstate = await realEstateRepository.exist({where : {id: realEstateId}})

    if(realEstate === true){
        return next()
    }
    
    throw new AppError("RealEstate not found", 404)


}
export default ensureRealEstateExistsByIdMiddlewares