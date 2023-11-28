import { Outlet, Navigate } from 'react-router-dom';

export const AuthLayout = () => {
  const isAuth = false;

  if (isAuth) return <Navigate to={'/'} />;

  return (
    <>
      <section className=" flex flex-1 justify-center items-center flex-col py-10 px-4">
        <Outlet />
      </section>
      <img
        src="/assets/images/skuf.png"
        alt="logo"
        className=" hidden xl:block h-screen w-1/2 object-fit bg-no-repeat"
      />
    </>
  );
};
