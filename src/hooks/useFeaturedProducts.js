import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const res = await axios.get(
        'https://garments-flow-server.vercel.app/api/products/featured'
      );
      return res.data;
    },
  });
};

export default useFeaturedProducts;
