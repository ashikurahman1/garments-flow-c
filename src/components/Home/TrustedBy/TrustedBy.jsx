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
    icon: <IconAward size={40} stroke={1.5} />,
    title: 'Top Quality Fabric',
    desc: 'We use export-grade materials for long-lasting durability.',
  },
  {
    icon: <IconBuildingFactory size={40} stroke={1.5} />,
    title: 'Own Manufacturing',
    desc: 'Cutting, sewing & QC handled by our expert in-house team.',
  },
  {
    icon: <IconUsersGroup size={40} stroke={1.5} />,
    title: 'Bulk Order Friendly',
    desc: 'We support corporate uniforms, bulk orders & custom branding.',
  },
  {
    icon: <IconHeartHandshake size={40} stroke={1.5} />,
    title: 'Trusted by 200+ Clients',
    desc: 'Businesses across Bangladesh rely on us regularly.',
  },
];

const TrustedBy = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionTitle
        title="Why People Trust Us"
        subtitle="Our Dedication"
        center={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group p-8 rounded-2xl glass-card hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 border-transparent hover:border-primary/20"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 font-display text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustedBy;
