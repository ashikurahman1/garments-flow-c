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
          confirmButtonColor: '#92400E',
        });
        return;
      }

      // Firebase Registration
      const result = await registerUser(data.email, data.password);
      console.log('Firebase User:', result);

      // Upload Image to IMGBB
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
        confirmButtonColor: '#92400E',
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
        console.log(user);

        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'buyer',
        };
        console.log(userInfo);
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
    <div className="py-20 px-2 lg:py-30 flex items-center justify-center">
      <div className="bg-white dark:bg-black/90 shadow-lg rounded-xl p-5 lg:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label className="mb-2">Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              required
              {...register('name')}
            />
          </div>

          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              required
              {...register('email')}
            />
          </div>

          <div>
            <Label className="mb-2">Photo</Label>
            <Input
              type="file"
              accept="image/*"
              required
              {...register('image')}
            />
          </div>

          <div>
            <Label className="mb-2">Role</Label>
            <select
              name="role"
              className="w-full border rounded-md p-2"
              {...register('role')}
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              required
              {...register('password')}
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="bg-amber-800 hover:opacity-90"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Processing
              </>
            ) : (
              'Register'
            )}
          </Button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <Button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 hover:text-amber-900 dark:text-amber-500"
        >
          <IconBrandGoogle size={20} /> Continue with Google
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="text-amber-800 font-semibold cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
