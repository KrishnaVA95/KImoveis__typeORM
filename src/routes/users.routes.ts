import { Router } from 'express'
import { 
    createUsersController, 
    deleteUsersController, 
    listUsersController, 
    updateUsersController 
} from '../controllers/users.controllers'
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middlewares'
import { userSchemaRequest, userSchemaUpdateRequest } from '../schemas/users.schemas'
import ensureEmailNotExistsMiddleware from '../middlewares/ensureEmailNotExists.middlewares'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middlewares'
import { ensureUserIsAdminMiddlewares } from '../middlewares/ensureUserIsAdmin.middlewares'
import { ensureUserIsAdminOrHimselfMiddlewares } from '../middlewares/ensureUserIsAdminOrHimself.middlewares'
import ensureUserExistsByIdMiddlewares from '../middlewares/ensureUserExistsById.middlewares'

const userRoutes: Router = Router()

userRoutes.post('', 
ensureEmailNotExistsMiddleware,
ensureDataIsValidMiddleware(userSchemaRequest),
createUsersController)

userRoutes.get('', 
ensureTokenIsValidMiddleware,
ensureUserIsAdminMiddlewares,
listUsersController
)

userRoutes.patch('/:id',
ensureUserExistsByIdMiddlewares,
ensureEmailNotExistsMiddleware,
ensureTokenIsValidMiddleware,
ensureUserIsAdminOrHimselfMiddlewares,
ensureDataIsValidMiddleware(userSchemaUpdateRequest),
updateUsersController
)

userRoutes.delete('/:id', 
ensureUserExistsByIdMiddlewares,
ensureTokenIsValidMiddleware,
ensureUserIsAdminMiddlewares,
deleteUsersController)

export default userRoutes

