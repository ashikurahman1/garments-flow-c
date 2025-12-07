import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../SectionTitle/SectionTitle';

const testimonials = [
  {
    name: 'Abdul Karim',
    role: 'Clothing Store Owner',
    feedback:
      'Their product quality is top-notch! The stitching, fabric, and finishing were far better than I expected.',
    img: 'https://i.pravatar.cc/100?img=1',
  },
  {
    name: 'Farhana Akter',
    role: 'Boutique Business',
    feedback:
      'Delivery was super fast, and the garments quality was amazing. I’ll definitely order again!',
    img: 'https://i.pravatar.cc/100?img=2',
  },
  {
    name: 'Mahmud Hasan',
    role: 'Online Seller',
    feedback:
      'Very smooth ordering process. Clear communication and excellent customer support. Highly recommended!',
    img: 'https://i.pravatar.cc/100?img=3',
  },
];

const CustomerFeedback = () => {
  return (
    <div className="bg-amber-gradient shadow">
      <section className="container mx-auto px-4 py-20 lg:py-30">
        <div className="mb-8 lg:mb-15">
          <SectionTitle
            title="Customer Feedback"
            subtitle={
              'Here’s what our customers say about our garments and service.'
            }
          />
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2800 }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <Card
                  className="
                  shadow-md hover:shadow-xl transition-all 
                  border border-amber-200 bg-white
                  rounded-2xl
                "
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded-full border-4 border-amber-200 shadow mb-4"
                    />

                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-amber-800 font-medium">
                      {item.role}
                    </p>

                    <p className="text-gray-600 mt-4 leading-relaxed">
                      “{item.feedback}”
                    </p>

                    <div className="w-16 h-1 bg-amber-800/80 rounded-full mt-5"></div>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default CustomerFeedback;
