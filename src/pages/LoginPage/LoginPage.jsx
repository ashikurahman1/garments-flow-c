import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useState } from 'react';
const LoginPage = () => {
  const navigate = useNavigate();
  usePageTitle('Login');

  const { googleLogin, signInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  // Email/Password Login
  const handleLogin = async data => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonColor: '#92400E',
      });

      navigate('/dashboard');
    } catch (err) {
      Swal.fire({
        title: 'Login Failed',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#92400E',
      });
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'buyer',
      };

      await axiosSecure.post('/users', userInfo);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text:
          error.response?.data?.message || error.message || 'Please try again.',
        title: 'Login Failed',
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-2 lg:py-30 flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-xl p-5 lg:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              {...register('email')}
            />
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              {...register('password')}
            />
          </div>

          <Button type="submit" className="bg-amber-800 hover:opacity-90">
            Login
          </Button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 hover:text-amber-900"
        >
          <IconBrandGoogle size={20} /> Continue with Google
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-amber-800 font-semibold cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
