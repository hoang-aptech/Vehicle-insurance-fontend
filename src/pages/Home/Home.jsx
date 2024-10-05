import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Carousel, Typography, Form, Input, Select, Button } from 'antd';
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

const carouselImages = [carou1, carou2, carou3, carou4, carou5, carou6, carou7];

// const insuranceData = [
//     {
//         icon: '✈️',
//         title: 'Du lịch quốc tế',
//         tag: 'HOT',
//     },
//     {
//         icon: '🚗',
//         title: 'TNDS Ô tô',
//     },
//     {
//         icon: '🚚',
//         title: 'Vật chất Ô tô',
//         tag: 'MỚI',
//     },
//     {
//         icon: '🩺',
//         title: 'Sức khỏe',
//     },
//     {
//         icon: '🩹',
//         title: 'Tai nạn 24/24',
//     },
//     {
//         icon: '🛵',
//         title: 'TNDS Xe máy',
//     },
//     {
//         icon: '🏠',
//         title: 'Nhà tư nhân',
//     },
//     {
//         icon: '🦠',
//         title: 'Sức khỏe & Ung thư',
//         tag: 'MỚI',
//     },
// ];

const data = [
    {
        icon: home1,
        title: 'Nền tảng bảo hiểm công nghệ đa giải pháp',
        features: [
            'Đa dạng nhà cung cấp',
            'Đa dạng sản phẩm bảo hiểm',
            'Đa dạng đối tác liên kết',
            'Đa dạng phương thức thanh toán',
        ],
    },
    {
        icon: home2,
        title: 'Mua và bồi thường bảo hiểm trực tuyến',
        features: [
            'Mua trực tuyến các gói bảo hiểm với chi phí hợp lý, cạnh tranh, minh bạch',
            'Chủ động tạo yêu cầu bồi thường trực tuyến tiện lợi',
        ],
    },
    {
        icon: home3,
        title: 'Đội ngũ giàu kinh nghiệm hỗ trợ tận tâm 24/7',
        features: [
            'Hỗ trợ trong suốt quá trình Tư vấn - Chọn gói bảo hiểm - Thanh toán - Cấp chứng nhận - Bồi thường',
            'Công cụ chat trực tiếp ngay trên website',
        ],
    },
];

const partnersData = [
    {
        title: 'Đối tác bảo hiểm',
        description: 'Saladin liên kết với nhà cung cấp bảo hiểm hàng đầu để mang đến cho bạn nhiều sự lựa chọn nhất',
        images: [lg1, lg2, lg3, lg4, lg5, lg6, lg7, lg8, lg9],
    },
    {
        title: 'Đối tác liên kết',
        description:
            'Saladin liên kết với các doanh nghiệp để cung cấp các dịch vụ bảo hiểm bảo vệ toàn diện cho cuộc sống của bạn',
        images: [lg10, lg11, lg12, lg13, lg14, lg15, lg16, lg17, lg18],
    },
];

// form của trang 7
const ContactForm = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    const [insuranceDetails, setInsuranceDetails] = useState([]);
    const onFinish = async (values) => {
        try {
          const newAdvertisement = {
            customerName: values.name,
            customerPhone: values.phone,
            customerEmail: values.email,
            type: values.product === 'Car' ? 0 : 1, 
          };
          const adResponse = await axios.post('https://localhost:7289/api/advertisements', newAdvertisement);
    
          if (adResponse.status === 201) {
            console.log('Advertisement added successfully.');
            const response = await axios.get(`https://localhost:7289/api/insurances/type/${values.product}`);
            setInsuranceDetails(response.data);
    
            const insuranceInfo = response.data.map(i => `
              Name: ${i.name}
              Description: ${i.description}
              Price: ${i.price}
            `).join('\n');
            const emailParams = {
              to_name: values.name,
              from_name: 'One Team',
              message: `Here are the available insurance packages for ${values.product}: \n${insuranceInfo}`,
              to_email: values.email,
            };
    
            emailjs.send('service_xe6f9kj', 'template_3z2uslk', emailParams, 'laGrWQghcmlQSS4rS')
              .then((result) => {
                console.log('Email successfully sent!');
                setSuccess(true);
              }, (error) => {
                console.log('Email failed to send:', error);
              });
          }
        } catch (error) {
          console.error("Error occurred:", error);
        }
      };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row gutter={[32, 32]} style={{ maxWidth: '1050px', margin: 'auto', marginTop: '32px', marginBottom: '40px' }}>
            <Col span={24}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#4caf50' }}>Tư vấn và hỗ trợ 24/7</h1>
                <p style={{ textAlign: 'center', minWidth: '600px', margin: 'auto' }}>
                    Đội ngũ Saladin luôn sẵn sàng hỗ trợ bạn trong suốt hành trình mua và sử dụng bảo hiểm.
                </p>
            </Col>
            <Col xs={24} sm={12} md={12}>
                <div
                    style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <h3>Thông tin bổ sung</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingTop: '20px' }}>
                        <PhoneOutlined
                            style={{
                                marginRight: '8px',
                                background: '#4caf50',
                                padding: '14px',
                                color: 'white',
                                borderRadius: '4px',
                            }}
                        />
                        <p style={{ marginTop: '-20px' }}>Hàng 1: Thông tin 1</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <MailOutlined
                            style={{
                                marginRight: '8px',
                                background: '#4caf50',
                                padding: '14px',
                                color: 'white',
                                borderRadius: '4px',
                            }}
                        />
                        <p style={{ marginTop: '-20px' }}>Hàng 2: Thông tin 2</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={QrZalo} alt="qr zalo" style={{ width: '50px', marginRight: '8px' }} />
                        <p style={{ marginTop: '-20px' }}>Hàng 3: Thông tin 3</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={QrFace} alt="qr face" style={{ width: '50px', marginRight: '8px' }} />
                        <p style={{ marginTop: '-20px' }}>Hàng 4: Thông tin 4</p>
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
                                <h2>Nhận tư vấn ngay</h2>
                                <p>Để lại thông tin để nhận tư vấn và ưu đãi từ Saladin nhé</p>
                                <Form.Item
                                    label="Họ và tên"
                                    name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Sản phẩm mà bạn quan tâm" name="product">
                                    <Select>
                                        <Option value="Car">Bảo hiểm vật chất xe ô tô</Option>
                                        <Option value="Motorbike">Bảo hiểm vật chất xe máy</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ background: '#4caf50' }}>
                                        Nhận tư vấn
                                    </Button>
                                </Form.Item>
                                {success && (
                                    <div className="success-message">
                                        Cảm ơn bạn đã liên hệ! Chúng tôi sẽ liên lạc với bạn sớm nhất có thể.
                                    </div>
                                )}
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Col>
            <img src={MascotSp} alt="" style={{ maxWidth: '800px', height: '30vh', margin: '0 auto' }}></img>
        </Row>
    );
};

const { Option } = Select;

const { Title, Paragraph } = Typography;

const Home = () => {
    const groupedImages = [];
    for (let i = 0; i < carouselImages.length; i += 2) {
        groupedImages.push(carouselImages.slice(i, i + 2));
    }

    const [insuranceData, setInsuranceData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7289/api/Insurances');
                setInsuranceData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/insurance-automotive-physical/${id}`);
    };

    return (
        <>
            <div className={`${styles.saladinContainer}`}>
                <div className={`${styles.saladinHeader}`}>
                    <div>
                        <h1>Bảo hiểm toàn diện cho người Việt</h1>
                        <p>Tự tin sống, tự tin yêu thương cùng Saladin</p>
                    </div>
                    <img src={Hero} alt="hero" />
                </div>

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

            {/* Carousel separated from the container */}
            <div style={{ height: '60vh' }}>
                <div className={`${styles.saladinCarouselContainer}`}>
                    <h2>Saladin có gì mới?</h2>
                    <Carousel autoplay dots={false}>
                        {groupedImages.map((group, index) => (
                            <div key={index} className={`${styles.saladinCarouselItem}`}>
                                <div className={`${styles.saladinCarouselImageContainer}`}>
                                    {group.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt={`Slide ${index * 2 + imgIndex + 1}`}
                                            className={`${styles.saladinCarouselImage}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            {/* trang 3 */}
            <div style={{ height: '90vh', backgroundColor: '#f8f8fa' }}>
                <Row justify="center" align="middle">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <img
                            src={mascos2}
                            alt="mascos2"
                            style={{ width: '350px', height: '40vh', marginLeft: '50%' }}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div style={{ padding: '2rem' }}>
                            <Title level={2}>
                                Trải nghiệm mua bảo hiểm
                                <br />
                                nhanh chóng và tiện lợi
                            </Title>
                            <Paragraph style={{ maxWidth: '500px' }}>
                                Tại Saladin, ngoài việc tìm thấy các lựa chọn sản phẩm bảo hiểm đa dạng từ tiêu chuẩn
                                đến nâng cao, khách hàng còn có thể tự do lựa chọn quyền lợi theo nhu cầu để tạo ra gói
                                bảo hiểm phù hợp nhất.
                            </Paragraph>
                            <Paragraph>
                                Giấy chứng nhận bảo hiểm trực tuyến được cấp và lưu trữ ngay trên ứng dụng.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16} style={{ margin: 'auto', maxWidth: '900px' }}>
                    {data.map((item) => (
                        <Col xs={24} sm={8} key={item.title}>
                            <Card style={{ border: 'none' }}>
                                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                    <img src={item.icon} alt={item.title} style={{ width: 64, height: 64 }} />
                                </div>
                                <h3>{item.title}</h3>
                                <ul>
                                    {item.features.map((feature) => (
                                        <li key={feature} style={{ fontSize: '12px' }}>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            {/* trang 4 */}
            <div style={{ backgroundColor: '#f6fbf8', height: '60vh', margin: '0 auto' }}>
                <div className={`${styles.saladinContainer2}`}>
                    {partnersData.map((partner, index) => (
                        <div key={index} className={`${styles.saladinBlock}`}>
                            <h2>{partner.title}</h2>
                            <p style={{ fontSize: '12px' }}>{partner.description}</p>
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
            <ContactForm />
        </>
    );
};

export default Home;
