import { z } from 'zod'
import { schedulesRoutesRequest, schedulesSchema } from '../schemas/schedules.schema'
import { Address, Category, Schedule } from '../entities'

type TSchedules = z.infer<typeof schedulesSchema>
type TSchedulesRequest = z.infer<typeof  schedulesRoutesRequest>

type TScheduleResponseObj = {
    schedules: Schedule[];
    id?: number;
    sold?: boolean;
    value?: string | number;
    size?: number;
    createdAt?: string;
    updatedAt?: string;
    address?: Address;
    category?: Category;
}

export {
    TSchedules,
    TSchedulesRequest,
    TScheduleResponseObj
}