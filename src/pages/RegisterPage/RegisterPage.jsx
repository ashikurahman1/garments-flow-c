import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  usePageTitle('Register');
  const { registerUser, updateUserProfile, googleLogin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleRegister = async data => {
    setLoading(true);

    try {
      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(data.password)) {
        Swal.fire({
          title: 'Weak Password!',
          text: 'Password must contain: Uppercase, Lowercase, and at least 6 characters.',
          icon: 'warning',
          confirmButtonColor: '#4f46e5',
        });
        return;
      }

      // Firebase Registration
      const result = await registerUser(data.email, data.password);
      console.log('Firebase User:', result);

      // Upload Image to IMGBB (Keep existing logic)
      const profileImage = data.image[0];
      const formData = new FormData();
      formData.append('image', profileImage);

      const IMGBBAPI_URL = `https://api.imgbb.com/1/upload?&key=${
        import.meta.env.VITE_IMGBB_API
      }`;
      const imgRes = await axios.post(IMGBBAPI_URL, formData);
      const photoURL = imgRes.data.data.url;

      // Save user in backend
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        role: data.role,
      };
      const dbRes = await axiosSecure.post('/users', userInfo);

      if (dbRes.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Please Login',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });

      // Navigate to login
      navigate('/login');
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Registration Failed',
        text:
          err.response?.data?.message || err.message || 'Something went wrong!',
        icon: 'error',
        confirmButtonColor: '#4f46e5',
      });
    } finally {
      // stop loading
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    googleLogin()
      .then(async result => {
        const user = result.user;
        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'buyer',
        };
        try {
          const res = await axiosSecure.post('/users', userInfo);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Successful!',

            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard');
        } catch (error) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: error.response?.data?.message || 'Please try again.',
            title: 'Something went wrong ',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          text: error.response?.data?.message || 'Please try again.',
          title: 'Registration Failed',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="py-20 px-4 lg:py-30 min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>
      
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="glass-card shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        <h2 className="text-3xl font-display font-bold text-center mb-8 text-gradient">Register</h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-6"
        >
          <div className="space-y-2">
            <Label className="font-medium text-foreground">Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              required
              {...register('name')}
              className="bg-background/50 border-input font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-foreground">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              required
              {...register('email')}
              className="bg-background/50 border-input font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-foreground">Photo</Label>
            <Input
              type="file"
              accept="image/*"
              required
              {...register('image')}
              className="bg-background/50 border-input cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-foreground">Role</Label>
            <select
              name="role"
              className="w-full border border-input rounded-md p-2 bg-background/50 focus:ring-primary focus:border-primary transition-all text-sm font-medium"
              {...register('role')}
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-foreground">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              required
              {...register('password')}
               className="bg-background/50 border-input"
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="btn-premium bg-primary text-primary-foreground w-full h-12 text-lg shadow-lg shadow-primary/20 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} /> Processing
              </>
            ) : (
              'Register'
            )}
          </Button>
        </form>

        <div className="my-6 relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-border"></div>
            <span className="relative bg-card px-4 text-xs uppercase text-muted-foreground font-medium z-10">Or continue with</span>
        </div>

        <Button
          onClick={handleGoogleRegister}
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-3 border-border hover:bg-muted/50 transition-colors"
        >
          <IconBrandGoogle size={20} /> <span className="font-medium">Google</span>
        </Button>

        <p className="mt-8 text-center text-muted-foreground text-sm">
          Already have an account?{' '}
          <button
            className="text-primary font-bold hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
