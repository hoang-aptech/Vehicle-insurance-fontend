import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InsuranceList = () => {
  const [insurances, setInsurances] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7289/api/insurances')
      .then(response => {
        setInsurances(response.data);
      })
      .catch(error => {
        console.error('Error fetching insurance records:', error);
      });
  }, []);

  const handlePay = (insurancePackageId) => {
    axios.get(`https://localhost:7289/api/insurances/pay/${insurancePackageId}`)
      .then(response => {
        const { paymentUrl } = response.data;
        window.location.href = paymentUrl;
      })
      .catch(error => {
        console.error('Error initiating payment:', error);
      });
  };

  return (
    <div>
      <h1>Insurance List</h1>
      <ul>
        {insurances.map(insurance => (
          <li key={insurance.insurancePackageId}>
            {insurance.name} - {insurance.price} VND
            <button onClick={() => handlePay(insurance.insurancePackageId)}>Pay</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsuranceList;
