import { useMutation } from '@tanstack/react-query';
import { createUser, signInAccount } from '../appwrite/api';
import { NewUser } from '@/types';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUser(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInAccount(user),
  });
};
