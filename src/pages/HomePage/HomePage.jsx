import React from 'react';
import WhyChooseUs from '../../components/Home/WhyChooseUs/WhyChooseUs';
import ManufacturingProcess from '../../components/Home/ManufacturingProcess/ManufacturingProcess';
import Hero from '../../components/Home/Hero/Hero';

const HomePage = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ManufacturingProcess />
    </>
  );
};

export default HomePage;
