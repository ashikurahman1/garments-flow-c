import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Happy Clients', value: '500+', desc: 'Worldwide Trust' },
  { label: 'Projects Completed', value: '1200+', desc: 'Delivered on Time' },
  { label: 'Years Experience', value: '15+', desc: 'Industry Expertise' },
  { label: 'Team Members', value: '80+', desc: 'Dedicated Professionals' },
];

const Stats = () => {
  return (
    <section className="py-20 bg-premium-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Our Impact" subtitle="Growth & Trust" center={true} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-8 rounded-2xl text-center group hover:bg-white/60 dark:hover:bg-black/40 transition-all duration-300"
            >
              <h3 className="text-4xl lg:text-5xl font-extrabold text-primary mb-2 font-display group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </h3>
              <p className="text-lg font-bold text-foreground mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none premium-grid-bg mask-radial-faded"></div>
    </section>
  );
};

export default Stats;
