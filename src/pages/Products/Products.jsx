import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllProducts = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  usePageTitle('All Products');

  // Fetch all products from backend
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products');
      return res.data;
    },
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-xl text-red-600 font-semibold">
        Failed to load products.
      </div>
    );

  return (
    <div className="bg-amber-gradient py-20 lg:py-30 px-4">
      <motion.h1
        className="text-4xl lg:text-5xl font-extrabold text-amber-900 text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
      >
        All Products
      </motion.h1>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8">
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
                  src={product.images?.[0]}
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
                    Available: {product.availableQuantity}
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
