import classnames from 'classnames/bind';
import Wrapper from '~/components/Wrapper';
import sitemapImage from '~/assets/img/sitemap.jpg';
import styles from './Sitemap.module.scss';

const cx = classnames.bind(styles);

function Sitemap() {
    return (
        <Wrapper>
            <img className={cx('img')} src={sitemapImage} alt="sitemap" />
        </Wrapper>
    );
}

export default Sitemap;
