import { Router } from 'express'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middlewares'
import { ensureUserIsAdminMiddlewares } from '../middlewares/ensureUserIsAdmin.middlewares'
import ensureTheCategoryHasAUniqueNameMiddleware from '../middlewares/ensureTheCategoryHasAUniqueName.middlewares'
import { createCategoriesController, listCategoriesController, listsAllPropertiesBelongToACategoryController } from '../controllers/categories.controllers'
import ensureCategoryExistsByIdMiddlewares from '../middlewares/ensureCategoriesExistsById.middlewares'

const categoriesRoutes: Router = Router()

categoriesRoutes.post('',
ensureTheCategoryHasAUniqueNameMiddleware,
ensureTokenIsValidMiddleware,
ensureUserIsAdminMiddlewares,
createCategoriesController
)

categoriesRoutes.get('',
listCategoriesController
)

categoriesRoutes.get('/:id/realEstate',
ensureCategoryExistsByIdMiddlewares,
listsAllPropertiesBelongToACategoryController
)

export default categoriesRoutes