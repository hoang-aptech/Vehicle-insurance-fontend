import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import logo from '~/assets/img/logo.png';
import style from './Footer.module.scss';
import { FacebookFilled, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const cx = classNames.bind(style);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('wrapper')}>
                <h4 className={cx('title')}>Business Locations</h4>
                <div className={cx('locations')}>
                    <div className={cx('location')}>
                        <div className={cx('location-title')}>Head Office</div>
                        <div className={cx('location-address')}>
                            5th Floor, Circo Building, 222 Dien Bien Phu
                            <br />
                            Vo Thi Sau Ward, District 3<br />
                            Ho Chi Minh City, Vietnam
                        </div>
                    </div>
                    <div className={cx('location')}>
                        <div className={cx('location-title')}>HCMC Office 1</div>
                        <div className={cx('location-address')}>
                            BACH Building, 111 Ly Chinh Thang
                            <br />
                            Vo Thi Sau Ward, District 3<br />
                            Ho Chi Minh City, Vietnam
                        </div>
                    </div>
                    <div className={cx('location')}>
                        <div className={cx('location-title')}>HCMC Office 2</div>
                        <div className={cx('location-address')}>
                            B&amp;L Building, 119-121 Ung Van Khiem
                            <br />
                            Ward 25, Binh Thanh District
                            <br />
                            Ho Chi Minh City, Vietnam
                        </div>
                    </div>
                    <div className={cx('location')}>
                        <div className={cx('location-title')}>Hanoi Office</div>
                        <div className={cx('location-address')}>
                            7th Floor, DC Building, 144 Doi Can
                            <br />
                            Ba Dinh District
                            <br />
                            Hanoi City, Vietnam
                        </div>
                    </div>
                </div>
                <div className={cx('company-info')}>
                    <div className={cx('company-details')}>
                        <img src={logo} alt="Logo" className={cx('logo')} />
                        <div className={cx('company-details-body')}>
                            <div className={cx('company-name')}>10x Consulting and Technology Co., Ltd</div>
                            <div>Business ID: 0316591461.</div>
                            <div>
                                <a className={cx('company-hotline')} href="tel:1900638454">
                                    Hotline: <strong>1900 638 454</strong>
                                </a>
                            </div>
                            <div className={cx('socials')}>
                                <Link to="/" className={cx('social-link')}>
                                    <FacebookFilled />
                                </Link>
                                <Link to="/" className={cx('social-link')}>
                                    <LinkedinOutlined />
                                </Link>
                                <Link to="/" className={cx('social-link')}>
                                    <InstagramOutlined />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item-box')}>
                        <h5>About One team</h5>
                        <Link to="/">About Us</Link>
                        <Link to="/">One team Reviews</Link>
                        <Link to="/">Community Contributions</Link>
                        <Link to="/">Careers</Link>
                        <Link to="/">For Businesses</Link>
                    </div>
                    <div className={cx('item-box')}>
                        <h5>Support</h5>
                        <Link to="/">Contact Us</Link>
                    </div>
                    <div className={cx('item-box')}>
                        <h5>Others</h5>
                        <Link to="/">Insurance Glossary</Link>
                        <Link to="/">One team Blog</Link>
                        <Link to="/">Terms &amp; Conditions</Link>
                        <Link to="/">Privacy Policy</Link>
                    </div>
                    <div className={cx('item-box')}>
                        <h5>Back account test</h5>
                        <p>
                            <strong>Bank: </strong>NCB
                        </p>
                        <p>
                            <strong>Bank account number: </strong>9704198526191432198
                        </p>
                        <p>
                            <strong>Bank account holder: </strong>NGUYEN VAN A
                        </p>
                        <p>
                            <strong>Release date: </strong>07/15
                        </p>
                        <p>
                            <strong>OTP Code: </strong>123456
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
