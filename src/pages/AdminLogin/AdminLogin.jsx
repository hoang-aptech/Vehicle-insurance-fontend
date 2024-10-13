import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';

import { Context } from '~/Context';
import config from '~/config';
import styles from './AdminLogin.module.scss';
import background from '~/assets/img/backgroundLoginRegister.png';

const cx = classNames.bind(styles);

const AdminLogin = () => {
    const { admin, setAdmin, setAdminToken } = useContext(Context);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const handleLoggedIn = () => {
        if (admin) {
            openNotificationWithIcon('info', 'Admin logged in', 'Redirecting to home ...');
            setTimeout(() => {
                navigate(config.routes.admin);
            }, 1000);
        }
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        const checkNoSpaces = (str) => {
            return !str.includes(' ');
        };
        if (username.length < 3) {
            openNotificationWithIcon('error', 'Validate error', 'Username must be at least 3 characters long!');
            return;
        } else if (!checkNoSpaces(username)) {
            openNotificationWithIcon('error', 'Validate error', 'Username cannot contain spaces!');
            return;
        } else if (password.length < 3) {
            openNotificationWithIcon('error', 'Validate error', 'Password must be at least 3 characters long!');
            return;
        }
        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/Users/authenticate/admin', {
                username,
                password,
            });
            if (res.status === 200) {
                const data = res.data;
                localStorage.setItem('adminToken', JSON.stringify(data.token));
                localStorage.setItem('admin', JSON.stringify(data.user));
                setAdminToken(data.token);
                setAdmin(data.user);
                openNotificationWithIcon('success', 'Login success!', 'You have successfully logged in');
                setTimeout(() => {
                    navigate(config.routes.admin);
                }, 1000);
            }
        } catch (e) {
            openNotificationWithIcon('error', 'Admin login fail!', 'Incorrect username or password');
        }
    };

    useEffect(() => {
        handleLoggedIn();
    }, []);

    return (
        <div className={cx('background-container')} style={{ backgroundImage: `url(${background})` }}>
            {contextHolder}
            <div className={cx('login-container')}>
                <div className={cx('content')}>
                    <h1 className={cx('title')}>ADMIN LOGIN</h1>
                    <form onSubmit={handleAdminLogin}>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>Username:</label>
                            <input
                                className={cx('input')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>Password:</label>
                            <input
                                className={cx('input')}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <button className={cx('button')} type="submit">
                                Login
                            </button>
                        </div>
                        <div className={cx('link-group')}>
                            <p>
                                You don't have an account yet?{' '}
                                <Link className={cx('register-btn')} to={config.routes.register}>
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AdminLogin;
