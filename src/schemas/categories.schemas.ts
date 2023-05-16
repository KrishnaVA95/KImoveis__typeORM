import { z } from 'zod'

const categoriesSchema = z.object({
    id: z.number(),
    name: z.string().max(45)
})

const categoriesSchemaRequest = categoriesSchema.omit({
    id: true
})

const listCategoriesSchemaResponse = z.array(categoriesSchema)

export {
    categoriesSchema,
    categoriesSchemaRequest,
    listCategoriesSchemaResponse,
}

