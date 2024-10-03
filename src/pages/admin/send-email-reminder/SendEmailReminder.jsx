import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import moment from 'moment';

const SendReminderEmails = () => {
  const [customers, setCustomers] = useState([]);

  const sendEmail = (customer, daysLeft) => {
    emailjs
      .send(
        'service_ftfm6pi',
        'template_5133339',
        {
          to_name: customer.vehicle.user.fullname,
          user_email: customer.vehicle.user.email,
          expire_date: customer.expireDate,
          days_left: daysLeft,
          message: `Your insurance will expire in ${daysLeft} days on ${moment(customer.expireDate).format('LL')}.`,
        },
        'laGrWQghcmlQSS4rS'
      )
      .then((result) => {
        console.log(`Email sent to ${customer.vehicle.user.email}: ${result.text}`);
      })
      .catch((error) => {
        console.error(`Failed to send email to ${customer.vehicle.user.email}: ${error.text}`);
      });
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:7289/api/CustomerInsurances');
        const customersData = response.data;

        const today = moment();

        const reminders = customersData.filter((customer) => {
          const expireDate = moment(customer.expireDate);
          const daysLeft = expireDate.diff(today, 'days');
          return daysLeft >= 0 && daysLeft <= 7;
        });

        setCustomers(reminders);

        reminders.forEach((customer) => {
          const expireDate = moment(customer.expireDate);
          const daysLeft = expireDate.diff(today, 'days');
          sendEmail(customer, daysLeft);
        });
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Gửi Email Nhắc Nhở Gia Hạn Bảo Hiểm</h1>
      {customers.length > 0 ? (
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>
              Email sẽ được gửi đến: {customer.vehicle.user.fullname} - {customer.vehicle.user.email} - Hết hạn vào: {customer.expireDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có khách hàng nào cần nhắc nhở hôm nay.</p>
      )}
    </div>
  );
};

export default SendReminderEmails;
