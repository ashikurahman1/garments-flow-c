import { motion } from 'framer-motion';
import { ShieldCheck, Clock, BadgeCheck, Truck } from 'lucide-react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-amber-800" />,
    title: 'Premium Quality',
    desc: 'Every product goes through multiple quality checks before delivery.',
  },
  {
    icon: <Clock className="w-10 h-10 text-amber-800" />,
    title: 'On-Time Delivery',
    desc: 'We follow strict production timelines so you always get work on time.',
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-amber-800" />,
    title: 'Trusted Experts',
    desc: 'Skilled workers and supervisors ensure perfect craftsmanship.',
  },
  {
    icon: <Truck className="w-10 h-10 text-amber-800" />,
    title: 'Fast Shipping',
    desc: 'Secure packaging and quick shipment to your doorstep.',
  },
];

export default function WhyChooseUs() {
  return (
    <div className="bg-amber-gradient shadow">
      <section className="py-20 lg:py-30 ">
        <div className="container mx-auto px-4">
          <div className="mb-8 lg:mb-15">
            <SectionTitle title="Why Choose Us" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-amber-800"
              >
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-center text-amber-900">
                  {f.title}
                </h3>
                <p className="text-gray-600 mt-2 text-center">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
