import React from 'react';
import { Link } from 'react-router';
import GarmentsFlow from '../../assets/Garments-Flow.png';
const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={GarmentsFlow}
        alt="Garments Flow Logo "
        className="w-8 lg:w-10"
      />
      <h2 className=" text-xl lg:text-2xl font-semibold text-amber-900 dark:text-amber-500">
        Garments Flow
      </h2>
    </Link>
  );
};

export default Logo;
