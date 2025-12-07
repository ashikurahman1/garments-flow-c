import React from 'react';
import { motion } from 'framer-motion';
import {
  IconAward,
  IconBuildingFactory,
  IconUsersGroup,
  IconHeartHandshake,
} from '@tabler/icons-react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const reasons = [
  {
    icon: <IconAward size={36} stroke={1.5} />,
    title: 'Top Quality Fabric',
    desc: 'We use export-grade materials for long-lasting durability.',
    color: 'bg-amber-100 border-amber-800',
  },
  {
    icon: <IconBuildingFactory size={36} stroke={1.5} />,
    title: 'Own Manufacturing',
    desc: 'Cutting, sewing & QC handled by our expert in-house team.',
    color: 'bg-emerald-100 border-emerald-600',
  },
  {
    icon: <IconUsersGroup size={36} stroke={1.5} />,
    title: 'Bulk Order Friendly',
    desc: 'We support corporate uniforms, bulk orders & custom branding.',
    color: 'bg-sky-100 border-sky-600',
  },
  {
    icon: <IconHeartHandshake size={36} stroke={1.5} />,
    title: 'Trusted by 200+ Clients',
    desc: 'Businesses across Bangladesh rely on us regularly.',
    color: 'bg-violet-100 border-violet-600',
  },
];

const TrustedBy = () => {
  return (
    <section className="container mx-auto px-4 py-20 lg:py-30">
      <div className="mb-8 lg:mb-15">
        <SectionTitle
          title="Why People Trust Us"
          subtitle={
            ' Our dedication to quality and service makes us stand out.'
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`
              p-6 rounded-xl shadow-md hover:shadow-xl transition 
              border-2 ${item.color}
            `}
          >
            <div className="text-amber-800 mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustedBy;
