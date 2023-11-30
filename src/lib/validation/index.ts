import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(4, { message: 'Имя должно быть больше 4 символов' }),
  username: z.string().min(4, { message: 'Никнейм должен быть больше 4 символов' }),
  email: z.string().email({ message: 'Неверный email' }),
  password: z.string().min(8, { message: 'Длина пароля должна быть не менее 8 символов' }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: 'Неверный email' }),
  password: z.string().min(8, { message: 'Длина пароля должна быть не менее 8 символов' }),
});

export const postSchema = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(50),
  tags: z.string(),
});
