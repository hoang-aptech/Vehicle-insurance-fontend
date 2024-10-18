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
    const [billings, setBillings] = useState([]);

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
                    message: `Your insurance will expire in ${daysLeft} days on ${moment(billing.expireDate).format(
                        'LL',
                    )}.`,
                },
                'laGrWQghcmlQSS4rS',
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
                const response = await axios.get('https://localhost:7289/api/Billings', {
                    headers: { Authorization: 'Bearer ' + adminToken },
                });
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
                handleError(error);
            }
        };

        fetchBillings();
    }, []);

    return (
        <div>
            <h1>Send Insurance Renewal Reminder Email</h1>
            {billings.length > 0 ? (
                <ul>
                    {billings.map((billing, index) => (
                        <li key={index}>
                            Email will be sent to: {billing.vehicle.user.fullname} - {billing.vehicle.user.email} -
                            Expires on: {moment(billing.expireDate).format('LL')}
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
