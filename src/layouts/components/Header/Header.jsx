import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { CaretDownOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import logo from '~/assets/img/logo.png';
import {
    AccidentIcon,
    BikeIcon,
    CarComprehensiveIcon,
    CarIcon,
    DownOutlinedIcon,
    HealthCancerIcon,
    HealthIcon,
    HomeInsuranceIcon,
    MenuBtnIcon,
    PlaneIcon,
    UserIcon,
} from '~/components/Icon';
import ukFlag from '~/assets/img/uk-flag.png';
import style from './Header.module.scss';
import config from '~/config';

const cx = classNames.bind(style);

const menuHeaderMobileTablet = [
    {
        label: 'Buy insurance',
        children: [
            { label: 'International travel', to: '', icon: <PlaneIcon width={32} height={32} /> },
            { label: 'Automobile Liability', to: '', icon: <CarIcon width={32} height={32} /> },
            {
                label: 'Automotive Material',
                to: config.routes.insuranceAutomotivePhysical,
                icon: <CarComprehensiveIcon width={32} height={32} />,
            },
            { label: 'Health', to: '', icon: <HealthIcon width={32} height={32} /> },
            { label: 'Accident 24/24', to: '', icon: <AccidentIcon width={32} height={32} /> },
            { label: 'Motorcycle Liability', to: '', icon: <BikeIcon width={32} height={32} /> },
            { label: 'Private house', to: '', icon: <HomeInsuranceIcon width={32} height={32} /> },
            { label: 'Health & Cancer', to: '', icon: <HealthCancerIcon width={32} height={32} /> },
        ],
        rightBox: {
            icon: <DownOutlinedIcon />,
        },
    },
    {
        label: 'Endow',
        to: '/',
    },
    {
        label: 'Contract',
        to: '/',
    },
    {
        label: 'Compensation',
        to: '/',
    },
    {
        label: 'Blog',
        to: '/',
    },
    {
        label: 'Language',
        rightBox: {
            label: 'EN',
            icon: <img style={{ width: 30 }} src={ukFlag} alt="uk flag"></img>,
        },
    },
    {
        label: 'Collaborator',
        to: '/',
    },
];

const showMenuChildrenValues = menuHeaderMobileTablet
    .filter((i) => !!i.children)
    .map((i) => ({ label: i.label, show: false }));

function Header() {
    const navigate = useNavigate();
    const [showMenuResponsive, setShowMenuResponsive] = useState(false);
    const [showMenuChildren, setShowMenuChildren] = useState(showMenuChildrenValues);

    const handleShowMenuChildren = (label) => {
        console.log(label);

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

    // console.log(showMenuChildren);

    return (
        <div className={cx('header')}>
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
                                {menuHeaderMobileTablet.map((i) => {
                                    return (
                                        <li key={i.label} className={cx('menu-link-wrapper')}>
                                            {i.to ? (
                                                <Link to={i.to} className={cx('menu-link')}>
                                                    <span className={cx('menu-title')}>{i.label}</span>
                                                    <span className={cx('right-box')}>
                                                        {i.icon && <span>{i.icon}</span>}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <>
                                                    <div
                                                        className={cx('menu-item-wrapper', {
                                                            ['have-children']: i.children,
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
                                                            console.log(menu);

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
                                                                                {item.icon}
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
                            <li className={cx('nav-item')}>
                                <Tippy
                                    interactive
                                    delay={[0, 100]}
                                    placement="bottom-start"
                                    render={() => {
                                        return (
                                            <ul className={cx('menu-list')}>
                                                <li>
                                                    <Link to="/" className={cx('menu-link')}>
                                                        <PlaneIcon />
                                                        <span className={cx('menu-title')}>International travel</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/" className={cx('menu-link')}>
                                                        <CarIcon />
                                                        <span className={cx('menu-title')}>Automobile Liability</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={config.routes.insuranceAutomotivePhysical}
                                                        className={cx('menu-link')}
                                                    >
                                                        <CarComprehensiveIcon />
                                                        <span className={cx('menu-title')}>Automotive Material</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/" className={cx('menu-link')}>
                                                        <HealthIcon />
                                                        <span className={cx('menu-title')}>Health</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/" className={cx('menu-link')}>
                                                        <AccidentIcon />
                                                        <span className={cx('menu-title')}>Accident 24/24</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/" className={cx('menu-link')}>
                                                        <BikeIcon />
                                                        <span className={cx('menu-title')}>Motorcycle Liability</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/" className={cx('menu-link')}>
                                                        <HomeInsuranceIcon />
                                                        <span className={cx('menu-title')}>Private house</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/" className={cx('menu-link')}>
                                                        <HealthCancerIcon />
                                                        <span className={cx('menu-title')}>Health & Cancer</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        );
                                    }}
                                >
                                    <p className={cx('nav-title')}>
                                        Buy insurance <CaretDownOutlined className={cx('nav-icon')} />
                                    </p>
                                </Tippy>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to="/">Endow</Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to="/">Contract</Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to="/">Compensation</Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to="/">Blog</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={cx('actions-with-nation')}>
                    <Button type="outline" title="Contributor" className={cx('contributor-btn')} />
                    <Button icon={<UserIcon />} title="Log in" />
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
