import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import usePageTitle from '../../hooks/usePageTitle';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const AllProducts = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  usePageTitle('All Products');

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 8; // products per page

  const { data, isLoading, error } = useQuery({
    queryKey: ['allProducts', searchTerm, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?search=${searchTerm}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center py-20 text-xl text-red-600 font-semibold">
        Failed to load products.
      </div>
    );

  const totalPages = data?.totalPages || 1;

  return (
    <div className="bg-amber-gradient py-20 lg:py-30 px-4">
      <motion.h1
        className="text-4xl lg:text-5xl font-extrabold text-amber-900 dark:text-white text-center mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
      >
        All Products
      </motion.h1>

      {/* Search Input */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 rounded-lg border shadow focus:outline-none focus:ring focus:border-amber-500"
        />
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.products?.length > 0 ? (
            data.products.map((product, index) => (
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
                  className="bg-amber-800 text-white hover:bg-amber-800/90 mt-auto"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  View Details
                </Button>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-700">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Button
                key={p}
                className={p === page ? 'bg-amber-700 text-white' : ''}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              disabled={page === totalPages}
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
