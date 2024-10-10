import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Button, Collapse } from 'antd';
import backgroundImage from '../../assets/Images/landing_car_bg.jpg';
import exampleImage from '../../assets/Images/mascot_car_com.png';
import baovietLogo from '../../assets/Images/baoviet_logo.png';
import pviLogo from '../../assets/Images/pvi.png';
import baominhLogo from '../../assets/Images/baominh_logo.png';
import libertyLogo from '../../assets/Images/liberty_logo.png';
import vniLogo from '../../assets/Images/pvi.png';
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
import { useParams } from 'react-router-dom';
import styles from './Insurancedetails.module.scss';

const images = {
    section1: {
        backgroundImage: backgroundImage,
        exampleImage: exampleImage,
    },
    section2: {
        partnerLogos: [
            { image: baovietLogo, alt: 'Baoviet Logo' },
            { image: pviLogo, alt: 'PVI Logo' },
            { image: baominhLogo, alt: 'Bao Minh Logo' },
            { image: libertyLogo, alt: 'Liberty Logo' },
            { image: vniLogo, alt: 'VNI Logo' },
        ],
        benefits: [{ image: car1 }, { image: car2 }, { image: car3 }],
    },
    section3: {
        features: [
            { image: icon1 },
            { image: icon2 },
            { image: icon3 },
            { image: icon4 },
            { image: icon5 },
            { image: icon6 },
        ],
    },
    section4: {
        claims: [{ image: carr }, { image: carr2 }, { image: carr3 }, { image: carr4 }, { image: carr5 }],
        bannerImage: carbanner,
    },
    section5: {
        features5: [{ image: Ip }, { image: star }, { image: chat }, { image: star }, { image: star }, { image: Ip }],
    },
    section6: {
        features6: [{ image: Garage }, { image: Inspection }, { image: Rescue }],
        image: Claim,
    },
};

const { Panel } = Collapse;

const InsuranceAutomotivePhysical = () => {
    const { id } = useParams();
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

    // lấy data text
    const [dataApi, setDataApi] = useState({
        section1: {
            title: '',
            subtitle: '',
            description: '',
            buttonText1: '',
            buttonText2: '',
            image: '',
        },
        section2: {
            partnerLogos: [],
            buttons: [],
            benefitTitle: '',
            description: '',
            benefits: [],
            image: '',
        },
        section3: {
            title: '',
            features: [],
            image: '',
        },
        section4: {
            title: '',
            claims: [],
            image: '',
        },
        section5: {
            title: '',
            features5: [],
            image: '',
        },
        section6: {
            title: '',
            description: '',
            features6: [],
            steps: [],
            title6: '',
            image: '',
        },
        section7: {
            title: '',
            questions7: [],
            image: '',
        },
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7289/api/Insurancecontents/Insurance/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const filteredData = await response.json();

                const updatedData = {
                    section1: {
                        title: filteredData.find((item) => item.id)?.title || '',
                        subtitle: filteredData.find((item) => item.contentType === 'subtitle')?.title || '',
                        description: filteredData.find((item) => item.contentType === 'description')?.description || '',
                        buttonText1: filteredData.find((item) => item.contentType === 'buttonText1')?.title || '',
                        buttonText2: filteredData.find((item) => item.contentType === 'buttonText2')?.title || '',
                        image: filteredData.find((item) => item.contentType === 'title')?.image || '',
                    },
                    section2: {
                        buttons: filteredData
                            .filter((item) => item.contentType === 'buttons')
                            .map((item) => ({ text: item.title })),
                        benefitTitle: filteredData.find((item) => item.contentType === 'benefitTitle')?.title || '',
                        description: filteredData.find((item) => item.contentType === 'Description')?.description || '',
                        benefits: filteredData
                            .filter((item) => item.contentType === 'benefits')
                            .map((item) => ({ title: item.title })),
                    },
                    section3: {
                        title: filteredData.find((item) => item.contentType === 'title2')?.title || '',
                        features: filteredData
                            .filter((item) => item.contentType === 'features')
                            .map((item) => ({ title: item.title, description: item.description })),
                    },
                    section4: {
                        title: filteredData.find((item) => item.contentType === 'title3')?.title || '',
                        claims: filteredData
                            .filter((item) => item.contentType === 'claims')
                            .map((item) => ({ title: item.title, description: item.description })),
                    },
                    section5: {
                        title: filteredData.find((item) => item.contentType === 'title4')?.title || '',
                        features5: filteredData
                            .filter((item) => item.contentType === 'features5')
                            .map((item) => ({ title: item.title })),
                    },
                    section6: {
                        title: filteredData.find((item) => item.contentType === 'title5')?.title || '',
                        description:
                            filteredData.find((item) => item.contentType === 'description2')?.description || '',
                        features6: filteredData
                            .filter((item) => item.contentType === 'features13')
                            .map((item) => ({ title: item.title, description: item.description })),
                        steps: filteredData
                            .filter((item) => item.contentType === 'steps')
                            .map((item) => ({ title: item.title, description: item.description })),
                        title6: filteredData.find((item) => item.contentType === 'title6')?.title || '',
                    },
                    section7: {
                        title: filteredData.find((item) => item.contentType === 'title7')?.title || '',
                        questions7: filteredData
                            .filter((item) => item.contentType === 'questions7')
                            .map((item) => ({ header: item.title, description: item.description })),
                    },
                };

                setDataApi(updatedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className={styles.container}>
            {isMenuVisible && (
                <div
                    style={{
                        backgroundColor: '#f8fafa',
                        position: 'fixed',
                        maxWidth: '100%',
                        margin: 'auto',
                        height: '10vh',
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        padding: '10px 0',
                        display: activeButton === '4' ? 'none' : 'block',
                    }}
                >
                    <div
                        style={{
                            position: 'fixed',
                            maxWidth: '900px',
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
                        <img src={dataApi.section1.image} alt="Thông tin bảo hiểm" />

                        <Row justify="space-around">
                            {dataApi.section2.buttons.map((button, index) => (
                                <Button
                                    type={index === 0 ? 'primary' : 'default'}
                                    size="large"
                                    style={{
                                        backgroundColor: activeButton === (index + 1).toString() ? '#4caf50' : 'white',
                                        color: activeButton === (index + 1).toString() ? 'white' : '#4caf50',
                                        border: activeButton === (index + 1).toString() ? 'none' : '1px solid #4caf50',
                                        borderRadius: '10px',
                                        flex: 1,
                                        margin: '0 10px',
                                    }}
                                    onClick={() => handleScrollTo((index + 1).toString())}
                                    key={index}
                                >
                                    {button.text}
                                </Button>
                            ))}
                        </Row>
                    </div>
                </div>
            )}

            {/* Hàng 1 */}
            <Row
                justify="center"
                align="middle"
                style={{
                    height: '110vh',
                    backgroundImage: `url(${require('../../assets/Images/landing_car_bg.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    paddingTop: '60px',
                }}
            >
                <Col span={11} className={styles.leftColumn} style={{ marginTop: '-150px' }}>
                    <h1 className={styles.welcomeTitle}>{dataApi.section1.title}</h1>
                    <h2 className={styles.welcomeTitle2}>{dataApi.section1.subtitle}</h2>
                    <p>{dataApi.section1.description}</p>
                    <Row gutter={16} className={styles.buttonGroup}>
                        <Col>
                            <Button className={styles.greenButton}>{dataApi.section1.buttonText1}</Button>
                        </Col>
                        <Col>
                            <Button className={styles.backButton}>{dataApi.section1.buttonText2}</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={11} style={{ marginBottom: '150px', paddingLeft: 15 }}>
                    <img
                        src={images.section1.exampleImage}
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
                    {images.section2.partnerLogos.map((logo, index) => (
                        <Col xs={12} sm={8} md={6} lg={4} className={styles.partnerCol} key={index}>
                            <img src={images.section2.partnerLogos[index].image} alt={logo.alt} />
                        </Col>
                    ))}
                </Row>
                <Row justify="center" style={{ maxWidth: '900px', margin: 'auto', marginTop: '50px' }}>
                    <Col span={24}>
                        <Row justify="space-around">
                            {dataApi.section2.buttons.map((button, index) => (
                                <Button
                                    type={index === 0 ? 'primary' : 'default'}
                                    size="large"
                                    className={styles.themedRow}
                                    onClick={() => handleScrollTo((index + 1).toString())}
                                    key={index}
                                >
                                    {button.text}
                                </Button>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* Benefits Section */}
            <Row justify="center" style={{ marginTop: 30, textAlign: 'center' }} className={styles.benefitHeader}>
                <Col span={20}>
                    <h1 id="5">{dataApi.section2.benefitTitle}</h1>
                    <h6 id="5">{dataApi.section2.description}</h6>
                    <p style={{ margin: 'auto', minWidth: '900px' }}>{dataApi.section2.benefitDescription}</p>
                    <Row
                        justify="center"
                        style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
                    >
                        {dataApi.section2.benefits.map((benefit, index) => (
                            <Col span={8} className={styles.benefitItem} key={index}>
                                <img
                                    src={images.section2.benefits[index].image}
                                    alt=""
                                    className={styles.benefitImage}
                                />
                                <p>{benefit.title}</p>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Hàng 3 */}
            <div style={{ padding: '50px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    {dataApi.section3.title}
                </h1>
                <Row gutter={[32, 32]} style={{ maxWidth: '1000px', margin: 'auto' }}>
                    {dataApi.section3.features.slice(0, 6).map((feature, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    border: '0',
                                }}
                            >
                                <img
                                    src={images.section3.features?.[index]?.image}
                                    alt=""
                                    className={styles.featureIcon}
                                />
                                <p>{feature.description}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Hàng 4 */}
            <div style={{ padding: '50px', backgroundColor: '#f4fff9', margin: 'auto' }} id="2">
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    {dataApi.section4.title}
                </h1>
                <Row gutter={[32, 32]} style={{ maxWidth: '1200px', margin: 'auto', justifyContent: 'center' }}>
                    {dataApi.section4.claims.map((claim, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    border: '0',
                                    backgroundColor: '#f4fff9',
                                }}
                            >
                                <img
                                    src={images.section4.claims[index].image}
                                    alt={claim.title}
                                    className={styles.featureIcon}
                                />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{claim.title}</h3>
                                <p>{claim.description}</p>
                            </Card>
                        </Col>
                    ))}
                    <img src={images.section4.bannerImage} alt="" className={styles.bannerImage} />
                </Row>
            </div>

            {/* Hàng 5 */}
            <div style={{ padding: '50px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '50px', color: '#4caf50' }}>
                    {dataApi.section5.title}
                </h1>
                <Row gutter={[32, 32]} style={{ maxWidth: '1100px', margin: 'auto' }}>
                    {dataApi.section5.features5.map((feature, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card className={`${styles.featureCard} ${styles[`cardColor${(index % 6) + 1}`]}`}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{feature.title}</h3>
                                <div className={styles.featureContent}>
                                    <button className={styles.featureButton}>
                                        Đọc thêm
                                        <ArrowRightOutlined style={{ marginLeft: '8px' }} />
                                    </button>
                                    <img
                                        src={images.section5.features5[index].image}
                                        alt={feature.title}
                                        className={styles.featureIcon2}
                                    />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Hàng 6 */}
            <div style={{ padding: '50px', backgroundColor: '#f4fff9' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#4caf50' }}>{dataApi.section6.title}</h1>
                <p
                    style={{
                        margin: '0 auto',
                        minWidth: '600px',
                        marginBottom: '30px',
                        textAlign: 'center',
                        fontSize: '1.5rem',
                    }}
                >
                    {dataApi.section6.description}
                </p>

                <Row gutter={[32, 32]} style={{ maxWidth: '1050px', margin: 'auto' }}>
                    {dataApi.section6.features6.map((feature, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                className={styles.featureCard}
                                style={{
                                    textAlign: 'center',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <img
                                    src={images.section6.features6[index].image}
                                    alt={feature.title}
                                    className={styles.featureIcon4}
                                />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{feature.title}</h3>
                                <h6 style={{ fontSize: '1rem', fontWeight: '500' }}>{feature.description}</h6>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <h1
                    id="3"
                    style={{
                        textAlign: 'center',
                        fontSize: '4rem',
                        marginBottom: '50px',
                        color: '#4caf50',
                        marginTop: '70px',
                    }}
                >
                    {dataApi.section6.title6}
                </h1>

                <Row
                    gutter={[32, 32]}
                    style={{ maxWidth: '1050px', margin: 'auto', marginTop: '32px', padding: '20px' }}
                >
                    <Col xs={24} sm={12} md={12} style={{ paddingRight: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                            <img
                                src={images.section6.image}
                                alt="Hướng dẫn bồi thường"
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
                        <Row gutter={[32, 32]} style={{ textAlign: 'none' }}>
                            {dataApi.section6.steps.map((step, index) => (
                                <Col xs={24} key={index}>
                                    <Card
                                        className={styles.featureCard}
                                        style={{
                                            border: '1px solid #4caf50',
                                            padding: '20px',
                                        }}
                                    >
                                        <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50' }}>
                                            {`${index + 1}. ${step.title}`}
                                        </h3>
                                        <p>{step.description}</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* Hàng 7 */}
            <div style={{ backgroundColor: 'rgb(244, 255, 249)', height: '40vh', padding: '20px 0' }}>
                <Row gutter={[32, 32]} style={{ maxWidth: '1050px', margin: 'auto' }}>
                    <Col
                        span={24}
                        style={{
                            // marginTop: '32px',
                            maxWidth: '900px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 auto',
                            padding: '20px',
                            borderRadius: '10px',
                        }}
                    >
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }} id="4">
                            {dataApi.section7.title}
                        </h2>
                        <Collapse accordion style={{ width: '100%' }}>
                            {dataApi.section7.questions7.map((question, index) => (
                                <Panel
                                    header={question.header}
                                    key={index}
                                    style={{ maxHeight: '100px', overflow: 'hidden', padding: '0px' }}
                                >
                                    <p style={{ maxWidth: '100%', marginTop: '-20px' }}>{question.description}</p>
                                </Panel>
                            ))}
                        </Collapse>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default InsuranceAutomotivePhysical;
