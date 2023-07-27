import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental ID
  const academicSemester = {
    code: '01',
    year: '2025',
  };
  const id = await generateStudentId(academicSemester);
  // const id = await generateFacultyId()
  user.id = id;

  //default password if password is not provided
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }

  return createdUser;
};

export const UserService = { createUser };
