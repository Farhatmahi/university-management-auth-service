import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { catchAsync } from '../../../shared/catchAsync';

import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });

    next();
  }
);

export const UserController = { createUser };
