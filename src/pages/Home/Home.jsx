import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Carousel, Typography, Form, Input, Select, Button, notification, Modal } from 'antd';
import styles from './Home.module.scss';
import Hero from '../../assets/Images/hero_mascot.png';
import carou1 from '../../assets/Images/anh1.png';
import carou2 from '../../assets/Images/anh2.png';
import carou3 from '../../assets/Images/anh3.png';
import carou4 from '../../assets/Images/anh4.png';
import carou5 from '../../assets/Images/anh5.png';
import carou6 from '../../assets/Images/anh6.jpg';
import carou7 from '../../assets/Images/anh7.jpg';
import mascos2 from '../../assets/Images/mascot_features.png';
import home1 from '../../assets/Images/home_feature_1.jpg';
import home2 from '../../assets/Images/home_feature_2.jpg';
import home3 from '../../assets/Images/home_feature_3.jpg';
import lg1 from '../../assets/Images/gl2.png';
import lg2 from '../../assets/Images/gl3.png';
import lg3 from '../../assets/Images/gl4.png';
import lg4 from '../../assets/Images/gl5.png';
import lg5 from '../../assets/Images/gl6.png';
import lg6 from '../../assets/Images/gl7.png';
import lg7 from '../../assets/Images/gl20.jpg';
import lg8 from '../../assets/Images/gl9.png';
import lg9 from '../../assets/Images/gl10.png';
import lg10 from '../../assets/Images/gl11.png';
import lg11 from '../../assets/Images/gl12.jpg';
import lg12 from '../../assets/Images/gl13.png';
import lg13 from '../../assets/Images/gl14.png';
import lg14 from '../../assets/Images/gl15.png';
import lg15 from '../../assets/Images/gl16.png';
import lg16 from '../../assets/Images/gl17.png';
import lg17 from '../../assets/Images/gl18.png';
import lg18 from '../../assets/Images/gl19.png';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import QrZalo from '../../assets/Images/qr.jpg';
import QrFace from '../../assets/Images/prface.png';
import MascotSp from '../../assets/Images/mascot_support.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import config from '~/config';

const carouselImages = [carou1, carou2, carou3, carou4, carou5, carou6, carou7, carou1];

const data = [
    {
        icon: home1,
        title: 'Multi-solution technology insurance platform',
        features: ['Diverse suppliers', 'Diverse insurance products', 'Diverse partners', 'Diverse payment methods'],
    },
    {
        icon: home2,
        title: 'Buy and compensate online insurance',
        features: [
            'Buy insurance packages online at reasonable, competitive, and transparent costs',
            'Proactively create convenient online claim requests',
        ],
    },
    {
        icon: home3,
        title: 'Experienced team providing dedicated support 24/7',
        features: [
            'Support throughout the process of Consulting - Choosing an insurance package - Payment - Issuing certificates - Compensation',
            'Live chat tool right on the website',
        ],
    },
];

const partnersData = [
    {
        title: 'Insurance Partners',
        description: 'One team partners with leading insurance providers to bring you the most choices',
        images: [lg1, lg2, lg3, lg4, lg5, lg6, lg7, lg8, lg9],
    },
    {
        title: 'Affiliate Partners',
        description:
            'Oneteam partners with businesses to provide comprehensive insurance protection services for your life',
        images: [lg10, lg11, lg12, lg13, lg14, lg15, lg16, lg17, lg18],
    },
];

const { Option } = Select;

const { Title, Paragraph } = Typography;

const Home = () => {
    const groupedImages = [];
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };
    for (let i = 0; i < carouselImages.length; i += 2) {
        groupedImages.push(carouselImages.slice(i, i + 2));
    }

    const [insuranceData, setInsuranceData] = useState([]);
    const navigate = useNavigate();

    const ContactForm = () => {
        const [form] = Form.useForm();
        const [success, setSuccess] = useState(false);
        const [insurancesData, setInsurancesData] = useState([]);
        // const [setInsuranceDetails] = useState([]);
        const onFinish = async (values) => {
            try {
                const newAdvertisement = {
                    customerName: values.name,
                    customerPhone: values.phone,
                    customerEmail: values.email,
                    type: values.product,
                };
                const adResponse = await axios.post('https://localhost:7289/api/advertisements', newAdvertisement);

                if (adResponse.status === 201) {
                    console.log('Advertisement added successfully.');
                    const response = await axios.get(`https://localhost:7289/api/insurances/type/${values.product}`);

                    const insuranceInfo = response.data
                        .map(
                            (i) => `
                      Name: ${i.name}
                      Package name: ${i.packageName}
                      Description: ${i.description}
                      Price: ${i.price}
                    `,
                        )
                        .join('\n');
                    const emailParams = {
                        to_name: values.name,
                        from_name: 'One Team',
                        message: `Here are the available insurance packages for ${values.product}: \n${insuranceInfo}`,
                        to_email: values.email,
                    };

                    emailjs.send('service_xe6f9kj', 'template_3z2uslk', emailParams, 'laGrWQghcmlQSS4rS').then(
                        (result) => {
                            console.log('Email successfully sent!');
                            openNotificationWithIcon(
                                'success',
                                'Email successfully sent',
                                'Thank you for contacting us! We will contact you as soon as possible.',
                            );
                            setSuccess(true);
                        },
                        (error) => {
                            console.log('Email failed to send:', error);
                        },
                    );
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Row
                gutter={[32, 32]}
                style={{ maxWidth: '1050px', margin: 'auto', marginTop: '32px', marginBottom: '40px' }}
            >
                <Col span={24}>
                    <h1 style={{ textAlign: 'center', fontSize: '4rem', color: '#4caf50' }}>
                        24/7 Consulting and Support
                    </h1>
                    <p style={{ textAlign: 'center', maxWidth: '800px', margin: 'auto', fontSize: '2.5rem' }}>
                        The Oneteam team is always ready to support you throughout your journey of buying and using
                        insurance.
                    </p>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <div className={styles.saladinMainContainer}>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>
                                <PhoneOutlined />
                            </div>
                            <div>
                                <p className={styles.contactText}>1900 638 454</p>
                                <p className={styles.contactSubtext}>24/7 support hotline</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>
                                <MailOutlined />
                            </div>
                            <div>
                                <p className={styles.contactText}>cs@saladin.vn</p>
                                <p className={styles.contactSubtext}>Email Saladin for support</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>
                                <img style={{ minWidth: '85px ', minHeight: '85px' }} src={QrZalo} alt="qr zalo" />
                            </div>
                            <div>
                                <p className={styles.contactText}>Saladin Zalo OA</p>
                                <p className={styles.contactSubtext}>Connect with Saladin on Zalo</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>
                                <img style={{ maxWidth: '85px', maxHeight: '85px' }} src={QrFace} alt="qr face" />
                            </div>
                            <div>
                                <p className={styles.contactText}>Saladin Facebook</p>
                                <p className={styles.contactSubtext}>Connect with Saladin on Facebook</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={12}>
                    <div
                        className="contact-form"
                        style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}
                    >
                        <Row justify="center" align="middle" style={{ height: '100%' }}>
                            <Col span={24}>
                                <Form
                                    form={form}
                                    name="basic"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    <h2>Get advice now</h2>
                                    <p>Leave your information to receive advice and offers from Oneteam.</p>
                                    <Form.Item
                                        label="Full name"
                                        name="name"
                                        rules={[
                                            { required: true, message: 'Please enter your full name!' },
                                            {
                                                min: 3,
                                                message: 'Full name must be at least 3 characters!',
                                            },
                                            {
                                                max: 50,
                                                message: 'Full name must not exceed 50 characters!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone number"
                                        name="phone"
                                        rules={[
                                            { required: true, message: 'Please enter phone number!' },
                                            {
                                                pattern: /^\+?\d{10,11}$/,
                                                message: 'Please enter a valid phone number!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please enter your email!' },
                                            { type: 'email', message: 'Please enter a valid email address!' },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Type of insurance you are interested in"
                                        name="product"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter type of insurance you are interested in!',
                                            },
                                        ]}
                                    >
                                        <Select>
                                            {insuranceData.map((i) => (
                                                <Option key={i.id} value={i.type}>
                                                    {i.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{ background: '#4caf50' }}>
                                            Get advice
                                        </Button>
                                    </Form.Item>
                                    {success && (
                                        <div className="success-message">
                                            Thank you for contacting us! We will contact you as soon as possible.
                                        </div>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <img src={MascotSp} alt="" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}></img>
            </Row>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7289/api/Insurances/root');
                console.log(response.data);

                setInsuranceData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (id) => {
        navigate(config.routes.insuranceDetails.replace(':id', id));
    };

    return (
        <>
            {contextHolder}
            <div className={`${styles.saladinMainContainer}`}>
                {/* Header section */}
                <div className={`${styles.saladinContainer}`}>
                    <Row justify="center" align="middle" className={styles.saladinHeader}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.textContainer}>
                            <h1>Comprehensive insurance for Vietnamese</h1>
                            <p>Live confidently, love confidently with Oneteam</p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <img src={Hero} alt="hero" />
                        </Col>
                    </Row>

                    {/* Insurance cards section */}
                    <Row gutter={[16, 16]} className={`${styles.saladinContent1}`}>
                        {insuranceData.map((insurance, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <Card className={`${styles.saladinCard}`} onClick={() => handleCardClick(insurance.id)}>
                                    {insurance.isNew && (
                                        <Tag className={`${styles.saladinTag}`} color="#f50">
                                            New
                                        </Tag>
                                    )}
                                    <div className={`${styles.saladinIcon}`}>{insurance.icon}</div>
                                    <div className={`${styles.saladinTitle}`}>{insurance.name}</div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                {/* Carousel section */}

                <div className={`${styles.saladinCarouselContainer}`}>
                    <h2>What's new in Oneteam?</h2>
                    <Carousel autoplay dots={false}>
                        {groupedImages.map((group, index) => (
                            <div key={index} className={`${styles.saladinCarouselItem}`}>
                                <Row gutter={[16, 16]} justify="center">
                                    {group.map((image, imgIndex) => (
                                        <Col
                                            xs={24}
                                            sm={12}
                                            key={imgIndex}
                                            className={`${styles.saladinCarouselImageContainer}`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Slide ${index * 2 + imgIndex + 1}`}
                                                className={`${styles.saladinCarouselImage}`}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </Carousel>
                </div>
                {/* Trang 3 section */}
                <div className={`${styles.saladinTrang3Container}`}>
                    <Row justify="center" align="middle">
                        <Col xs={24} sm={12} className={styles.imageContainer}>
                            <img
                                src={mascos2}
                                alt="mascos2"
                                style={{ width: '100%', height: 'auto', maxWidth: '350px' }}
                            />
                        </Col>
                        <Col xs={24} sm={12}>
                            <div style={{ padding: '2rem' }}>
                                <Title level={2} style={{ fontSize: '4rem', fontWeight: 'bold', maxWidth: '700px' }}>
                                    Insurance buying experience fast and convenient
                                </Title>
                                <Paragraph style={{ maxWidth: '500px', fontSize: '2rem' }}>
                                    At Oneteam, in addition to finding a variety of insurance product options from
                                    standard to advanced, customers can also freely choose benefits according to their
                                    needs to create the most suitable insurance package.
                                </Paragraph>
                                <Paragraph style={{ maxWidth: '500px', fontSize: '2rem' }}>
                                    Online insurance certificates are issued and stored directly on the application.
                                </Paragraph>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ margin: 'auto', maxWidth: '1200px' }}>
                        {data.map((item) => (
                            <Col xs={24} sm={8} key={item.title}>
                                <Card style={{ border: 'none' }}>
                                    <div className={styles.cardContainer}>
                                        <div style={{ marginBottom: 16 }}>
                                            <img
                                                src={item.icon}
                                                alt={item.title}
                                                style={{ width: 100, height: 100, margin: '0 auto' }}
                                            />
                                        </div>
                                        <h3>{item.title}</h3>
                                        <ul>
                                            {item.features.map((feature) => (
                                                <li key={feature}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                {/* Trang 4 section */}
                <div className={`${styles.saladinTrang4Container}`}>
                    <div className={`${styles.saladinContainer2}`}>
                        {partnersData.map((partner, index) => (
                            <div key={index} className={`${styles.saladinBlock}`}>
                                <h2>{partner.title}</h2>
                                <p>{partner.description}</p>
                                <Row gutter={[16, 16]} style={{ paddingTop: '20px' }}>
                                    {partner.images.map((image, imgIndex) => (
                                        <Col key={imgIndex} span={8} className={`${styles.saladinCol}`}>
                                            <Card className={`${styles.saladinCard2}`}>
                                                <img
                                                    src={image}
                                                    alt={image.split('.')[0]}
                                                    className={`${styles.saladinImage}`}
                                                />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ backgroundColor: '#f8f8fa', width: '100%' }}>
                    <ContactForm />
                </div>
            </div>
            <Modal title="Bank test" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h3>Bank account information to test</h3>
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
                <p>You can review all this information at the footer.</p>
            </Modal>
        </>
    );
};

export default Home;
