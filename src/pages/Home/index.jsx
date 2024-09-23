import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import backgroundImage from '../../assets/Images/landing_car_bg.jpg';
import exampleImage from '../../assets/Images/mascot_car_com.png';
import baovietLogo from '../../assets/Images/baoviet_logo.png';
import pviLogo from '../../assets/Images/pvi.png';
import baominhLogo from '../../assets/Images/baominh_logo.png';
import libertyLogo from '../../assets/Images/liberty_logo.png';
import vniLogo from '../../assets/Images/pvi.png';
import styles from './Home.module.scss';
import car1 from '../../assets/Images/car-1.png';
import car2 from '../../assets/Images/car-2.png';
import car3 from '../../assets/Images/car-3.png';
import icon1 from '../../assets/Images/icon-1.jpg';
import icon2 from '../../assets/Images/icon-2.jpg';
import icon3 from '../../assets/Images/icon-3.jpg';
import icon4 from '../../assets/Images/icon-4.png';
import icon5 from '../../assets/Images/icon-5.jpg';
import icon6 from '../../assets/Images/icon-6.jpg';
import carr from '../../assets/Images/carr.png';
import carr2 from '../../assets/Images/carr2.png';
import carr3 from '../../assets/Images/carr3.png';
import carr4 from '../../assets/Images/carr4.png';
import carr5 from '../../assets/Images/carr5.png';
import carbanner from '../../assets/Images/car-com-banner.jpg';

const features = [
    {
        icon: icon1,
        icon2: carr,
        title: 'Đa dạng nhà cung cấp',
        title2: 'Sự cố bất ngờ',
        description:
            'Hỗ trợ chi phí khắc phục thiệt hại do thiên tai, cháy nổ và tác động ngoại lực không lường trước được',
    },
    {
        icon: icon2,
        icon2: carr2,
        title: 'Đa dạng thanh toán',
        title2: 'Tai nạn, va chạm',
        description: 'Thanh toán trực tuyến siêu nhanh. Thanh toán tiền mặt tại cửa hàng siêu tiện lợi.',
    },
    {
        icon: icon3,
        icon2: carr3,
        title: 'Chứng nhận điện tử',
        title2: 'Mất cắp do trộm cướp',
        description: 'Chi trả chi phí thay mới bộ phận đó hoặc toàn bộ giá trị xe trong trường hợp mất cắp toàn bộ',
    },
    {
        icon: icon4,
        icon2: carr4,
        title: 'Ưu đãi hấp dẫn',
        title2: 'Ngập nước',
        description: 'Hỗ trợ cứu hộ và chi trả chi phí sửa chữa',
    },
    {
        icon: icon5,
        icon2: carr5,
        title: 'Đội ngũ CSKH hỗ trợ 24/7',
        title2: 'Cố ý phá hoại',
        description: 'Chi trả chi phí khắc phục hậu quả',
    },
    {
        icon: icon6,
        title: 'Trả góp 0% siêu tiết kiệm',
        description: 'Saladin hỗ trợ bạn trả góp phí bảo hiểm kỳ hạn từ 03 đến 12 tháng KHÔNG LÃI SUẤT.',
    },
];

const HomePage = () => {
    return (
        <div className={styles.container}>
            {/* hàng 1 */}
            <Row
                justify="center"
                align="middle"
                style={{
                    height: '110vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Col span={11} className={styles.leftColumn} style={{ marginTop: '-150px' }}>
                    <h1 className={styles.welcomeTitle}>Welcome to our platform</h1>
                    <h2 className={styles.welcomeTitle2}>Welcome to our platform</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                        magna sed, convallis ex.
                    </p>
                    <Row gutter={16} className={styles.buttonGroup}>
                        <Col>
                            <Button className={styles.greenButton}>Buy Online</Button>
                        </Col>
                        <Col>
                            <Button className={styles.backButton}>Get consultation</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={11} style={{ marginBottom: '150px', paddingLeft: 15 }}>
                    <img
                        src={exampleImage}
                        alt="Mascot Car"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none',
                        }}
                    />
                </Col>
            </Row>
            {/* hàng 2 */}
            <div style={{ backgroundColor: '#f4fff9', padding: '20px 0' }}>
                <Row
                    justify="center"
                    align="middle"
                    gutter={[16, 16]}
                    className={styles.lgImage}
                    style={{ marginLeft: 'auto', marginRight: 'auto', padding: 5 }}
                >
                    <Col xs={12} sm={8} md={6} lg={4} className={styles.partnerCol}>
                        <img src={baovietLogo} alt="Baoviet Logo" />
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4} className={styles.partnerCol}>
                        <img src={pviLogo} alt="PVI Logo" />
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4} className={styles.partnerCol}>
                        <img src={baominhLogo} alt="Bao Minh Logo" />
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4} className={styles.partnerCol}>
                        <img src={libertyLogo} alt="Liberty Logo" />
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4} className={styles.partnerCol}>
                        <img src={vniLogo} alt="VNI Logo" />
                    </Col>
                </Row>
                <Row justify="center" style={{ marginTop: 50 }} className={styles.centeredRow}>
                    <Col span={24}>
                        <Row justify="space-around">
                            <Button type="primary" size="large" style={{ backgroundColor: '#38b245', border: 'none' }}>
                                Giới thiệu bảo hiểm
                            </Button>
                            <Button type="default" size="large" className={styles.themedRow}>
                                An tâm di chuyển
                            </Button>
                            <Button type="default" size="large" className={styles.themedRow}>
                                Hướng dẫn bồi thường
                            </Button>
                            <Button type="default" size="large" className={styles.themedRow}>
                                Danh sách cơ sở sửa chữa
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row justify="center" style={{ marginTop: 30, textAlign: 'center' }}>
                    <Col span={20}>
                        <h2>Giới thiệu bảo hiểm</h2>
                        <p>
                            Bảo hiểm vật chất xe ô tô là bảo hiểm tự nguyện dành cho các loại xe ô tô tham gia giao
                            thông trên lãnh thổ Việt Nam. Khi xảy ra sự cố, công ty bảo hiểm sẽ bồi thường cho những
                            thiệt hại vật chất xe xảy ra do những tai nạn bất ngờ, và ngoài sự kiểm soát của chủ xe. Tuỳ
                            vào nhu cầu sử dụng, khách hàng có thể lựa chọn nhiều quyền lợi bổ sung khác nhau:
                        </p>
                        <Row justify="center" style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap' }}>
                            <Col span={8} className={styles.benefitItem}>
                                <img src={car1} alt="" className={styles.benefitImage} />
                                <strong>Bảo hiểm lựa chọn nơi sửa chữa:</strong>
                            </Col>
                            <Col span={8} className={styles.benefitItem}>
                                <img src={car2} alt="" className={styles.benefitImage} />
                                <strong>Bảo hiểm hư hỏng động cơ do thủy kích:</strong>
                            </Col>
                            <Col span={8} className={styles.benefitItem}>
                                <img src={car3} alt="" className={styles.benefitImage} />
                                <strong>Bảo hiểm mất cắp bộ phận:</strong>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            {/* hàng 3 */}
            <div style={{ padding: '50px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    Vì sao nên chọn bảo hiểm xe ô tô của Saladin?
                </h1>
                <Row gutter={[32, 32]}>
                    {features.map((feature) => (
                        <Col xs={24} sm={12} md={8} key={feature.title}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <img src={feature.icon} alt={feature.title} className={styles.featureIcon} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            {/* trang 4 */}
            <div style={{ padding: '50px', backgroundColor: '#f4fff9' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    An tâm vì xe của bạn luôn được bảo vệ
                </h1>
                <Row gutter={[32, 32]}>
                    {features.slice(0, 5).map((feature, index) => (
                        <Col xs={24} sm={12} md={index < 3 ? 8 : 12} key={feature.title}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <img src={feature.icon2} alt={feature.title} className={styles.featureIcon} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{feature.title2}</h3>
                                <p>{feature.description2}</p>
                            </Card>
                        </Col>
                    ))}
                    <img src={carbanner} alt="" className={styles.bannerImage} />
                </Row>
            </div>
        </div>
    );
};

export default HomePage;
