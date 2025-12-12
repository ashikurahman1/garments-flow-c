import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get('trackingId');
  const axiosSecure = useAxiosSecure();

  // Fetch order details
  const { isLoading, data: order } = useQuery({
    queryKey: ['order', trackingId],
    queryFn: async () => {
      if (!trackingId) return null;
      const res = await axiosSecure.get(`/orders/track-by-id/${trackingId}`);
      return res.data.order;
    },
    enabled: !!trackingId,
  });

  const handlePayment = async () => {
    if (!order) return;
    const paymentInfo = {
      cost: order.orderPrice,
      orderId: order._id,
      buyerEmail: order.buyerEmail,
      productName: order.productName,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    window.location.href = res.data.url;
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  if (!order)
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Order not found
      </div>
    );
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Payment for {order.productName}
      </h2>
      <p className="mb-4">Order ID: {order._id}</p>
      <p className="mb-4">Tracking ID: {order.trackingId}</p>
      <p className="mb-4">Quantity: {order.quantity}</p>
      <p className="mb-4 font-semibold">Total Amount: ${order.orderPrice}</p>
      <button
        onClick={handlePayment}
        className="w-full bg-amber-800 hover:bg-amber-900 text-white py-2 px-4 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
