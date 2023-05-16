import { Router } from 'express'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middlewares'
import { ensureUserIsAdminMiddlewares } from '../middlewares/ensureUserIsAdmin.middlewares'
import { createRealEstateController, listRealEstateController } from '../controllers/realEstate.controllers'
import { realEstateSchemaRequest } from '../schemas/realEstate.schemas'
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middlewares'
import ensureAddressesAreUniqueMiddleware from '../middlewares/ensureAddressesAreUnique.middlewares'

const realEstateRoutes: Router = Router()

realEstateRoutes.post('',
ensureTokenIsValidMiddleware,
ensureUserIsAdminMiddlewares,
ensureDataIsValidMiddleware(realEstateSchemaRequest),
ensureAddressesAreUniqueMiddleware,
createRealEstateController
)

realEstateRoutes.get('',
listRealEstateController
)

export default realEstateRoutes