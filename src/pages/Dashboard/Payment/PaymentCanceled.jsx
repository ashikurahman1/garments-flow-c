import React from 'react';
import { Link } from 'react-router';

const PaymentCanceled = () => {
  return (
    <div>
      <h2>Payment Canceled </h2>
      <Link to="">
        <button className="btn btn-primary text-black">Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCanceled;
