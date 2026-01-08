import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import usePageTitle from '../../hooks/usePageTitle';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { IconSearch, IconFilter } from '@tabler/icons-react';

const AllProducts = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  usePageTitle('All Products');

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, error } = useQuery({
    queryKey: ['allProducts', searchTerm, category, sort, page],
    queryFn: async () => {
      // Construct query parameters
      const params = new URLSearchParams({
        search: searchTerm,
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (category && category !== 'all') params.append('category', category);
      if (sort) params.append('sort', sort);

      const res = await axiosPublic.get(`/products?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center py-20 text-xl text-destructive font-semibold">
        Failed to load products. Please try again later.
      </div>
    );

  const totalPages = data?.totalPages || 1;

  return (
    <div className="bg-background min-h-screen py-20 lg:py-30">
      <div className="container mx-auto px-4">
        <SectionTitle title="Explore Collection" subtitle="Find Your Style" center={true} />

        {/* Filters & Search */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-10 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-1/3">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="pl-10 bg-background"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Select 
              value={category} 
              onValueChange={val => {
                setCategory(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <IconFilter size={16} />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Men">Men</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
                <SelectItem value="Kids">Kids</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={sort} 
              onValueChange={val => {
                setSort(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.products?.length > 0 ? (
            data.products.map((product, index) => (
              <motion.div
                key={product._id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button 
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="rounded-full bg-white text-black hover:bg-white/90"
                    >
                      View Details
                    </Button>
                  </div>
                  {product.availableQuantity < 20 && (
                     <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Low Stock</span>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1 font-display">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-foreground">${product.price}</span>
                    <span className="text-sm text-muted-foreground">Qty: {product.availableQuantity}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-muted-foreground mb-4">No products found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                  setSort('');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Button
                key={p}
                className={p === page ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}
                onClick={() => setPage(p)}
                variant={p === page ? "default" : "outline"}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
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
