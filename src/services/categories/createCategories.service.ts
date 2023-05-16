import { Category } from '../../entities'
import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { TCategoriesRequest, TCategoriesResponse } from '../../interfaces/categories.interfaces'
import { categoriesSchema } from '../../schemas/categories.schemas'


const createCategoriesService = async (
    categoriesData: TCategoriesRequest
): Promise<TCategoriesResponse> => {
    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category = categoriesRepository.create(categoriesData)
    await categoriesRepository.save(categories)


    const returnCategori: TCategoriesResponse  = categoriesSchema.parse(categories)
    return returnCategori
}

export { createCategoriesService } 