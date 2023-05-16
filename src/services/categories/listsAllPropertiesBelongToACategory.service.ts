import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category, RealEstate } from '../../entities'
import { categorySchemaResponse } from '../../schemas/categoryResponse.schema';
import { TlistPropertiesByCategory } from '../../interfaces/categories.interfaces';



const listsAllPropertiesBelongToACategoryService = async (idCurrentCategory: number): Promise<TlistPropertiesByCategory> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const category = await categoryRepository.findOneBy({ id: idCurrentCategory });
    const realEstate = await realEstateRepository.findBy({ category: category! })
    const newRealEstates = realEstate.map(real => {
        real.value = parseFloat(real.value.toString());
        return real;
    })
    const response = categorySchemaResponse.parse({ ...category, realEstate: newRealEstates });
    return response;
}

export default listsAllPropertiesBelongToACategoryService


