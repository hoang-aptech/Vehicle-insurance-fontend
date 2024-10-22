import React, { useRef, useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import background from '~/assets/img/backgroundLoginRegister.png';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import bcrypt from 'bcryptjs';

const cx = classNames.bind(styles);

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        address: '',
        phone: '',
        email: '',
    });

    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [codeGenerationTime, setCodeGenerationTime] = useState(null);
    const inputStepOne = useRef();
    const inputStepTwo = useRef();
    const inputStepThree = useRef();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        setCodeGenerationTime(new Date()); // Store the current time when the code is generated
        emailjs
            .send(
                'service_xe6f9kj',
                'template_3z2uslk',
                {
                    to_email: formData.email,
                    verification_code: code,
                    message: `Thank you for registering on our website. Here is your verification code: ${code}`,
                },
                'laGrWQghcmlQSS4rS',
            )
            .then(
                (result) => {
                    console.log('Email sent:', result.text);

                    openNotificationWithIcon('success', 'Email sent.', `Sent email to ${formData.email}`);
                },
                (error) => {
                    console.log('Failed to send email:', error.text);
                },
            );
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const now = new Date();
        const expirationTime = new Date(codeGenerationTime.getTime() + 30 * 60000); // Add 30 minutes

        if (verificationCode === generatedCode) {
            if (now <= expirationTime) {
                const currentTimeUTC = new Date();
                const timeZoneOffset = 7 * 60; // Adjust as needed
                const currentTimePlus7 = new Date(currentTimeUTC.getTime() + timeZoneOffset * 60 * 1000);
                const currentTimePlus7ISO = currentTimePlus7.toISOString().slice(0, 19);
                const hashedPassword = await bcrypt.hash(formData.password, 10);

                axios
                    .post(process.env.REACT_APP_BACKEND_URL + '/Users', {
                        username: formData.username,
                        fullname: formData.fullname,
                        password: hashedPassword,
                        verified: true,
                        address: formData.address,
                        phone: formData.phone,
                        email: formData.email,
                        role: 'User',
                        deleted: false,
                        avatar: null,
                        deletedAt: null,
                        createdAt: currentTimePlus7ISO,
                        updatedAt: currentTimePlus7ISO,
                    })
                    .then((response) => {
                        openNotificationWithIcon('success', 'Successfully', 'User registered successfully!');
                        setTimeout(() => {
                            navigate(config.routes.login);
                        }, 2000);
                    })
                    .catch((error) => {
                        openNotificationWithIcon('error', 'Error registering user!', error.response.data.message);
                    });
                return;
            } else {
                alert('Verification code has expired!');
            }
        } else {
            alert('Verification code is incorrect!');
        }
    };

    const handleValidate = (e, step) => {
        e.preventDefault();
        switch (step) {
            case 1:
                console.log(1);
                console.log(formData);
                if (formData.fullname.length < 3) {
                    openNotificationWithIcon(
                        'error',
                        'Validate error',
                        'Full name must be at least 3 characters long!',
                    );
                    return;
                } else if (formData.address.length < 3) {
                    openNotificationWithIcon('error', 'Validate error', 'Address must be at least 3 characters long!');
                    return;
                }
                if (inputStepOne.current) {
                    inputStepOne.current.checked = true;
                }
                break;
            case 2:
                console.log(2);
                console.log(formData);
                const validateEmail = (email) => {
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return emailRegex.test(email);
                };
                const validatePhone = (phone) => {
                    const phoneRegex = /^\+?\d{10,11}$/;
                    return phoneRegex.test(phone);
                };
                if (!validateEmail(formData.email)) {
                    openNotificationWithIcon('error', 'Validate error', 'Invalid email!');
                    return;
                } else if (!validatePhone(formData.phone)) {
                    openNotificationWithIcon('error', 'Validate error', 'Invalid phone!');
                    return;
                }
                if (inputStepTwo.current) {
                    inputStepTwo.current.checked = true;
                }
                break;
            case 3:
                const checkNoSpaces = (str) => {
                    console.log(!str.includes(' '));

                    return !str.includes(' ');
                };
                console.log(3);
                console.log(formData);
                if (formData.username.length < 3) {
                    openNotificationWithIcon('error', 'Validate error', 'Username must be at least 3 characters long!');
                    return;
                } else if (!checkNoSpaces(formData.username)) {
                    openNotificationWithIcon('error', 'Validate error', 'Username cannot contain spaces!');
                    return;
                } else if (formData.password.length < 3) {
                    openNotificationWithIcon('error', 'Validate error', 'Password must be at least 3 characters long!');
                    return;
                }
                if (inputStepThree.current) {
                    handleRegister();
                    inputStepThree.current.checked = true;
                }
                break;
            default:
                console.error('step invalid');
        }
    };

    return (
        <div className={cx('container-wrapper')} style={{ backgroundImage: `url(${background})` }}>
            {contextHolder}
            <input type="checkbox" id="one" className={cx('checkbox-one')} ref={inputStepOne} />
            <input type="checkbox" id="two" className={cx('checkbox-two')} ref={inputStepTwo} />
            <input type="checkbox" id="three" className={cx('checkbox-three')} ref={inputStepThree} />
            <div className={cx('container')}>
                <h1 className={cx('title')}>Sign Up</h1>
                <div className={cx('indicator')}>
                    <div className={cx('step', 'step1')}>
                        <div>1</div>
                        <span>Personal</span>
                    </div>
                    <div className={cx('line', 'line1')}></div>
                    <div className={cx('step', 'step2')}>
                        <div>2</div>
                        <span>Contact</span>
                    </div>
                    <div className={cx('line', 'line2')}></div>
                    <div className={cx('step', 'step3')}>
                        <div>3</div>
                        <span>Account</span>
                    </div>
                    <div className={cx('line', 'line3')}></div>
                    <div className={cx('step', 'step4')}>
                        <div>4</div>
                        <span>Code </span>
                    </div>
                </div>

                <div className={cx('panel')}>
                    <div className={cx('page1')}>
                        <form action="#" className={cx('form')}>
                            <h2>Personal Information</h2>
                            <div className={cx('form-group')}>
                                <input type="text" name="fullname" required onChange={handleChange} />
                                <label htmlFor="">Full name</label>
                            </div>
                            <div className={cx('form-group')}>
                                <input name="address" required onChange={handleChange} />
                                <label htmlFor="">Address</label>
                            </div>
                            <div className={cx('btn-group')}>
                                <label
                                    htmlFor="one"
                                    className={cx('btn', 'btn-f')}
                                    onClick={(e) => handleValidate(e, 1)}
                                >
                                    Next
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className={cx('page2')}>
                        <form action="#" className={cx('form')}>
                            <h2>Contact Information</h2>
                            <div className={cx('form-group')}>
                                <input type="text" name="email" required onChange={handleChange} />
                                <label htmlFor="">Email Address</label>
                            </div>
                            <div className={cx('form-group')}>
                                <input type="number" name="phone" required onChange={handleChange} />
                                <label htmlFor="">Phone Number</label>
                            </div>
                            <div className={cx('btn-group')}>
                                <label htmlFor="one" className={cx('btn')}>
                                    Previous
                                </label>
                                <label htmlFor="two" className={cx('btn')} onClick={(e) => handleValidate(e, 2)}>
                                    Next
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className={cx('page3')}>
                        <form action="#" className={cx('form')}>
                            <h2>Account Information</h2>
                            <div className={cx('form-group')}>
                                <input name="username" required onChange={handleChange} />
                                <label>Username</label>
                            </div>
                            <div className={cx('form-group')}>
                                <input type="password" name="password" required onChange={handleChange} />
                                <label>Password</label>
                            </div>
                            <div className={cx('btn-group')}>
                                <label htmlFor="two" className={cx('btn')}>
                                    Previous
                                </label>
                                <label htmlFor="three" className={cx('btn')} onClick={(e) => handleValidate(e, 3)}>
                                    Next
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className={cx('page4')}>
                        <form action="#" className={cx('form')}>
                            <h2>Authentication code</h2>
                            <div className={cx('form-group')}>
                                <input type="text" required onChange={(e) => setVerificationCode(e.target.value)} />
                                <label htmlFor="">Code</label>
                            </div>
                            <div className={cx('btn-group')}>
                                <label htmlFor="three" className={cx('btn')}>
                                    Previous
                                </label>
                                <button className={cx('btn')} onClick={handleVerify}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
