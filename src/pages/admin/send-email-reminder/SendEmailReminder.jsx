import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import moment from 'moment';

const SendReminderEmails = () => {
  const [billings, setBillings] = useState([]);

  const sendEmail = (billing, daysLeft) => {
    emailjs
      .send(
        'service_ftfm6pi',
        'template_5133339',
        {
          to_name: billing.vehicle.user.fullname,
          to_email: billing.vehicle.user.email,
          expire_date: billing.expireDate,
          days_left: daysLeft,
          message: `Your insurance will expire in ${daysLeft} days on ${moment(billing.expireDate).format('LL')}.`,
        },
        'laGrWQghcmlQSS4rS'
      )
      .then((result) => {
        console.log(`Email sent to ${billing.vehicle.user.email}: ${result.text}`);
      })
      .catch((error) => {
        console.error(`Failed to send email to ${billing.vehicle.user.email}: ${error.text}`);
      });
  };

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const response = await axios.get('https://localhost:7289/api/Billings');
        const billingsData = response.data;

        const today = moment();

        const reminders = billingsData.filter((billing) => {
          const expireDate = moment(billing.expireDate);
          const daysLeft = expireDate.diff(today, 'days');
          return daysLeft >= 0 && daysLeft <= 7;
        });

        setBillings(reminders);

        reminders.forEach((billing) => {
          const expireDate = moment(billing.expireDate);
          const daysLeft = expireDate.diff(today, 'days');
          sendEmail(billing, daysLeft);
        });
      } catch (error) {
        console.error('Error fetching billings data:', error);
      }
    };

    fetchBillings();
  }, []);

  return (
    <div>
      <h1>Gửi Email Nhắc Nhở Gia Hạn Bảo Hiểm</h1>
      {billings.length > 0 ? (
        <ul>
          {billings.map((billing, index) => (
            <li key={index}>
              Email sẽ được gửi đến: {billing.vehicle.user.fullname} - {billing.vehicle.user.email} - Hết hạn vào: {moment(billing.expireDate).format('LL')}
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
