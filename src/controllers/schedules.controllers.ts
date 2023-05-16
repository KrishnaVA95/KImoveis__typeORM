import { Request, Response } from 'express'
import { TScheduleResponseObj, TSchedulesRequest } from '../interfaces/schedules.interfaces'
import { TReturnSchedule, createSchedulesService } from '../services/schedules/createSchedules.service'
import { listAllSchedulesForAPropertyService } from '../services/schedules/listSchedules.service'


const createSchedulesController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const schedulesData: TSchedulesRequest = req.body
    const newSchedulesData = {
        ...schedulesData,
        userId: Number(res.locals.userId)
    }
    const newSchedules: TReturnSchedule = await createSchedulesService(newSchedulesData)
    return res.status(201).json(newSchedules)
}


const listSchedulesByImmobileController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const realEstateId: number = Number(req.params.id)
    const schedules: TScheduleResponseObj = await listAllSchedulesForAPropertyService(realEstateId)
    return res.status(200).json(schedules)
}


export {
    createSchedulesController,
    listSchedulesByImmobileController
}