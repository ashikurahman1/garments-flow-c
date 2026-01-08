import { motion } from 'framer-motion';
import { ShieldCheck, Clock, BadgeCheck, Truck } from 'lucide-react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Top Tier Quality',
    desc: 'Every product goes through sophisticated quality checks before delivery.',
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: 'On-Time Delivery',
    desc: 'We follow strict production timelines so you always get work on time.',
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-primary" />,
    title: 'Expert Craftsmanship',
    desc: 'Skilled workers and supervisors ensure perfect craftsmanship.',
  },
  {
    icon: <Truck className="w-10 h-10 text-primary" />,
    title: 'Global Shipping',
    desc: 'Secure packaging and quick shipment to your doorstep worldwide.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <SectionTitle title="Why Choose Us" subtitle="Our Promise" center={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">
                {f.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
