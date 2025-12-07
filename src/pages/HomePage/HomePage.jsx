import React from 'react';
import WhyChooseUs from '../../components/Home/WhyChooseUs/WhyChooseUs';
import ManufacturingProcess from '../../components/Home/ManufacturingProcess/ManufacturingProcess';
import Hero from '../../components/Home/Hero/Hero';
import OurProducts from '../../components/Home/OurProducts/OurProducts';

const HomePage = () => {
  return (
    <>
      <Hero />
      <OurProducts />
      <WhyChooseUs />
      <ManufacturingProcess />
    </>
  );
};

export default HomePage;
