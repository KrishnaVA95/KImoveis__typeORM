import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Address } from "../entities"


const ensureAddressesAreUniqueMiddleware = async (
    req: Request, 
    res:Response, 
    next: NextFunction
) =>{

   const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

   const city = req.body.address.city
   const state = req.body.address.state
   const number = req.body.address.number

    const exists = await addressRepository.exist({where:{city : city, state: state, number: number}})

    if (exists) {
        throw new AppError('Address already exists', 409)
    } else {
        return next()
    }


}
export default ensureAddressesAreUniqueMiddleware


