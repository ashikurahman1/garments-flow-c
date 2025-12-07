// components/HowItWorks.jsx
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
    title: 'Choose Product',
    desc: 'Browse catalog and pick the product you like.',
    icon: <IconShoppingCart size={28} stroke={1.5} />,
    color: 'border-amber-700/80 bg-amber-50',
  },
  {
    id: 2,
    title: 'Place Order',
    desc: 'Fill order details and select payment method.',
    icon: <IconCheckupList size={28} stroke={1.5} />,
    color: 'border-emerald-500/80 bg-emerald-50',
  },
  {
    id: 3,
    title: 'Quality Check',
    desc: 'We inspect and prepare your item for shipment.',
    icon: <IconPackage size={28} stroke={1.5} />,
    color: 'border-sky-500/80 bg-sky-50',
  },
  {
    id: 4,
    title: 'Fast Delivery',
    desc: 'Delivered quickly and safely to your doorstep.',
    icon: <IconTruckDelivery size={28} stroke={1.5} />,
    color: 'border-violet-500/80 bg-violet-50',
  },
];

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const HowItWorks = ({ steps = defaultSteps }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <SectionTitle
          title="How It Works"
          subtitle={
            'Simple steps to get your product — transparent process, trusted quality.'
          }
        />
        <h2 className="text-3xl md:text-4xl font-extrabold"></h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto"></p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {steps.map(step => (
          <motion.div key={step.id} variants={cardVariant}>
            <Card
              className={`
                group relative overflow-hidden
                border-2 ${step.color} 
                hover:-translate-y-2 hover:shadow-2xl
                transition-transform duration-300
              `}
            >
              <CardContent className="p-6 flex flex-col items-start gap-4 bg-white/80">
                <div
                  aria-hidden
                  className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    text-amber-900 bg-white shadow-sm ring-1 ring-inset ring-amber-100
                    transition-all duration-300 group-hover:scale-105
                  `}
                >
                  {step.icon}
                </div>

                <CardTitle className="text-lg font-semibold">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {step.desc}
                </CardDescription>

                <span
                  className="mt-4 inline-flex items-center text-sm font-medium text-amber-800
                  group-hover:underline"
                >
                  Learn more →
                </span>

                {/* decorative accent line that animates on hover */}
                <span
                  className={`
                    absolute left-0 bottom-0 h-1 w-0 group-hover:w-full transition-all duration-400
                    ${step.color.includes('amber') ? 'bg-amber-700' : ''}
                    ${step.color.includes('emerald') ? 'bg-emerald-500' : ''}
                    ${step.color.includes('sky') ? 'bg-sky-500' : ''}
                    ${step.color.includes('violet') ? 'bg-violet-500' : ''}
                  `}
                  aria-hidden
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
