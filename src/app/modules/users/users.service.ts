import config from '../../../config'
import { ApiError } from '../../../errors/ApiError'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental ID
  const id = await generateUserId()
  user.id = id

  //default password if password is not provided
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }

  return createdUser
}

export const UsersService = { createUser }
