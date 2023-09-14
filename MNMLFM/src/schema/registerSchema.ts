import {z} from 'zod';
export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email('please enter valid email'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .regex(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
      'Password must contain at least one uppercase letter and one number',
    ),
});
