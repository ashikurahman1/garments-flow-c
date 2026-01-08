import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  IconShoppingCart,
  IconPackage,
  IconCheckupList,
  IconTruckDelivery,
} from '@tabler/icons-react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const defaultSteps = [
  {
    id: 1,
    title: 'Select Product',
    desc: 'Browse our comprehensive catalog and choose items that match your brand.',
    icon: <IconShoppingCart size={32} stroke={1.5} />,
  },
  {
    id: 2,
    title: 'Custom Details',
    desc: 'Specify your requirements, quantities, and any customization needs.',
    icon: <IconCheckupList size={32} stroke={1.5} />,
  },
  {
    id: 3,
    title: 'Production & QC',
    desc: 'Our expert team manufactures and rigorously checks every single item.',
    icon: <IconPackage size={32} stroke={1.5} />,
  },
  {
    id: 4,
    title: 'Global Delivery',
    desc: 'Your order is securely packed and shipped to your location worldwide.',
    icon: <IconTruckDelivery size={32} stroke={1.5} />,
  },
];

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HowItWorks = ({ steps = defaultSteps }) => {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionTitle
        title="How It Works"
        subtitle="Simple Process"
        center={true}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {steps.map((step, index) => (
          <motion.div key={step.id} variants={cardVariant} className="relative">
            {/* Connecting Line (hidden on mobile and last item) */}
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border -z-10" />
            )}
            
            <div className="flex flex-col items-center text-center group">
              <div
                className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center text-muted-foreground shadow-lg mb-6 group-hover:border-primary group-hover:text-primary transition-all duration-300 relative z-10"
              >
                {step.icon}
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold border-2 border-background">
                  {step.id}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 font-display">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
