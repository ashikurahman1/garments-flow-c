import React from 'react';
import WhyChooseUs from '../../components/Home/WhyChooseUs/WhyChooseUs';
import ManufacturingProcess from '../../components/Home/ManufacturingProcess/ManufacturingProcess';
import Hero from '../../components/Home/Hero/Hero';
import OurProducts from '../../components/Home/OurProducts/OurProducts';
import HowItWorks from '../../components/Home/HowItWorks/HowItWorks';

const HomePage = () => {
  return (
    <>
      <Hero />
      <OurProducts />
      <HowItWorks />
      <WhyChooseUs />
      <ManufacturingProcess />
    </>
  );
};

export default HomePage;
