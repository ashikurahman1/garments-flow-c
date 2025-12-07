import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';

const RegisterPage = () => {
  usePageTitle('Register');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: null,
    role: 'buyer',
    password: '',
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData(prev => ({ ...prev, photo: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validatePassword = password => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return uppercase && lowercase && minLength;
  };

  const handleRegister = e => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      alert(
        'Password must have at least 6 characters, 1 uppercase letter, and 1 lowercase letter.'
      );
      return;
    }

    // Here you can handle the file upload (photo) along with other form data
    console.log(formData);

    // Dummy success (replace with actual API call)
    alert('Registration successful!');
    navigate('/login'); // redirect to login page
  };

  const handleGoogleRegister = () => {
    // Dummy Google login
    alert('Google register clicked!');
  };

  return (
    <div className="py-20 px-2 lg:py-30 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-5 lg:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <Label className="mb-2">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label className="mb-2">Photo</Label>
            <Input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label className="mb-2">Role</Label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="bg-amber-800 hover:opacity-90">
            Register
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
