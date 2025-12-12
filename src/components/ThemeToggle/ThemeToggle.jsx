import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="shadow-inner border-2 border-amber-700 text-amber-900 p-1 rounded-full"
    >
      {isDark ? (
        <IconSun className="w-6 h-6 animate-spin-slow" stroke={2} />
      ) : (
        <IconMoon className="w-6 h-6 animate-spin-slow" stroke={2} />
      )}
    </button>
  );
};

export default ThemeToggle;
