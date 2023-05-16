import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { TListRealEstateResponse } from '../../interfaces/realEstate.interfaces'
import { RealEstate } from '../../entities'
import { realEstateSchema } from '../../schemas/realEstate.schemas'



const listRealEstateService = async (): Promise<TListRealEstateResponse> => {
    
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEsates = await realEstateRepository.createQueryBuilder('realEsate')
        .leftJoinAndSelect('realEsate.address', 'address')
        .getMany()

    const response: TListRealEstateResponse = realEsates.map(realEstate => {
        realEstate.value = parseFloat(realEstate.value.toString())
        realEstate.createdAt = String(realEstate.createdAt)
        realEstate.updatedAt = String(realEstate.updatedAt)
        return realEstateSchema.omit({category:true}).parse(realEstate)
    })

    return response
}

export default listRealEstateService