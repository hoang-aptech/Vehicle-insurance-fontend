import classNames from 'classnames/bind';
import style from './Button.module.scss';

const cx = classNames.bind(style);

function Button({ className, type = 'primary', icon, title }) {
    return (
        <button className={cx('wrapper', { className, [type]: type })}>
            <span className={cx('icon')}>{icon && icon}</span>
            <span className={cx('title')}>{title}</span>
        </button>
    );
}

export default Button;
