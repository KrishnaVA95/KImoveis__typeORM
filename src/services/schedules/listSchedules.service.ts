import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { TScheduleResponseObj } from "../../interfaces/schedules.interfaces";

const listAllSchedulesForAPropertyService = async (realEstateId: number): Promise<TScheduleResponseObj> => {
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const schedules = await scheduleRepository.createQueryBuilder('schedules')
        .leftJoinAndSelect('schedules.user', 'user')
        .innerJoin('schedules.realEstate', 'realEstate')
        .where('realEstate.id = :realID', { realID: realEstateId })
        .getMany();

    const realEstate = await realEstateRepository.createQueryBuilder('realEstate')
        .innerJoinAndSelect('realEstate.category','category')
        .innerJoinAndSelect('realEstate.address','address')
        .where('realEstate.id = :realID', { realID: realEstateId })
        .getOne();


    const responseObject = {
        ...realEstate,
        schedules: schedules
    }

    return responseObject;
}

export { listAllSchedulesForAPropertyService } 