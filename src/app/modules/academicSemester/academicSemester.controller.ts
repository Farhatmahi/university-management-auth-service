import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import { catchAsync } from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import sendResponse from '../../../shared/sendResponse';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    paginationOptions
  );

  // console.log(result.meta);

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = { createSemester, getAllSemesters };
