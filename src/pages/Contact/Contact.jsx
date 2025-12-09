import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import usePageTitle from '../../hooks/usePageTitle';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
  };

  // Container for staggered animation
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };
  usePageTitle('Contact');
  return (
    <motion.section
      className="bg-amber-gradient  py-20 lg:py-30 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* Hero / Header */}
      <motion.div className="text-center mb-16" variants={fadeUp}>
        <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Have questions, suggestions, or need support? Fill out the form below
          and we'll get back to you shortly.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
        variants={container}
      >
        {['name', 'email', 'message'].map((field, i) => (
          <motion.div key={i} variants={fadeUp}>
            <Label className="mb-2 capitalize" htmlFor={field}>
              {field === 'message' ? 'Message' : field}
            </Label>
            {field === 'message' ? (
              <Textarea
                id={field}
                name={field}
                placeholder="Write your message"
                rows={5}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ) : (
              <Input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            )}
          </motion.div>
        ))}
        <motion.div variants={fadeUp}>
          <Button
            type="submit"
            className="bg-amber-800 hover:opacity-90 w-full"
          >
            Send Message
          </Button>
        </motion.div>
      </motion.form>

      {/* Contact Info */}
      <motion.div
        className="mt-16 max-w-3xl mx-auto text-center"
        variants={fadeUp}
      >
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-2">Email: support@garmentsflow.com</p>
        <p className="text-gray-700 mb-2">Phone: +880 1845 6840900</p>
        <p className="text-gray-700">
          Address: 123 Main Street, Dhaka, Bangladesh
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
