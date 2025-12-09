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

  const handleRegister = data => {
    setLoading(true);

    // Password validation
    const password = data.password;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: 'Weak Password!',
        text: 'Password must contain: Uppercase, Lowercase, and at least 6 characters.',
        icon: 'warning',
        confirmButtonColor: '#92400E',
      });
      setLoading(false);
      return;
    }

    // store the image data in a variable
    const profileImage = data.image[0];

    // firebase registration method
    registerUser(data.email, data.password)
      .then(result => {
        console.log(result);
        // store the variable in a formData with key name
        const formData = new FormData();
        formData.append('image', profileImage);

        // store the api url in a var
        const IMGBBAPI_URL = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.VITE_IMGBB_API
        }`;
        // post method for store image in IMGBB
        axios.post(IMGBBAPI_URL, formData).then(res => {
          // When store image in IMGBB again create a post method to store data in Database
          const photoURL = res.data.data.url;
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL,
            role: data.role,
          };
          axiosSecure.post('/users', userInfo).then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                title: 'Registration Successful!',
                text: 'Your account has been created.',
                icon: 'success',
                confirmButtonColor: '#92400E',
              });
            }
          });

          // update the users in firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              setLoading(false);
              navigate('/dashboard');
            })
            .catch(err => {
              setLoading(false);
              Swal.fire({
                title: 'Profile Update Failed',
                text: "We couldn't update your profile image.",
                icon: 'error',
                confirmButtonColor: '#92400E',
              });
            });
        });
      })
      .catch(err => {
        setLoading(false);
        Swal.fire({
          title: 'Registration Failed',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#92400E',
        });
      });
  };

  const handleGoogleRegister = () => {
    googleLogin()
      .then(async result => {
        const user = result.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'buyer',
        };

        try {
          const res = await axiosSecure.post('/users', userInfo);

          Swal.fire({
            title: 'Login Successful!',
            text: 'You are now logged in.',
            icon: 'success',
            confirmButtonColor: '#92400E',
          }).then(() => {
            navigate('/dashboard');
          });
        } catch (err) {
          Swal.fire({
            title: 'Something went wrong',
            text: err.response?.data?.message || 'Please try again.',
            icon: 'error',
            confirmButtonColor: '#92400E',
          });
        }
      })
      .catch(err => {
        Swal.fire({
          title: 'Google Login Failed',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#92400E',
        });
      });
  };

  return (
    <div className="py-20 px-2 lg:py-30 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-5 lg:p-10 w-full max-w-md">
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
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 hover:text-amber-900"
        >
          <IconBrandGoogle size={20} /> Register with Google
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
