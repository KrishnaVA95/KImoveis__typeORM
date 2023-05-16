import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'

import { User } from './user.entity'
import { RealEstate } from './realEstate.entity'

@Entity('schedules')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'date'})
    date: string | Date

    @Column({type: 'time' })
    hour: string | Date 

    @ManyToOne(()=> User, user => user.id)
    user:User

    @ManyToOne(()=> RealEstate, realEstate => realEstate.id)
    realEstate:RealEstate

}

export { Schedule }