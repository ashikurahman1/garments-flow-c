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
    img: 'https://i.pravatar.cc/100?img=11',
  },
  {
    name: 'Farhana Akter',
    role: 'Boutique Business',
    feedback:
      'Delivery was super fast, and the garments quality was amazing. I’ll definitely order again!',
    img: 'https://i.pravatar.cc/100?img=5',
  },
  {
    name: 'Mahmud Hasan',
    role: 'Online Seller',
    feedback:
      'Very smooth ordering process. Clear communication and excellent customer support. Highly recommended!',
    img: 'https://i.pravatar.cc/100?img=15',
  },
  {
    name: 'Sarah Johnson',
    role: 'Fashion Designer',
    feedback:
      'The attention to detail in the manufacturing process is impressive. My collection came out exactly as envisioned.',
    img: 'https://i.pravatar.cc/100?img=9',
  },
  {
    name: 'Michael Chen',
    role: 'Retail Manager',
    feedback:
      'We have been sourcing from them for 2 years now. Consistent quality and reliable delivery timelines.',
    img: 'https://i.pravatar.cc/100?img=8',
  },
];

const CustomerFeedback = () => {
  return (
    <section className="py-20 bg-muted/20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Clients Love Us"
          subtitle="Testimonials"
          center={true}
        />
        
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 px-4"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i} className="py-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card rounded-2xl overflow-hidden group">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full border-4 border-background shadow-md mb-6 relative z-10 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-muted-foreground italic leading-relaxed mb-6 flex-grow">
                      "{item.feedback}"
                    </p>

                    <div className="mt-auto">
                      <h3 className="text-lg font-bold text-foreground font-display">
                        {item.name}
                      </h3>
                      <p className="text-sm text-primary font-medium uppercase tracking-wide">
                        {item.role}
                      </p>
                    </div>
                  </CardContent>
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerFeedback;
