import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { TSchedulesRequest } from '../../interfaces/schedules.interfaces'
import { Schedule } from '../../entities'

export type TReturnSchedule = {
  message: string
}

const createSchedulesService = async (
    schedulesData: TSchedulesRequest
): Promise<TReturnSchedule> => {
     const schedulesRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    
    const currentScheldules: Schedule = schedulesRepository.create(schedulesData)

    await schedulesRepository.save(currentScheldules)
    
    const messageSchedeles  = { message: "Schedule created"}

    return messageSchedeles
}

export { createSchedulesService } 