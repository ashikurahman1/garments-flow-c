import {
  IconClipboardCheck,
  IconTools,
  IconNeedleThread,
  IconPackage,
} from '@tabler/icons-react';

import { motion } from 'framer-motion';

const ManufacturingProcess = () => {
  const steps = [
    {
      icon: <IconClipboardCheck size={40} stroke={1.5} />,
      title: '1. Order Received',
      desc: 'We confirm the order and prepare the materials.',
      // borderColor: 'border-red-400',
    },
    {
      icon: <IconTools size={40} stroke={1.5} />,
      title: '2. Cutting & Sewing',
      desc: 'Expert workers craft each piece with precision.',
      // borderColor: 'border-blue-400',
    },
    {
      icon: <IconNeedleThread size={40} stroke={1.5} />,
      title: '3. Quality Check',
      desc: 'Every item passes strict quality inspection.',
      // borderColor: 'border-green-400',
    },
    {
      icon: <IconPackage size={40} stroke={1.5} />,
      title: '4. Packaging & Delivery',
      desc: 'Products are packed securely and delivered quickly.',
      // borderColor: 'border-purple-400',
    },
  ];

  return (
    <section className="bg-amber-50 py-20 lg:py-30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Manufacturing Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`
                bg-white border-2 shadow-md p-6 rounded-xl text-center 
                hover:shadow-xl hover:-translate-y-2 transition
                ${step.borderColor}
              `}
            >
              <div className="flex justify-center text-amber-900 mb-4">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProcess;
