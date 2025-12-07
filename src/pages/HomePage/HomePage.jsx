import React from 'react';
import WhyChooseUs from '../../components/Home/WhyChooseUs/WhyChooseUs';

import Hero from '../../components/Home/Hero/Hero';
import OurProducts from '../../components/Home/OurProducts/OurProducts';
import HowItWorks from '../../components/Home/HowItWorks/HowItWorks';
import CustomerFeedback from '../../components/Home/CustomerFeedback/CustomerFeedback';
import TrustedBy from '../../components/Home/TrustedBy/TrustedBy';

const HomePage = () => {
  return (
    <>
      <Hero />
      <OurProducts />
      <HowItWorks />
      <CustomerFeedback />
      <TrustedBy />
      <WhyChooseUs />
    </>
  );
};

export default HomePage;
