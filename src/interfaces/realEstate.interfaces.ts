import { z } from 'zod'
import { listRealEstateSchema, realEstateSchema, realEstateSchemaRequest } from '../schemas/realEstate.schemas'

type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>
type TRealEstateResponse = z.infer<typeof realEstateSchema>
type TListRealEstateResponse = z.infer<typeof listRealEstateSchema>


export {
    TRealEstateRequest,
    TRealEstateResponse,
    TListRealEstateResponse
}