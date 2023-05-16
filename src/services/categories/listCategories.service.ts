import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { TListCategoriesResponse } from '../../interfaces/categories.interfaces'
import { listCategoriesSchemaResponse } from '../../schemas/categories.schemas'


const listCategoriesService = async (): Promise<TListCategoriesResponse> => {
    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category[] = await categoriesRepository.find()

    const returnCategories: TListCategoriesResponse = listCategoriesSchemaResponse.parse(categories)

    return returnCategories
}

export default listCategoriesService