import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20 px-2 lg:py-30 flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-xl p-5 lg:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="flex flex-col gap-4">
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              // value={email}
              // onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              // value={password}
              // onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="bg-amber-800 hover:opacity-90">
            Login
          </Button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <Button
          // onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 hover:text-amber-900"
        >
          <IconBrandGoogle size={20} /> Login with Google
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
