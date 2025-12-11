import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import slider1 from '../../../assets/slider/slider1.jpg';
import slider2 from '../../../assets/slider/slider2.jpg';
import { Link } from 'react-router';
const Hero = () => {
  const slides = [
    {
      title: 'Premium Garments Manufacturing',
      desc: 'High-quality clothing crafted with precision and care.',
      img: slider1,
      btn: 'View Products',
    },
    {
      title: 'Bulk Orders for Brands & Companies',
      desc: 'We provide large-scale production with consistent quality.',
      img: slider2,
      btn: 'Book Production',
    },
  ];

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay]}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-[400px] md:h-[650px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-8">
                  {slide.desc}
                </p>

                <Link to="/all-products">
                  <Button
                    size="lg"
                    className="bg-amber-800 hover:bg-amber-900 text-white "
                  >
                    {slide.btn}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
