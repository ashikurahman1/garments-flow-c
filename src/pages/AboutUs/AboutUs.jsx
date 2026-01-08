import React from 'react';
import { Button } from '@/components/ui/button';
import { IconUsers, IconAward, IconBuildingFactory } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';

const AboutUs = () => {
  const team = [
    { name: 'John Doe', role: 'CEO' },
    { name: 'Jane Smith', role: 'Marketing Head' },
    { name: 'Alex Johnson', role: 'Lead Developer' },
  ];

  const stats = [
    {
      icon: <IconUsers size={40} stroke={1.5} />,
      value: '500+',
      label: 'Happy Customers',
    },
    {
      icon: <IconAward size={40} stroke={1.5} />,
      value: '20+',
      label: 'Awards Won',
    },
    {
      icon: <IconBuildingFactory size={40} stroke={1.5} />,
      value: '10+',
      label: 'Years in Business',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };
  usePageTitle('About us');
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="py-20 lg:py-30 px-4 text-center relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
          About GarmentFlow
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          GarmentFlow is committed to providing high-quality garments with
          fast delivery and affordable pricing. We prioritize customer
          satisfaction and strive to innovate continuously.
        </p>
        <Link to="/all-products">
          <Button className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg shadow-xl shadow-primary/20">
            View Products
          </Button>
        </Link>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-20 px-4 container mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
         <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="glass-card p-10 rounded-2xl border-t-4 border-t-primary">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                To provide premium quality garments that combine style, comfort, and
                affordability. We aim to make every customer feel valued and
                satisfied.
                </p>
            </div>
            <div className="glass-card p-10 rounded-2xl border-t-4 border-t-secondary">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                To be the most trusted and innovative garments brand in Bangladesh,
                known for reliability, quality, and outstanding customer service.
                </p>
            </div>
         </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-8 hover:bg-card/80 transition-all duration-300 border border-white/10"
              variants={fadeUp}
            >
              <div className="flex justify-center text-primary mb-4 p-4 bg-primary/10 rounded-full w-20 h-20 items-center mx-auto">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-display font-bold mb-2 text-foreground">
                {stat.value}
              </h3>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-20 px-4 container mx-auto mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gradient mb-4">
            Meet Our Team
            </h2>
            <p className="text-muted-foreground">The creative minds behind our success</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
              variants={fadeUp}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold uppercase shadow-lg">
                  {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
