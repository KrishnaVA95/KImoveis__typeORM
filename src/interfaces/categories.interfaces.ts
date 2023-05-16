import { z } from 'zod'
import { categoriesSchemaRequest, categoriesSchema, listCategoriesSchemaResponse } from '../schemas/categories.schemas'

type TCategoriesResponse = z.infer<typeof categoriesSchema>
type TCategoriesRequest = z.infer<typeof categoriesSchemaRequest>
type TListCategoriesResponse = z.infer<typeof listCategoriesSchemaResponse>

type TlistPropertiesByCategory = {
    id: number;
    name: string;
    realEstate: {
        id: number;
        sold: boolean;
        value: number;
        size: number;
        createdAt?: string | null | undefined;
        updatedAt?: string | null | undefined;
    }[];
}

export {
    TCategoriesRequest,
    TCategoriesResponse,
    TListCategoriesResponse,
    TlistPropertiesByCategory
}