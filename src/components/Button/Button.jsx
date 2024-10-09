import classNames from 'classnames/bind';
import style from './Button.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Button({ className, type = 'primary', icon, title, to }) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (to) {
            navigate(to);
        }
    };
    return (
        <button className={cx('wrapper', { [className]: className, [type]: type })} onClick={handleNavigate}>
            {icon && <span className={cx('icon')}>{icon}</span>}
            <span className={cx('title')}>{title}</span>
        </button>
    );
}

export default Button;
