import { CaretDownOutlined, CloseOutlined, UserAddOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

import { Context } from '~/Context';
import { DownOutlinedIcon, MenuBtnIcon, UserIcon } from '~/components/Icon';
import vehicleInsuranceIcon from '~/assets/img/vehicle_insurance_icon.png';
import Button from '~/components/Button';
import logo from '~/assets/img/logo.png';
import config from '~/config';
import ukFlag from '~/assets/img/uk-flag.png';
import style from './Header.module.scss';

const cx = classNames.bind(style);

function Header() {
    const navigate = useNavigate();
    const { user, handleLogoutUser } = useContext(Context);

    let [navContent, setNavContent] = useState([]);
    const [showMenuResponsive, setShowMenuResponsive] = useState(false);

    const [showMenuChildren, setShowMenuChildren] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const createHeaderNav = async () => {
        const insuranceDataRes = await axios.get(process.env.REACT_APP_BACKEND_URL + '/Insurances/root');
        const insuranceData = insuranceDataRes.data;
        const insuranceMenuItems = insuranceData.map((item) => ({
            label: item.name,
            to: config.routes.insuranceDetails.replace(':id', item.id),
            icon: vehicleInsuranceIcon,
        }));

        setNavContent([
            {
                label: 'Buy insurance',
                children: insuranceMenuItems,
                rightBox: {
                    icon: <DownOutlinedIcon />,
                },
            },
            {
                label: 'Contracts list',
                to: config.routes.contractList,
            },
            {
                label: 'Compensation',
                to: config.routes.indemnity,
            },
            {
                label: 'Blog',
                to: config.routes.blog,
            },
            {
                label: 'Language',
                isTbMb: true,
                rightBox: {
                    label: 'EN',
                    icon: <img style={{ width: 30 }} src={ukFlag} alt="uk flag"></img>,
                },
            },
            {
                label: 'Collaborator',
                isTbMb: true,
                to: '/',
            },
        ]);

        const showMenuChildrenValues = navContent
            .filter((i) => !!i.children)
            .map((i) => ({ label: i.label, show: false }));

        setShowMenuChildren(showMenuChildrenValues);
    };

    const handleShowMenuChildren = (label) => {
        const newShowMenuChildren = showMenuChildren.map((i) => {
            if (i.label === label) {
                return { ...i, show: !i.show };
            }
            return i;
        });

        // Update the state with the new array
        setShowMenuChildren(newShowMenuChildren);
    };

    const handleNavigate = (e, route) => {
        e.preventDefault();
        setShowMenuResponsive(false);
        navigate(route);
    };
    const handleLogOutBtn = (e) => {
        e.preventDefault();
        if (handleLogoutUser()) {
            openNotificationWithIcon('success', 'Logout', 'You have successfully logged out.');
            setTimeout(() => {
                navigate(config.routes.home);
            }, 500);
        }
    };

    useEffect(() => {
        createHeaderNav();
    }, []);

    return (
        <div className={cx('header')}>
            {contextHolder}
            <div className={cx('wrapper')}>
                <div className={cx('logo-with-nav-menu')}>
                    <MenuBtnIcon onClick={() => setShowMenuResponsive(true)} className={cx('menu-btn')} />
                    <div
                        className={cx('menu-responsive', {
                            show: showMenuResponsive,
                        })}
                    >
                        <div className={cx('main')}>
                            <div className={cx('wrapper-logo')}>
                                <CloseOutlined
                                    className={cx('close-icon')}
                                    onClick={() => setShowMenuResponsive(false)}
                                />
                                <img
                                    src={logo}
                                    alt="logo"
                                    className={cx('logo')}
                                    onClick={(e) => handleNavigate(e, config.routes.home)}
                                />
                            </div>
                            <p className={cx('message')}>Login to enjoy member privileges!</p>
                            <ul className={cx('menu-items')}>
                                {navContent.map((i) => {
                                    return (
                                        <li key={i.label} className={cx('menu-link-wrapper')}>
                                            {i.to ? (
                                                <Link to={i.to} className={cx('menu-link')}>
                                                    <span className={cx('menu-title')}>{i.label}</span>
                                                </Link>
                                            ) : (
                                                <>
                                                    <div
                                                        className={cx('menu-item-wrapper', {
                                                            'have-children': i.children,
                                                        })}
                                                        onClick={() => handleShowMenuChildren(i.label)}
                                                    >
                                                        <span className={cx('menu-title')}>{i.label}</span>
                                                        <span className={cx('right-box')}>
                                                            {i.rightBox.icon && (
                                                                <span
                                                                    className={cx('icon-wrapper', {
                                                                        'rotate-180': showMenuChildren.find(
                                                                            (item) =>
                                                                                item.label === i.label &&
                                                                                item.show === true,
                                                                        ),
                                                                    })}
                                                                >
                                                                    {i.rightBox.icon}
                                                                </span>
                                                            )}
                                                            {i.rightBox?.label && <span>{i.rightBox.label}</span>}
                                                        </span>
                                                    </div>

                                                    {showMenuChildren.map((menu) => {
                                                        if (menu.label === i.label && menu.show) {
                                                            return (
                                                                <ul key={menu.label} className={cx('menu-list')}>
                                                                    {i.children.map((item, idx) => (
                                                                        <li key={idx}>
                                                                            <Link
                                                                                to={item.to}
                                                                                className={cx('menu-link')}
                                                                                onClick={(e) =>
                                                                                    handleNavigate(e, item.to)
                                                                                }
                                                                            >
                                                                                <img
                                                                                    src={item.icon}
                                                                                    alt="vehicle-icon"
                                                                                    className={cx('icon')}
                                                                                />
                                                                                <span className={cx('menu-title')}>
                                                                                    {item.label}
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={cx('blur')} onClick={() => setShowMenuResponsive(false)}></div>
                    </div>
                    <img
                        src={logo}
                        alt="logo"
                        className={cx('logo')}
                        onClick={(e) => handleNavigate(e, config.routes.home)}
                    />
                    <nav className={cx('nav')}>
                        <ul className={cx('nav-list')}>
                            {navContent.map(
                                (i, idx) =>
                                    !i.isTbMb &&
                                    (i.to ? (
                                        <li key={idx} className={cx('nav-item')}>
                                            <Link to={i.to}>{i.label}</Link>
                                        </li>
                                    ) : (
                                        <li key={idx} className={cx('nav-item')}>
                                            <Tippy
                                                interactive
                                                delay={[0, 100]}
                                                placement="bottom-start"
                                                render={() => {
                                                    return (
                                                        <ul className={cx('menu-list')}>
                                                            {i.children.map((i, idx) => (
                                                                <li key={idx}>
                                                                    <Link to={i.to} className={cx('menu-link')}>
                                                                        <img
                                                                            src={i.icon}
                                                                            alt="vehicle-icon"
                                                                            className={cx('icon')}
                                                                        />
                                                                        <span className={cx('menu-title')}>
                                                                            {i.label}
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    );
                                                }}
                                            >
                                                {/* <li key={idx} className={cx('nav-item')}> */}
                                                <p className={cx('nav-title')}>
                                                    {i.label} <CaretDownOutlined className={cx('nav-icon')} />
                                                </p>
                                                {/* </li> */}
                                            </Tippy>
                                        </li>
                                    )),
                            )}
                        </ul>
                    </nav>
                </div>
                <div className={cx('actions-with-nation')}>
                    {user ? (
                        <div>
                            <Tippy
                                interactive
                                delay={[0, 100]}
                                placement="bottom-end"
                                render={() => {
                                    return (
                                        <ul className={cx('menu-list')}>
                                            <li>
                                                <Link to={config.routes.home} className={cx('menu-link')}>
                                                    <span className={cx('menu-title')}>Profile</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={config.routes.home}
                                                    className={cx('menu-link')}
                                                    onClick={handleLogOutBtn}
                                                >
                                                    <span className={cx('menu-title')}>Logout</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    );
                                }}
                            >
                                <h3 className={cx('welcome')}>
                                    Hello <span className={cx('username')}>{user.username}</span>
                                </h3>
                            </Tippy>
                        </div>
                    ) : (
                        <>
                            <Button icon={<UserIcon />} title="Log in" to={config.routes.login} />
                            <Button
                                icon={<UserAddOutlined />}
                                type="outline"
                                title="Register"
                                to={config.routes.register}
                            />
                        </>
                    )}
                    <div className={cx('nation-box')}>
                        <img src={ukFlag} className={cx('flag')} alt="uk-flag" />
                        <p className={cx('nation-name')}>EN</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
