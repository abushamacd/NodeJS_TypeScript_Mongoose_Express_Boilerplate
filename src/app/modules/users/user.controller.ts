import { Request, Response } from 'express'
import { createUserService } from './user.services'
import { sendRes } from '../../../utilities/sendRes'
import { tryCatch } from '../../../utilities/tryCatch'
import status from 'http-status'

export const createUser = tryCatch(async (req: Request, res: Response) => {
  const result = await createUserService(req.body)
  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'Create users successfully',
    data: result,
  })
})
