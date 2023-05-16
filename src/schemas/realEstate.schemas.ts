import { z } from 'zod'
import { adressSchema, adressSchemaRequest } from './adress.schema'
import { categoriesSchema } from './categories.schemas'

const realEstateSchema = z.object({
    id: z.number(),
    value: z.number().default(0),
    size: z.number().positive("Number must be greater than 0"),
    address: adressSchema,
    category: categoriesSchema,
    sold: z.boolean().default(false),
    createdAt: z.string().nullish(),
    updatedAt: z.string().nullish(),
})
const realEstateSchemaRegister = z.object({
    id: z.number(),
    value: z.number().default(0).or(z.string()),
    size: z.number().positive("Number must be greater than 0"),
    address: adressSchemaRequest,
    categoryId: z.number(),
    sold: z.boolean().default(false),
    createdAt: z.string().nullish(),
    updatedAt: z.string().nullish(),
})

const listRealEstateSchema = z.array(realEstateSchema.omit({category: true}))

const realEstateSchemaRequest = realEstateSchemaRegister.omit({
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
})

const realEstatewithoutCategoryAndAddress = realEstateSchema.omit({
    address:true,
    category:true
});

export {
    realEstateSchema,
    realEstateSchemaRequest,
    listRealEstateSchema,
    realEstatewithoutCategoryAndAddress
}