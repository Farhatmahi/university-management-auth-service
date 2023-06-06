import { RequestHandler } from 'express'
import { UsersService } from './users.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UsersService.createUser(user)
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UsersController = { createUser }
