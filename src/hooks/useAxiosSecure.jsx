import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://garments-flow-server.vercel.app/api',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, userLogout } = useAuth();

  useEffect(() => {
    // Intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // Interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          userLogout().then(() => {
            navigate('/login');
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.request.eject(resInterceptor);
    };
  }, [navigate, user?.accessToken, userLogout]);
  return axiosSecure;
};

export default useAxiosSecure;
