import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import usePageTitle from '../../hooks/usePageTitle';
import { IconMail, IconPhone, IconMapPin, IconSend } from '@tabler/icons-react';

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
      className="bg-background min-h-screen py-20 lg:py-30 px-4 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

      {/* Hero / Header */}
      <motion.div className="text-center mb-16" variants={fadeUp}>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
          Contact Us
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions, suggestions, or need support? Fill out the form below
          and we'll get back to you shortly.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-2xl flex flex-col gap-6 shadow-2xl"
        onSubmit={handleSubmit}
        variants={container}
      >
        {['name', 'email', 'message'].map((field, i) => (
          <motion.div key={i} variants={fadeUp}>
            <Label className="mb-2 capitalize text-foreground font-medium" htmlFor={field}>
              {field === 'message' ? 'Message' : field}
            </Label>
            {field === 'message' ? (
              <Textarea
                id={field}
                name={field}
                placeholder="Write your message..."
                rows={5}
                value={formData[field]}
                onChange={handleChange}
                required
                className="bg-background/50 border-border focus:ring-primary backdrop-blur-sm"
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
                className="bg-background/50 border-border focus:ring-primary backdrop-blur-sm shadow-sm h-12"
              />
            )}
          </motion.div>
        ))}
        <motion.div variants={fadeUp}>
          <Button
            type="submit"
            className="btn-premium w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold shadow-lg shadow-primary/25"
          >
            <IconSend size={20} className="mr-2" />
            Send Message
          </Button>
        </motion.div>
      </motion.form>

      {/* Contact Info */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={fadeUp}
      >
        <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
           <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <IconMail size={24} />
           </div>
           <div>
               <h3 className="font-bold text-foreground">Email</h3>
               <p className="text-muted-foreground text-sm">support@garmentflow.com</p>
           </div>
        </div>

        <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
           <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary-foreground">
              <IconPhone size={24} />
           </div>
           <div>
               <h3 className="font-bold text-foreground">Phone</h3>
               <p className="text-muted-foreground text-sm">+880 1845 6840900</p>
           </div>
        </div>

        <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
           <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <IconMapPin size={24} />
           </div>
           <div>
               <h3 className="font-bold text-foreground">Address</h3>
               <p className="text-muted-foreground text-sm">123 Main Street, Dhaka, Bangladesh</p>
           </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
