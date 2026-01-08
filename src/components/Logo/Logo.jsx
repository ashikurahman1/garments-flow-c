import React from 'react';
import { Link } from 'react-router';
import { IconHanger } from '@tabler/icons-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
        <IconHanger className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12" stroke={2} />
      </div>
      <h2 className="text-2xl font-display font-bold text-gradient">
        GarmentFlow
      </h2>
    </Link>
  );
};

export default Logo;
