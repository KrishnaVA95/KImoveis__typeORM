import { Request, Response } from 'express'
import { TCategoriesRequest, TCategoriesResponse, TListCategoriesResponse, TlistPropertiesByCategory } from "../interfaces/categories.interfaces"
import { createCategoriesService } from '../services/categories/createCategories.service'
import listCategoriesService from '../services/categories/listCategories.service'
import listsAllPropertiesBelongToACategoryService from '../services/categories/listsAllPropertiesBelongToACategory.service'

const createCategoriesController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const categoriesData: TCategoriesRequest = req.body
    const newCategories: TCategoriesResponse = await createCategoriesService(categoriesData)
    return res.status(201).json(newCategories)
}

const listCategoriesController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const listCategories: TListCategoriesResponse = await listCategoriesService()
    return res.json(listCategories)
}

const listsAllPropertiesBelongToACategoryController = async(
    req: Request,
    res: Response
): Promise<Response> =>{
    const id: number = parseInt(req.params.id)
    const listPropertiesByCategory: TlistPropertiesByCategory = await listsAllPropertiesBelongToACategoryService(id)
    return res.json(listPropertiesByCategory)
}

export {
    createCategoriesController,
    listCategoriesController,
    listsAllPropertiesBelongToACategoryController
}