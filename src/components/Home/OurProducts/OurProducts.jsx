import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SectionTitle from '../../SectionTitle/SectionTitle';
import { Button } from '@/components/ui/button';
import axios from 'axios';

import useFeaturedProducts from '../../../hooks/useFeaturedProducts';

import { Link, useNavigate } from 'react-router';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const OurProducts = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useFeaturedProducts();
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-amber-gradient shadow">
      <section className="container mx-auto px-4 py-20 lg:py-30">
        <div className="mb-8 lg:mb-15">
          <SectionTitle title="Our Products" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 mb-8">
          {products.map(product => (
            <Card key={product._id} className="overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>
                  {product.description?.slice(0, 60)}...
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-lg font-semibold">Price: ${product.price}</p>
              </CardContent>

              <div className="px-6 pb-6">
                <Button
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="w-full bg-amber-800 hover:bg-amber-900"
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link to="/all-products">
            <Button
              size="lg"
              className="bg-amber-800 hover:bg-amber-900 text-white "
            >
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurProducts;
