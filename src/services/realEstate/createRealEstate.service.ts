import { DeepPartial, Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Address, Category, RealEstate } from "../../entities"
import { TRealEstateRequest, TRealEstateResponse } from "../../interfaces/realEstate.interfaces"
import { realEstateSchema } from "../../schemas/realEstate.schemas"
import { adressSchemaRequest } from "../../schemas/adress.schema"



const createRealEstateService = async (payload: TRealEstateRequest): Promise<TRealEstateResponse> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const adressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const address = adressSchemaRequest.parse(payload.address)

    const createAddress = adressRepository.create( { ...address })

    const newAddress = await adressRepository.save(createAddress)


    const category = await categoryRepository.findOneBy({ id: payload.categoryId })
    const realEstate: TRealEstateRequest = {
        address: newAddress,
        size: payload.size,
        value: payload.value,
        categoryId: payload.categoryId
    }

    const createRealEstate = realEstateRepository.create({ ...realEstate })

    const newRealEstate = await realEstateRepository.save(createRealEstate)

    
    newRealEstate.value = parseFloat(newRealEstate.value.toString())

    newRealEstate.createdAt = newRealEstate.createdAt.toString()
    newRealEstate.updatedAt = newRealEstate.updatedAt.toString()
    
    const response: TRealEstateResponse = realEstateSchema.parse({ ...newRealEstate, category: category })


    return response

}

export { createRealEstateService } 