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
import { motion } from 'framer-motion';
const LoginPage = () => {
  const navigate = useNavigate();
  usePageTitle('Login');

  const { googleLogin, signInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  // Email/Password Login
  const handleLogin = async data => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonColor: '#4f46e5', // primary color
      });

      navigate('/dashboard');
    } catch (err) {
      Swal.fire({
        title: 'Login Failed',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#4f46e5',
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
    <div className="py-20 px-4 lg:py-30 min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        <h2 className="text-3xl font-display font-bold text-center mb-8 text-gradient">Login</h2>

        <div className="flex gap-2 justify-center mb-6">
            <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                onClick={() => {
                    setValue('email', 'admin@demo.com');
                    setValue('password', 'Bangladesh@71');
                }}
                className="text-xs border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
                Admin Credentials
            </Button>
            <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                onClick={() => {
                    setValue('email', 'manager@demo.com');
                    setValue('password', 'Bangladesh@71');
                }}
                 className="text-xs border-secondary/20 hover:bg-secondary/10 hover:text-secondary"
            >
                Manager Credentials
            </Button>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-6"
        >
          <div className="space-y-2">
            <Label className="font-medium text-foreground">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              {...register('email')}
              className="bg-background/50 border-input focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-foreground">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              {...register('password')}
               className="bg-background/50 border-input focus:ring-primary"
            />
          </div>

          <Button type="submit" className="btn-premium bg-primary text-primary-foreground w-full h-12 text-lg shadow-lg shadow-primary/20">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="my-6 relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-border"></div>
            <span className="relative bg-card px-4 text-xs uppercase text-muted-foreground font-medium z-10">Or continue with</span>
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-3 border-border hover:bg-muted/50 transition-colors"
        >
          <IconBrandGoogle size={20} /> <span className="font-medium">Google</span>
        </Button>

        <p className="mt-8 text-center text-muted-foreground text-sm">
          Don't have an account?{' '}
          <button
            className="text-primary font-bold hover:underline"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
