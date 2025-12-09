import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import usePageTitle from '../../hooks/usePageTitle';

const AllProducts = () => {
  const navigate = useNavigate();
  usePageTitle('All Products');
  // Static array of products
  const products = [
    {
      _id: '1',
      name: 'Classic T-Shirt',
      category: 'Tops',
      price: 25,
      quantity: 50,
      image:
        'https://images.unsplash.com/photo-1523381214311-56c6b1f38c12?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '2',
      name: 'Denim Jeans',
      category: 'Bottoms',
      price: 45,
      quantity: 30,
      image:
        'https://images.unsplash.com/photo-1562158070-2f6ec4e0c73b?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '3',
      name: 'Leather Jacket',
      category: 'Outerwear',
      price: 120,
      quantity: 10,
      image:
        'https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '4',
      name: 'Sneakers',
      category: 'Footwear',
      price: 60,
      quantity: 25,
      image:
        'https://images.unsplash.com/photo-1618354699304-4b10c1b9f3d0?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '5',
      name: 'Summer Dress',
      category: 'Dresses',
      price: 35,
      quantity: 40,
      image:
        'https://images.unsplash.com/photo-1520974737003-b3a8c18fa379?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '6',
      name: 'Hoodie',
      category: 'Sweatshirts',
      price: 40,
      quantity: 20,
      image:
        'https://images.unsplash.com/photo-1618354699304-4b10c1b9f3d0?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className=" bg-amber-gradient py-20 lg:py-30 px-4">
      <motion.h1
        className="text-4xl lg:text-5xl font-extrabold text-amber-900 text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
      >
        All Products
      </motion.h1>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product._id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    Category: {product.category}
                  </p>
                  <p className="text-gray-600 mb-1">Price: ${product.price}</p>
                  <p className="text-gray-600 mb-4">
                    Available: {product.quantity}
                  </p>
                </div>
                <Button
                  className="bg-amber-800 hover:opacity-90 mt-auto"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  View Details
                </Button>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-700">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
