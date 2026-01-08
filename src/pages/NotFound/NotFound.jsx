import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';

const NotFound = () => {
  const navigate = useNavigate();
  usePageTitle('Not Found');

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>

      <h1 className="text-9xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary/50 to-secondary/50 blur-sm absolute select-none">404</h1>
      <h1 className="text-7xl font-display font-extrabold text-foreground relative z-10">404</h1>

      <p className="mt-4 text-xl text-muted-foreground max-w-md relative z-10">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-8 relative z-10">
        <Button
          onClick={() => navigate('/')}
          className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl shadow-lg shadow-primary/20"
        >
          Go Back Home
        </Button>
      </div>

      <div className="mt-16 opacity-80 relative z-10">
        <svg
          width="220"
          height="160"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Recolor SVG to match theme */}
          <ellipse cx="150" cy="170" rx="120" ry="20" fill="var(--muted)" /> 
          {/* Hanger Body */}
          <path
            d="M90 140 C60 110 60 70 100 60 C120 30 180 30 200 60 C240 70 240 110 210 140 Z"
            fill="var(--secondary)"
            stroke="var(--primary)"
            strokeWidth="3"
            fillOpacity="0.5"
          ></path>
          <circle cx="115" cy="90" r="10" fill="var(--foreground)" />
          <circle cx="185" cy="90" r="10" fill="var(--foreground)" />
          <path
            d="M130 120 C150 135 170 120"
            stroke="var(--foreground)"
            strokeWidth="4"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
