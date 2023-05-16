import { z } from 'zod'

const adressSchema = z.object({
    id: z.number(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
})

const adressSchemaRequest = adressSchema.omit({ id: true,})

export {
    adressSchema,
    adressSchemaRequest
}