import { Route, Routes } from 'react-router-dom';
import { AuthLayout, SignInForm, SignUpForm } from './pages/auth';
import { Home } from './pages/Home';
import './globals.css';
import { Layout } from './pages/Layout';
import { Toaster } from './components/ui/toaster';

export const App = () => {
  return (
    <main className=" flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};
