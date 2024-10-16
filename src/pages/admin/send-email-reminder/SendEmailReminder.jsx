import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from 'axios';
import moment from 'moment';
import { Context } from '~/Context';
import config from '~/config';

const SendReminderEmails = () => {
    const navigate = useNavigate();
    const { adminToken, handleLogoutAdmin } = useContext(Context);
    const [customers, setCustomers] = useState([]);

    const handleError = (err) => {
        if (err.status === 401) {
            alert('Unauthorized. Please log in again.');
            const Logouted = handleLogoutAdmin();
            if (Logouted) {
                navigate(config.routes.loginAdmin);
            }
        } else if (err.status === 400) {
            alert(err.response.data.message);
        }
    };

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
                    message: `Your insurance will expire in ${daysLeft} days on ${moment(customer.expireDate).format(
                        'LL',
                    )}.`,
                },
                'laGrWQghcmlQSS4rS',
            )
            .then((result) => {
                alert(`Email sent to ${customer.vehicle.user.email}: ${result.text}`);
            })
            .catch((error) => {
                console.error(`Failed to send email to ${customer.vehicle.user.email}: ${error.text}`);
            });
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://localhost:7289/api/billings', {
                    headers: { Authorization: 'Bearer ' + adminToken },
                });
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
                handleError(error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Send Insurance Renewal Reminder Email</h1>
            {customers.length > 0 ? (
                <ul>
                    {customers.map((customer, index) => (
                        <li key={index}>
                            Email will be sent to: {customer.vehicle.user.fullname} - {customer.vehicle.user.email} -
                            Expires on: {customer.expireDate}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No customers need reminding today.</p>
            )}
        </div>
    );
};

export default SendReminderEmails;
