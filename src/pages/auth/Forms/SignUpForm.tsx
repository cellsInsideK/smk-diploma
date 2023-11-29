import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/lib/validation';
import { Loader } from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

export const SignUpForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const newUser = createUser(values);

    if (!newUser) return toast({ title: 'Ошибка регистрации. Пожалуйста, попробуйте снова.' });

    const session = await signInAccount({ email: values.email, password: values.password });

    if (!session)
      return toast({
        title: 'Ошибка входа. Пожалуйста, попробуйте снова.',
        variant: 'destructive',
      });

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({ title: 'Произошла ошибка, попробуйте снова.' });
    }
  }

  return (
    <Form {...form}>
      <div className=" sm:w-420 flex-center flex-col">
        <h1 className=" text-3xl">ONLY SKUF</h1>
        <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-12 w-auto">Регистрация</h2>
        <p className=" text-light-3 small-medium md:base-regular mt-2 text-center">
          Для использования Only Skuf введите данные вашего аккаунта
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Псевдоним</FormLabel>
                <FormControl>
                  <Input placeholder="Ваш псевдоним" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ваша электронная почта" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ваш пароль"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className=" flex-center gap-4">
                Загрузка <Loader />
              </div>
            ) : (
              'Отправить'
            )}
          </Button>
          <p className=" text-small-regular text-light-2 text-center mt-2">
            Уже есть аккаунт?
            <Link to={'/sign-in'} className=" text-primary-500 text-small-semibold ml-1">
              Вход
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
