import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { UserIcon, VietnamIcon } from '~/components/Icon';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function Header() {
    return (
        <div className={cx('header')}>
            <div className={cx('wrapper')}>
                <div className={cx('logo-with-nav-menu')}>
                    <h1>Logo</h1>
                    <nav>
                        <ul className={cx('nav-list')}>
                            <li className={cx('nav-item')}>Buy insurance</li>
                            <li className={cx('nav-item')}>Endow</li>
                            <li className={cx('nav-item')}>Contract</li>
                            <li className={cx('nav-item')}>Compensation</li>
                            <li className={cx('nav-item')}>Blog</li>
                        </ul>
                    </nav>
                </div>
                <div className={cx('actions-with-nation')}>
                    <Button type="outline" title="Contributor" />
                    <Button icon={<UserIcon />} title="Login" />
                    <div className={cx('nation-box')}>
                        <VietnamIcon />
                        <p className={cx('nation-name')}>VN</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
