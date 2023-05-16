import { z } from 'zod'
import { userSchema, userSchemaRequest, userSchemaResponse, listUsersSchemaResponse } from '../schemas/users.schemas'
import { DeepPartial } from 'typeorm'

type TUserRequest = z.infer<typeof userSchemaRequest>
type TUser = z.infer<typeof userSchema>
type TUserResponse = z.infer<typeof userSchemaResponse >
type TListUsersResponse = z.infer<typeof listUsersSchemaResponse>
type TUserUpdateRequest = DeepPartial<TUserRequest>

export {
    TUserRequest,
    TUser,
    TUserResponse,
    TListUsersResponse,
    TUserUpdateRequest
}