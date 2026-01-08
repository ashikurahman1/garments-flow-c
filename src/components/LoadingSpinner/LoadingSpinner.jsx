import React from 'react';

const LoadingSpinner = ({ fullScreen = false, text = 'Loading...' }) => {
  return (
    <div className={`flex min-h-screen flex-col items-center justify-center bg-background`}>
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      {text && <p className="mt-3 text-primary font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
