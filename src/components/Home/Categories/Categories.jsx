import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import { motion } from 'framer-motion';

// Using placeholder images or generic categories
const categories = [
  { id: 1, name: 'Men\'s Fashion', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Women\'s Wear', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Kid\'s Collection', image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Sportswear', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800&auto=format&fit=crop' },
];

const Categories = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionTitle title="Browse Categories" subtitle="Our Specialties" center={true} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg h-80 cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white font-display mb-2">{cat.name}</h3>
                <span className="inline-block text-sm text-white/80 border-b border-white/50 pb-0.5 group-hover:text-white group-hover:border-white transition-colors">
                  Explore Collection
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
