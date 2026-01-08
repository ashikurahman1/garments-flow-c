import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { IconCheck, IconTruckDelivery } from '@tabler/icons-react';

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="glass-card p-10 rounded-3xl max-w-md w-full text-center border-t-4 border-t-green-500 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-green-500/5 -z-10"></div>
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconCheck className="w-10 h-10 text-green-600 dark:text-green-400" stroke={3} />
        </div>
        
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground mb-8">Thank you for your purchase. Your order is being processed.</p>
        
        <div className="bg-muted/50 rounded-xl p-4 mb-8 text-left space-y-3">
             <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-xs font-semibold">{paymentInfo?.transactionId || 'Loading...'}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tracking Number</span>
                <span className="font-mono text-sm bg-background px-2 py-1 rounded border border-border">
                    {paymentInfo?.trackingId || '...'}
                </span>
             </div>
        </div>

        <Link
          to="/dashboard/my-orders"
          className="btn-premium w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <IconTruckDelivery size={20} />
          Go to My Orders
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
