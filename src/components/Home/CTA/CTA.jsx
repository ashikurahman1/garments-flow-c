import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden flex items-center justify-center">
      {/* Background with parallax-like effect (fixed bg) or gradient */}
      <div className="absolute inset-0 bg-primary/95 dark:bg-primary/20 z-0">
         <div className="absolute inset-0 premium-grid-bg opacity-10"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-display">
            Ready to Start Your Production?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
            Partner with us for world-class manufacturing standards, timely delivery, and competitive pricing. Let's bring your designs to reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg bg-white text-primary hover:bg-white/90 font-bold rounded-full shadow-2xl">
                Get a Quote
              </Button>
            </Link>
            <Link to="/all-products">
               <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg border-white text-white hover:bg-white/10 rounded-full">
                Explore Products
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
