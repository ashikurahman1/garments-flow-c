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
    <div className=" ">
      {/* Hero Section */}
      <motion.section
        className="bg-amber-gradient py-20 lg:py-30 px-4 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
          About Garments Flow
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Garments Flow is committed to providing high-quality garments with
          fast delivery and affordable pricing. We prioritize customer
          satisfaction and strive to innovate continuously.
        </p>
        <Link to="/all-products">
          <Button className="bg-amber-800 hover:opacity-90">
            View Products
          </Button>
        </Link>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-20 px-4 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <motion.div variants={fadeUp}>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            To provide premium quality garments that combine style, comfort, and
            affordability. We aim to make every customer feel valued and
            satisfied.
          </p>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Vision</h2>
          <p className="text-gray-700">
            To be the most trusted and innovative garments brand in Bangladesh,
            known for reliability, quality, and outstanding customer service.
          </p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <img
            src="https://images.unsplash.com/photo-1581091012184-89a6b1de8dfc?auto=format&fit=crop&w=800&q=80"
            alt="Mission Vision"
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-amber-100 rounded-xl p-6 shadow hover:shadow-lg transition transform hover:scale-105"
              variants={fadeUp}
            >
              <div className="flex justify-center text-amber-900 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-20 px-4 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition transform hover:scale-105"
              variants={fadeUp}
            >
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
