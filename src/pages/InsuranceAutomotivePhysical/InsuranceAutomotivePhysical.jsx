import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Collapse } from 'antd';
import backgroundImage from '../../assets/Images/landing_car_bg.jpg';
import exampleImage from '../../assets/Images/mascot_car_com.png';
import baovietLogo from '../../assets/Images/baoviet_logo.png';
import pviLogo from '../../assets/Images/pvi.png';
import baominhLogo from '../../assets/Images/baominh_logo.png';
import libertyLogo from '../../assets/Images/liberty_logo.png';
import vniLogo from '../../assets/Images/pvi.png';
import styles from './InsuranceAutomotivePhysical.module.scss';
import { ArrowRightOutlined } from '@ant-design/icons';
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
import Ip from '../../assets/Images/ip2.jpg';
import star from '../../assets/Images/star2.jpg';
import chat from '../../assets/Images/chat2.jpg';
import Rescue from '../../assets/Images/rescue-hotline.png';
import Inspection from '../../assets/Images/inspection-support.png';
import Garage from '../../assets/Images/garage-system.png';
import Claim from '../../assets/Images/claim-guide.png';

// setup cho các trang
const features = [
    {
        icon: icon1,
        icon2: carr,
        icon3: Ip,
        icon4: Garage,
        title: 'Đa dạng nhà cung cấp',
        title2: 'Sự cố bất ngờ',
        title3: 'Cách tra cứu số khung, số máy ô tô để mua Bảo hiểm Vật chất xe',
        title4: 'Hệ thống garage toàn quốc',
        description2:
            'Hỗ trợ chi phí khắc phục thiệt hại do thiên tai, cháy nổ và tác động ngoại lực không lường trước được',
        description: 'Saladin là đối tác chính thức của nhiều đơn vị bảo hiểm uy tín',
        description4: 'Giúp bạn chăm sóc xe trên mọi miền tổ quốc mà không lo về chi phí',
        description5:
            'Thực hiện các biện pháp giảm thiểu tổn thất về người và tài sản, giữ nguyên hiện trường nếu có thể.',
    },
    {
        icon: icon2,
        icon2: carr2,
        icon3: star,
        icon4: Inspection,
        title: 'Đa dạng thanh toán',
        title2: 'Tai nạn, va chạm',
        title4: 'Hỗ trợ giám định tại tỉnh',
        title3: 'Hướng dẫn chụp hình xe để mua bảo hiểm Vật chất xe',
        description2: 'Chi trả chi phí sửa chữa, thay mới bộ phận nếu chiếc xe bị hư hỏng do xảy ra tai nạn',
        description: 'Thanh toán trực tuyến siêu nhanh. Thanh toán tiền mặt tại cửa hàng siêu tiện lợi.',
        description4: 'Đơn vị bảo hiểm có văn phòng tại các tỉnh sẽ hỗ trợ bạn khi cần trợ giúp',
        description5: 'Gọi ngay hotline trên giấy chứng nhận bảo hiểm để thông báo sự cố và được hướng dẫn chi tiết.',
    },
    {
        icon: icon3,
        icon2: carr3,
        icon3: chat,
        icon4: Rescue,
        title: 'Chứng nhận điện tử',
        title2: 'Mất cắp do trộm cướp',
        title4: 'Hotline cứu hộ hoạt động 24/7',
        title3: 'Giải đáp câu hỏi thường gặp về chi phí BH thân vỏ xe ô tô',
        description2: 'Chi trả chi phí thay mới bộ phận đó hoặc toàn bộ giá trị xe trong trường hợp mất cắp toàn bộ',
        description: 'Được cấp online bởi Công ty bảo hiểm, có giá trị tương đương bản giấy.',
        description4: 'Trong mọi sự cố, gọi ngay hotline bảo hiểm để đươc hỗ trợ miễn phí',
        description5: 'Được cấp online bởi Công ty bảo hiểm, có giá trị tương đương bản giấy.',
    },
    {
        icon: icon4,
        icon2: carr4,
        icon3: star,
        title: 'Ưu đãi hấp dẫn',
        title2: 'Ngập nước',
        title3: 'Hướng dẫn chọn Nhà bảo hiểm phù hợp',
        title5: 'Giảm thiểu tổn thất',
        description2: 'Hỗ trợ cứu hộ và chi trả chi phí sửa chữa',
        description: 'Các chương trình ưu đãi hấp dẫn từ Saladin và các đối tác được cập nhật liên tục',
        description5:
            'Thực hiện các biện pháp giảm thiểu tổn thất về người và tài sản, giữ nguyên hiện trường nếu có thể.',
    },
    {
        icon: icon5,
        icon2: carr5,
        icon3: star,
        title: 'Đội ngũ CSKH hỗ trợ 24/7',
        title2: 'Cố ý phá hoại',
        title3: 'Cách tính các phí bảo hiểm vật chất xe ô tô',
        title5: 'Liên hệ hỗ trợ',
        description2: 'Chi trả chi phí khắc phục hậu quả',
        description:
            'Hỗ trợ bạn trong suốt quá trình Tư vấn - Chọn mua bảo hiểm - Thanh toán - Cấp chứng nhận - Bồi thường.',
        description5: 'Gọi ngay hotline trên giấy chứng nhận bảo hiểm để thông báo sự cố và được hướng dẫn chi tiết.',
    },
    {
        icon: icon6,
        icon3: Ip,
        title: 'Trả góp 0% siêu tiết kiệm',
        title3: 'Phân biệt trọng tải - tải trọng và cách tìm trọng tải xe tải',
        title5: 'Gửi yêu cầu bồi thường',
        description: 'Saladin hỗ trợ bạn trả góp phí bảo hiểm kỳ hạn từ 03 đến 12 tháng KHÔNG LÃI SUẤT.',
        description5: 'Thu thập đủ hồ sơ, chứng từ bồi thường và gửi đơn vị bảo hiểm.',
    },
];

const { Panel } = Collapse;

const InsuranceAutomotivePhysical = () => {
    const [activeButton, setActiveButton] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    const handleScrollTo = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        const section1 = document.getElementById('1');
        const section2 = document.getElementById('2');
        const section3 = document.getElementById('3');
        const section4 = document.getElementById('4');
        const section5 = document.getElementById('5');

        if (section1 && currentScrollY < section1.offsetTop + section1.offsetHeight) {
            setActiveButton('1');
            setIsMenuVisible(false);
        } else if (section2 && currentScrollY < section2.offsetTop + section2.offsetHeight) {
            setActiveButton('2');
            setIsMenuVisible(true);
        } else if (section3 && currentScrollY < section3.offsetTop + section3.offsetHeight) {
            setActiveButton('3');
            setIsMenuVisible(true);
        } else if (section4 && currentScrollY >= section4.offsetTop) {
            setActiveButton('4');
            setIsMenuVisible(true);
        } else if (section5 && currentScrollY >= section5.offsetTop) {
            setActiveButton('5');
            setIsMenuVisible(false);
        } else {
            setActiveButton('');
            setIsMenuVisible(true);
        }
    }, []);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className={styles.container}>
            {isMenuVisible && (
                <div
                    style={{
                        position: 'fixed',
                        maxWidth: '800px',
                        margin: 'auto',
                        top: 'var(--header-height)',
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        backgroundColor: 'transparent',
                        padding: '10px 0',
                        display: activeButton === '4' ? 'none' : 'block',
                    }}
                >
                    <Row justify="space-around">
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                backgroundColor: activeButton === '1' ? '#4caf50' : 'white',
                                color: activeButton === '1' ? 'white' : '#4caf50',
                                border: activeButton === '1' ? 'none' : '1px solid #4caf50',
                                borderRadius: activeButton === '1' ? '10px' : '10px',
                            }}
                            onClick={() => handleScrollTo('1')}
                        >
                            Giới thiệu bảo hiểm
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            style={{
                                backgroundColor: activeButton === '2' ? '#4caf50' : 'white',
                                color: activeButton === '2' ? 'white' : '#4caf50',
                                border: activeButton === '2' ? 'none' : '1px solid #4caf50',
                                borderRadius: activeButton === '2' ? '10px' : '10px',
                            }}
                            onClick={() => handleScrollTo('2')}
                        >
                            An tâm di chuyển
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            style={{
                                backgroundColor: activeButton === '3' ? '#4caf50' : 'white',
                                color: activeButton === '3' ? 'white' : '#4caf50',
                                border: activeButton === '3' ? 'none' : '1px solid #4caf50',
                                borderRadius: activeButton === '3' ? '10px' : '10px',
                            }}
                            onClick={() => handleScrollTo('3')}
                        >
                            Hướng dẫn bồi thường
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            style={{
                                backgroundColor: 'white',
                                color: '#4caf50',
                                border: '1px solid #4caf50',
                                borderRadius: '10px',
                            }}
                        >
                            Danh sách cơ sở sửa chữa
                        </Button>
                    </Row>
                </div>
            )}

            {/* Hàng 1 */}
            <Row
                justify="center"
                align="middle"
                style={{
                    height: '110vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    paddingTop: '60px',
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

            {/* Hàng 2 */}
            <div style={{ backgroundColor: '#f4fff9', padding: '20px 0' }}>
                <Row
                    justify="center"
                    align="middle"
                    gutter={[16, 16]}
                    className={styles.lgImage}
                    style={{ marginLeft: 'auto', marginRight: 'auto', padding: 5 }}
                    id="1"
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
                <Row justify="center" style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
                    <Col span={24}>
                        <Row justify="space-around">
                            <Button
                                type="primary"
                                size="large"
                                style={{ backgroundColor: '#38b245', border: 'none' }}
                                onClick={() => handleScrollTo('1')}
                            >
                                Giới thiệu bảo hiểm
                            </Button>
                            <Button
                                type="default"
                                size="large"
                                className={styles.themedRow}
                                onClick={() => handleScrollTo('2')}
                            >
                                An tâm di chuyển
                            </Button>
                            <Button
                                type="default"
                                size="large"
                                className={styles.themedRow}
                                onClick={() => handleScrollTo('3')}
                            >
                                Hướng dẫn bồi thường
                            </Button>
                            <Button type="default" size="large" className={styles.themedRow}>
                                Danh sách cơ sở sửa chữa
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </div>

            <Row justify="center" style={{ marginTop: 30, textAlign: 'center' }}>
                <Col span={20}>
                    <h1 id="5">Giới thiệu bảo hiểm</h1>
                    <p style={{ margin: 'auto', minWidth: '900px' }}>
                        Bảo hiểm vật chất xe ô tô là bảo hiểm tự nguyện dành cho các loại xe ô tô tham gia giao thông
                        trên lãnh thổ Việt Nam. Khi xảy ra sự cố, công ty bảo hiểm sẽ bồi thường cho những thiệt hại vật
                        chất xe xảy ra do những tai nạn bất ngờ, và ngoài sự kiểm soát của chủ xe. Tuỳ vào nhu cầu sử
                        dụng, khách hàng có thể lựa chọn nhiều quyền lợi bổ sung khác nhau:
                    </p>
                    <Row
                        justify="center"
                        style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
                    >
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

            {/* hàng 3 */}
            <div style={{ padding: '50px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    Vì sao nên chọn bảo hiểm xe ô tô của Saladin?
                </h1>
                <Row gutter={[32, 32]} style={{ maxWidth: '1000px', margin: 'auto' }}>
                    {features.map((feature) => (
                        <Col xs={24} sm={12} md={8} key={feature.title}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    border: '0',
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
            <div style={{ padding: '50px', backgroundColor: '#f4fff9' }} id="2">
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    An tâm vì xe của bạn luôn được bảo vệ
                </h1>
                <Row gutter={[32, 32]} style={{ maxWidth: '1050px', margin: 'auto' }}>
                    {features.slice(0, 5).map((feature, index) => (
                        <Col xs={24} sm={12} md={index < 3 ? 8 : 12} key={feature.title}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    border: '0',
                                    backgroundColor: '#f4fff9',
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
            {/* Trang 5 */}
            <div style={{ padding: '50px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    Có thể bạn cần biết
                </h1>
                <Row gutter={[32, 32]} style={{ maxWidth: '1100px', margin: 'auto' }}>
                    {features.map((feature, index) => (
                        <Col xs={24} sm={12} md={8} key={feature.title}>
                            <Card className={`${styles.featureCard} ${styles[`cardColor${(index % 6) + 1}`]}`}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{feature.title3}</h3>
                                <div className={styles.featureContent}>
                                    <button className={styles.featureButton}>
                                        Đọc thêm
                                        <ArrowRightOutlined style={{ marginLeft: '8px' }} />
                                    </button>
                                    <img src={feature.icon3} alt={feature.title} className={styles.featureIcon2} />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            {/* Trang 6 */}
            <div style={{ padding: '50px', backgroundColor: '#f4fff9' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#4caf50' }}>Dịch vụ hỗ trợ nhanh chóng</h1>
                <p style={{ margin: '0 auto', minWidth: '600px', marginBottom: '30px', textAlign: 'center' }}>
                    Các sản phẩm bảo hiểm từ các nhà cung cấp bảo hiểm hàng đầu với các dịch vụ hỗ trợ
                </p>
                <Row gutter={[32, 32]} style={{ maxWidth: '1050px', margin: 'auto' }}>
                    {features.slice(0, 3).map((feature, index) => (
                        <Col xs={24} sm={12} md={index < 3 ? 8 : 12} key={feature.title}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <img src={feature.icon4} alt={feature.title} className={styles.featureIcon4} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{feature.title4}</h3>
                                <p>{feature.description4}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <h1
                    id="3"
                    style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        marginBottom: '50px',
                        color: '#4caf50',
                        marginTop: '70px',
                    }}
                >
                    Hướng dẫn bồi thường
                </h1>
                <Row
                    gutter={[32, 32]}
                    style={{ maxWidth: '1050px', margin: 'auto', marginTop: '32px', padding: '20px' }}
                >
                    <Col xs={24} sm={12} md={12} style={{ paddingRight: '30px' }}>
                        {' '}
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                            <img
                                src={Claim}
                                alt="Đường dẫn ảnh"
                                style={{
                                    maxWidth: '80%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    marginTop: '60px',
                                }}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} style={{ paddingRight: '0px' }}>
                        {' '}
                        <Row gutter={[32, 32]}>
                            {features.slice(3, 6).map((feature, index) => (
                                <Col xs={24} key={feature.title}>
                                    <Card
                                        className={styles.featureCard}
                                        style={{
                                            border: '1px solid #4caf50',
                                        }}
                                    >
                                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#4caf50' }}>
                                            {' '}
                                            {`${index + 1}. ${feature.title5}`}
                                        </h3>
                                        <p>{feature.description5}</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
            {/* Trang 7 */}
            
            {/* trang 8 */}
            <div style={{ backgroundColor: 'rgb(244, 255, 249)', height: '40vh' }}>
                <Row gutter={[32, 32]} style={{ maxWidth: '1050px', margin: 'auto' }}>
                    <Col
                        span={24}
                        style={{
                            marginTop: '32px',
                            maxWidth: '900px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 auto',
                        }}
                    >
                        <h2 style={{ textAlign: 'center' }} id="4">
                            Câu hỏi thường gặp
                        </h2>
                        <Collapse accordion>
                            <Panel
                                header="Câu hỏi 1: Làm thế nào để mua bảo hiểm?"
                                key="1"
                                style={{ maxHeight: '100px', overflow: 'hidden' }}
                            >
                                <p>
                                    Giải thích: Bạn có thể mua bảo hiểm qua trang web của chúng tôi hoặc liên hệ với
                                    nhân viên tư vấn.
                                </p>
                            </Panel>
                            <Panel
                                header="Câu hỏi 2: Thời gian xử lý yêu cầu bảo hiểm là bao lâu?"
                                key="2"
                                style={{ maxHeight: '100px', overflow: 'hidden' }}
                            >
                                <p>Giải thích: Thời gian xử lý yêu cầu bảo hiểm thường mất từ 3 đến 5 ngày làm việc.</p>
                            </Panel>
                            <Panel
                                header="Câu hỏi 3: Tôi có thể thay đổi thông tin bảo hiểm không?"
                                key="3"
                                style={{ maxHeight: '100px', overflow: 'hidden' }}
                            >
                                <p>
                                    Giải thích: Có, bạn có thể thay đổi thông tin bảo hiểm bằng cách liên hệ với chúng
                                    tôi.
                                </p>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default InsuranceAutomotivePhysical;
