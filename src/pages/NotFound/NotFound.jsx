import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';

const NotFound = () => {
  const navigate = useNavigate();
  usePageTitle('Not Found');

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-amber-50">
      <h1 className="text-7xl font-extrabold text-amber-800">404</h1>

      <p className="mt-4 text-xl text-gray-700 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-8">
        <Button
          onClick={() => navigate('/')}
          className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-lg"
        >
          Go Back Home
        </Button>
      </div>

      <div className="mt-10 opacity-80">
        <svg
          width="220"
          height="160"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="150" cy="170" rx="120" ry="20" fill="#d6a76f" />
          <path
            d="M90 140 C60 110 60 70 100 60 C120 30 180 30 200 60 C240 70 240 110 210 140 Z"
            fill="#f2d4a6"
            stroke="#b27c47"
            strokeWidth="3"
          ></path>
          <circle cx="115" cy="90" r="10" fill="#000" />
          <circle cx="185" cy="90" r="10" fill="#000" />
          <path
            d="M130 120 C150 135 170 120"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
