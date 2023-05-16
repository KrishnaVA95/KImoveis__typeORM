import { z } from 'zod'
import { realEstatewithoutCategoryAndAddress } from './realEstate.schemas'


const categorySchemaResponse = z.object({
    id: z.number(),
    name: z.string().max(45),
    realEstate: realEstatewithoutCategoryAndAddress.array()
})

export {
    categorySchemaResponse
}