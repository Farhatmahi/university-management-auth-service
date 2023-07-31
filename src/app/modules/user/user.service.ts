import mongoose from 'mongoose';
import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import httpStatus from 'http-status';
import { Student } from '../student/student.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //set default password if password is not provided
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  //set role as student
  user.role = 'student';

  let newUserAllData = null;

  //will find the academicSemester to generate Student ID
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  //starting session for transaciton-rollback
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //generate student id;
    const id = await generateStudentId(academicSemester);

    //assigning the student id into the user and student model, so that it can be used to find the student as it's referring to the user model.
    user.id = id;
    student.id = id;

    //creating new student
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student _id into user.student
    user.student = newStudent[0]._id;

    //creating user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(400, 'Failed to create user');
    }

    //setting the data to the user
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = { createStudent };
