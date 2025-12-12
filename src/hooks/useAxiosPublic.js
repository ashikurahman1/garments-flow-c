import axios from 'axios';
import React from 'react';

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000/api',
    // baseURL: 'https://garments-flow-server.vercel.app/api',
  });
  return axiosPublic;
};

export default useAxiosPublic;
