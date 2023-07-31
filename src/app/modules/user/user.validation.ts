import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),

      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }),

      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'Blood Group is required',
      }),
    }),
  }),
});

export const UserValidation = { createUserZodSchema };
