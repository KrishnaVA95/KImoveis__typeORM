import { Request, Response } from 'express'
import { createRealEstateService } from '../services/realEstate/createRealEstate.service'
import { TListRealEstateResponse, TRealEstateRequest, TRealEstateResponse } from '../interfaces/realEstate.interfaces'
import listRealEstateService from '../services/realEstate/listRealEstate.service'


const createRealEstateController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const realEstateData: TRealEstateRequest = req.body
    const newReaLEstate: TRealEstateResponse = await createRealEstateService(realEstateData)
    return res.status(201).json(newReaLEstate)
}

const listRealEstateController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const listRealEstate: TListRealEstateResponse = await listRealEstateService()
    return res.json(listRealEstate)
}

export {
    createRealEstateController,
    listRealEstateController
}