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
    <section className="w-full relative group">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-[60vh] md:h-[70vh] shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 container mx-auto text-white"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-accent font-bold tracking-widest uppercase mb-4"
                >
                  Premium Quality
                </motion.span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 leading-tight max-w-4xl">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light">
                  {slide.desc}
                </p>

                <div className="flex gap-4">
                  <Link to="/all-products">
                    <Button
                      size="lg"
                      className="btn-premium h-12 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-full"
                    >
                      {slide.btn}
                    </Button>
                  </Link>
                  <Link to="/about-us">
                     <Button
                      size="lg"
                    variant='ghost'
                      className="btn-premium h-12 px-8 text-lg border-white hover:bg-white/20 hover:text-white rounded-full backdrop-blur-sm btn-outline"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex flex-col items-center text-white/70"
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
