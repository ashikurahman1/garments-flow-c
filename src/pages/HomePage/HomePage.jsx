import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';

import Hero from '../../components/Home/Hero/Hero';
import TrustedBy from '../../components/Home/TrustedBy/TrustedBy';
import Categories from '../../components/Home/Categories/Categories';
import OurProducts from '../../components/Home/OurProducts/OurProducts';
import WhyChooseUs from '../../components/Home/WhyChooseUs/WhyChooseUs';
import Stats from '../../components/Home/Stats/Stats';
import HowItWorks from '../../components/Home/HowItWorks/HowItWorks';
import CustomerFeedback from '../../components/Home/CustomerFeedback/CustomerFeedback';
import FAQ from '../../components/Home/FAQ/FAQ';
import CTA from '../../components/Home/CTA/CTA';

const HomePage = () => {
  usePageTitle('Home');
  return (
    <>
      <Hero />
      <TrustedBy />
      <Categories />
      <OurProducts />
      <WhyChooseUs />
      <Stats />
      <HowItWorks />
      <CustomerFeedback />
      <FAQ />
      <CTA />
    </>
  );
};

export default HomePage;
