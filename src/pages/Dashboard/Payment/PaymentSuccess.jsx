import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  // const [transactionId, setTransactionId] = useState();
  const [paymentInfo, setPaymentInfo] = useState();

  const sessionId = searchParams.get('session_id');
  console.log(sessionId);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2>Payment successfully </h2>
      <p>Your transaction Id: {paymentInfo?.transactionId}</p>
      <p>Your Tracking Number: {paymentInfo?.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
