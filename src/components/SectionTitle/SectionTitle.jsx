import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary"
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold"
      >
        {title}<span className="text-primary">.</span>
      </motion.h2>
      <div className={`mt-4 h-1.5 w-24 bg-primary/20 rounded-full overflow-hidden ${center ? 'mx-auto' : ''}`}>
        <motion.div 
          initial={{ x: '-100%' }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-full w-12 bg-primary rounded-full"
        />
      </div>
    </div>
  );
};

export default SectionTitle;

