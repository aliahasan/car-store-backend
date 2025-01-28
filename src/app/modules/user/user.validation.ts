import { z } from 'zod';

const registerValidationSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
    })
    .min(3, { message: 'Name must be at least 3 characters' }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'Please enter a valid email address' }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old password is required',
  }),
  newPassword: z.string({ required_error: 'Password is required' }),
});

export const userValidations = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
};
