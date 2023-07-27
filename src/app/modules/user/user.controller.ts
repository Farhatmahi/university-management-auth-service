import { Request, Response } from 'express';
import { UserService } from './user.service';
import { catchAsync } from '../../../shared/catchAsync';

import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = { createUser };
