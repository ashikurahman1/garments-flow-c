import {
  IconShieldCheck,
  IconTruckDelivery,
  IconCash,
} from '@tabler/icons-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <IconShieldCheck size={40} stroke={1.5} />,
      title: 'Premium Quality',
      desc: 'Every product is quality-checked to ensure durability and satisfaction.',
      // bg: 'bg-gradient-to-br from-amber-200 to-amber-400',
    },
    {
      icon: <IconTruckDelivery size={40} stroke={1.5} />,
      title: 'Fast Delivery',
      desc: 'We deliver your orders quickly anywhere in Bangladesh.',
      // bg: 'bg-gradient-to-br from-orange-200 to-orange-400',
    },
    {
      icon: <IconCash size={40} stroke={1.5} />,
      title: 'Affordable Pricing',
      desc: 'Get the best quality garments at the most competitive prices.',
      // bg: 'bg-gradient-to-br from-rose-200 to-rose-400',
    },
  ];

  return (
    <section className="container mx-auto py-20 lg:py-30 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-amber-900">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, i) => (
          <div
            key={i}
            className={`${item.bg} rounded-xl p-6 text-center shadow-md hover:shadow-xl transition border border-white/30`}
          >
            <div className="flex justify-center text-amber-900 mb-4 drop-shadow">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
