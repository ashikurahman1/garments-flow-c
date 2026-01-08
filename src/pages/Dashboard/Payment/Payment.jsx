import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get('trackingId');
  const axiosSecure = useAxiosSecure();

  // Fetch order details
  const { isLoading, data: order } = useQuery({
    queryKey: ['order', trackingId],
    queryFn: async () => {
      if (!trackingId) return null;
      const res = await axiosSecure.get(`/orders/my-order/${trackingId}`);
      return res.data.order;
    },
    enabled: !!trackingId,
  });

  const handlePayment = async () => {
    if (!order) return;

    // Prepare payment data
    const paymentInfo = {
      cost: order.orderPrice || 0,
      trackingId: order.trackingId || '',
      orderId: order._id,
      buyerEmail: order.buyerEmail,
      productName: order.productName,
    };

    try {
      const res = await axiosSecure.post(
        '/create-checkout-session',
        paymentInfo
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!order)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center p-8 glass-card rounded-xl border-destructive/50 text-destructive font-semibold">
           Order not found
        </div>
      </div>
    );

  return (
    <div className="flex justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full glass-card p-8 rounded-2xl border border-white/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
        
        <h2 className="text-3xl font-display font-bold mb-6 text-gradient">
          Order Summary
        </h2>
        
        <div className="space-y-4 mb-8">
            <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Product Name</span>
                <span className="font-semibold text-right">{order.productName}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Tracking ID</span>
                <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{order.trackingId || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono text-xs text-muted-foreground truncate max-w-[150px]">{order._id}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-semibold">{order.quantity || 1}</span>
            </div>
            <div className="flex justify-between py-4 items-center">
                <span className="text-lg font-bold text-foreground">Total Amount</span>
                <span className="text-3xl font-bold text-primary">${order.orderPrice || 0}</span>
            </div>
        </div>

        <button
          onClick={handlePayment}
          className="btn-premium w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/25"
        >
          Pay Now
        </button>
      </motion.div>
    </div>
  );
};

export default Payment;
