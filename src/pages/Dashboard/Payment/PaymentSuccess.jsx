import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [transactionId, setTransactionId] = useState();
  const [paymentInfo, setPaymentInfo] = useState();

  const sessionId = searchParams.get('session_id');

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="py-20 space-y-6 lg:py-40 text-center container mx-auto px-4">
      <h2 className="text-4xl text-green-600">Payment successfully </h2>
      <p className="text-lg">
        Your transaction Id: {paymentInfo?.transactionId}
      </p>
      <p className="text-lg">Your Tracking Number: {paymentInfo?.trackingId}</p>
      <Link
        to="/dashboard/my-orders"
        className="py-2 px-6 font-semibold bg-amber-800 rounded-full text-lg text-white"
      >
        Go to My Order
      </Link>
    </div>
  );
};

export default PaymentSuccess;
