import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

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
      <div className="text-center py-20 text-red-600 font-semibold">
        Order not found
      </div>
    );

  return (
    <div className="max-w-xl mt-30 mx-auto p-6 bg-white dark:bg-white/10 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">
        Payment for {order.productName}
      </h2>
      <p className="mb-4">Order ID: {order._id}</p>
      <p className="mb-4">Tracking ID: {order.trackingId || 'N/A'}</p>
      <p className="mb-4">Quantity: {order.quantity || 1}</p>
      <p className="mb-4 font-semibold">
        Total Amount: ${order.orderPrice || 0}
      </p>
      <button
        onClick={handlePayment}
        className="w-full bg-amber-800 hover:bg-amber-900 text-white dark:text-black py-2 px-4 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
