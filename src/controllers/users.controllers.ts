import { Request, Response } from 'express'
import { TListUsersResponse, TUserRequest, TUserResponse, TUserUpdateRequest } from '../interfaces/user.interfaces'
import { createUsersService } from '../services/users/createUsers.service'
import listUsersService from '../services/users/listUsers.service'
import updateUsersService from '../services/users/updateUsers.service'
import deleteUsersService from '../services/users/deleteUsers.service'


const createUsersController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: TUserRequest = req.body
    const newUser: TUserResponse = await createUsersService(userData)
    return res.status(201).json(newUser)
}

const listUsersController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const users: TListUsersResponse = await listUsersService()
    return res.json(users)
}


const updateUsersController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userData: TUserUpdateRequest = req.body
    const userId: number = parseInt(req.params.id)
    const newUserData: TUserResponse = await updateUsersService(userData, userId)
    return res.json(newUserData)
}

const deleteUsersController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    await deleteUsersService(userId)
    return res.status(204).send()
}



export { 
    createUsersController,
    listUsersController,
    updateUsersController,
    deleteUsersController
}