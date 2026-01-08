import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SectionTitle from '../../SectionTitle/SectionTitle';
import { Button } from '@/components/ui/button';
import useFeaturedProducts from '../../../hooks/useFeaturedProducts';
import { Link, useNavigate } from 'react-router';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const OurProducts = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useFeaturedProducts();
  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Featured Products" subtitle="Top Picks" center={true} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col glass-card bg-white/50 dark:bg-black/50">
                <div className="relative overflow-hidden h-60">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => navigate(`/products/${product._id}`)}
                      variant="secondary"
                      className="rounded-full px-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Details
                    </Button>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    ${product.price}
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    {product.category || 'Collection'}
                  </div>
                  <CardTitle className="text-xl font-display line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-2 text-muted-foreground/80">
                    {product.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/all-products">
            <Button
              size="lg"
              className="btn-premium px-10 h-12 rounded-full text-lg shadow-xl shadow-primary/20"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
