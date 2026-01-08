import React, { useState } from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';

const faqs = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer: "Our standard MOQ starts at 500 units per style per color. However, for startup brands, we offer a flexible pilot program with lower MOQs. Please contact us for details."
  },
  {
    question: "Do you provide custom design services?",
    answer: "Yes, our in-house design team can assist you with tech packs, pattern making, and prototyping to bring your vision to life before bulk production."
  },
  {
    question: "What are your standard lead times?",
    answer: "Sample development typically takes 2-3 weeks. Bulk production lead time is generally 45-60 days after sample approval, depending on order volume and fabric availability."
  },
  {
    question: "Do you ship internationally?",
    answer: "Absolutely. We have partnerships with major logistics providers to ensure secure and timely delivery to any destination worldwide, handling all customs documentation."
  },
  {
    question: "How do you ensure product quality?",
    answer: "We follow a 4-tier quality control process (inline, end-line, pre-final, and final inspection) adhering to AQL 2.5 standards to ensure premium quality output."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle title="Frequently Asked Questions" subtitle="Common Queries" center={true} />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-border rounded-2xl overflow-hidden bg-card/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-muted/50 transition-colors"
                aria-expanded={activeIndex === index}
              >
                <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconChevronDown className="text-muted-foreground" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
