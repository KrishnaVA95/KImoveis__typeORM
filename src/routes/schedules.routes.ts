import { Router } from 'express'
import { createSchedulesController, listSchedulesByImmobileController } from '../controllers/schedules.controllers'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middlewares'
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middlewares'
import { schedulesRoutesRequest } from '../schemas/schedules.schema'
import ensureSchedulingIsInBusinessHoursMiddlewares from '../middlewares/ensureSchedulingIsInBusinessHours.middlewares'
import ensureThatSchedulingIsOnOneBusinessDayMiddlewares from '../middlewares/ensureThatSchedulingIsOnOneBusinessDay.middlewares'
import ensureRealEstateExistsByIdMiddlewares from '../middlewares/ensureRealEstateExistsById.middlewares'
import ensureThatThereIsNoAppointmentOnThatDayAndTimeMiddlewares from '../middlewares/ensureThatThereIsNoAppointmentOnThatDayAndTime.middlewares'
import { ensureUserIsAdminMiddlewares } from '../middlewares/ensureUserIsAdmin.middlewares'

const schedulesRoutes: Router = Router()

schedulesRoutes.post('',
ensureTokenIsValidMiddleware,
ensureDataIsValidMiddleware(schedulesRoutesRequest),
ensureSchedulingIsInBusinessHoursMiddlewares,
ensureThatSchedulingIsOnOneBusinessDayMiddlewares,
ensureRealEstateExistsByIdMiddlewares,
ensureThatThereIsNoAppointmentOnThatDayAndTimeMiddlewares,
createSchedulesController)

schedulesRoutes.get('/realEstate/:id',
ensureTokenIsValidMiddleware,
ensureUserIsAdminMiddlewares,
ensureRealEstateExistsByIdMiddlewares,
listSchedulesByImmobileController
)

export default schedulesRoutes