import { Repository } from 'typeorm'
import { TListUsersResponse } from '../../interfaces/user.interfaces'
import { User } from '../../entities/user.entity'
import { AppDataSource } from '../../data-source'
import { listUsersSchemaResponse } from '../../schemas/users.schemas'


const listUsersService = async (): Promise<TListUsersResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const users: User[] = await userRepository.find()
    const returnUsers: TListUsersResponse = listUsersSchemaResponse.parse(users)

    return returnUsers
}

export default listUsersService