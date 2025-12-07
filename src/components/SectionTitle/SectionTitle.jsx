import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-3xl lg:text-5xl font-semibold mb-5">{title}</h2>
      <p className="text-neutral-700">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
