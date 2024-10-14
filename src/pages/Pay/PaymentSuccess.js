import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const txnRef = queryParams.get('vnp_TxnRef');
    const responseCode = queryParams.get('vnp_ResponseCode');
    const orderInfo = queryParams.get('vnp_OrderInfo');

    axios.get(`https://localhost:7289/api/insurances/payment-success?vnp_TxnRef=${txnRef}&vnp_ResponseCode=${responseCode}&vnp_OrderInfo=${encodeURIComponent(orderInfo)}`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Error verifying payment. Please try again later.');
        console.error('Error verifying payment:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
};

export default PaymentSuccess;
