import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Form, Input, Button, Collapse, Card, notification } from 'antd';
import Truck from '../../assets/Images/tainan.jpg';
import styles from './BlogDetails.module.scss';
import Menu from '../../assets/Images/menu.png';
import Si from '../../assets/Images/Si-CarCom.png';
import { PhoneOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import axios from 'axios';
import Ima1 from '../../assets/Images/ima1.png';
import Ima2 from '../../assets/Images/imga2.png';
import Ima3 from '../../assets/Images/imga3.png';
import config from '~/config';

const BlogDetails = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };
    const { Title, Paragraph } = Typography;
    const { Panel } = Collapse;
    const { id } = useParams();
    const [blogData, setBlogData] = useState({});
    const [relatedPosts, setRelatedPosts] = useState([]);

    // Hàm để lưu dữ liệu blog
    const getBlogData = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/news/${id}`);
            const res2 = await axios.get(process.env.REACT_APP_BACKEND_URL + `/news/related`);
            if (res.status === 200) {
                const data = res.data;
                console.log(res.data);
                setBlogData({
                    title: data.name,
                    dateCreate: data.createdAt.slice(0, 10),
                    content: data.description,
                });
            }
            if (res2.status === 200) {
                const dataRelatedPosts = res2.data.map((rp) => ({
                    title: rp.name,
                    description: rp.description,
                    link: config.routes.blogDetails.replace(':id', rp.id),
                    image: rp.image,
                }));

                setRelatedPosts(dataRelatedPosts);
                // setRelatedPosts(relatedPosts);
            }
        } catch (e) {
            openNotificationWithIcon('error', 'No posts found', 'Redirecting to home page ...');
            setTimeout(() => {
                navigate(config.routes.home);
            }, 1000);
        }
    };

    const { Meta } = Card;

    const [isCollapseVisible, setIsCollapseVisible] = useState(false);

    const handleToggle = () => {
        setIsCollapseVisible(!isCollapseVisible);
    };

    // const onFinish = (values) => {
    //     console.log('Received values:', values);
    //     // logic chưa nghĩ ra
    // };

    const { TextArea } = Input;

    useEffect(() => {
        getBlogData();
    }, [id]);

    return (
        <div className={styles.blogContainer}>
            {contextHolder}
            <div className={styles.Link}>
                <Link to={config.routes.blog} style={{ marginRight: '10px', color: 'green', textDecoration: 'none' }}>
                    One team Blog
                </Link>
                /
                <Link
                    to={config.routes.insuranceDetails.replace(':id', 1)}
                    style={{ marginLeft: '10px', color: 'green', textDecoration: 'none' }}
                >
                    Car insurance
                </Link>
            </div>
            <Title level={1} className={styles.blogTitle}>
                {blogData.title}
            </Title>
            <Title level={5} className={styles.blogDate}>
                {blogData.dateCreate}
            </Title>

            <Row gutter={16}>
                {/* Phần MỤC LỤC (70% bên trái) */}
                <Col span={24}>
                    <div style={{ backgroundColor: '#f6fefa', padding: '10px', marginBottom: '20px' }}>
                        <Button onClick={handleToggle} style={{ maxWidth: '44px', height: '37px', marginLeft: '5px' }}>
                            <img src={Menu} alt="menu" />
                        </Button>
                        <Collapse activeKey={isCollapseVisible ? '1' : ''} bordered={false}>
                            <Panel
                                header="Index"
                                key="1"
                                showArrow={false}
                                style={{ fontSize: '18px', fontWeight: 'bold' }}
                            >
                                <ul style={{ fontSize: '12px' }}>
                                    <p>I. Updating ...</p>
                                    <p>II. Updating ...</p>
                                </ul>
                            </Panel>
                        </Collapse>
                    </div>
                    {/* Nội dung chính */}
                    <Paragraph>
                        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
                    </Paragraph>
                </Col>

                {/* Sidebar (30% bên phải) */}
                {/* <Col span={7} className={styles.sidebar}>
                    <Paragraph>sidebar</Paragraph>
                </Col> */}
            </Row>

            {/* Comment Form */}
            {/* <div style={{ margin: '20px 0' }}>
                <Typography.Title level={3}>Để lại bình luận của bạn</Typography.Title>
                <Form name="comment" onFinish={onFinish} layout="vertical" initialValues={{ remember: true }}>
                    <Form.Item
                        name="name"
                        label="Tên của bạn"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input placeholder="Nhập tên của bạn" />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label="Nội dung bình luận"
                        rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}
                    >
                        <TextArea rows={4} placeholder="Nhập bình luận của bạn" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Gửi bình luận
                        </Button>
                    </Form.Item>
                </Form>
            </div> */}

            <div>
                <h2 style={{ textAlign: 'center' }} className={styles.titleItem}>
                    Related Articles
                </h2>
                <Row gutter={[16, 16]}>
                    {relatedPosts.map((item) => (
                        <Col xs={24} sm={12} md={8} key={item.title}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={item.title}
                                        src={`data:image/png;base64,${item.image}`}
                                        style={{ height: 150, objectFit: 'cover' }}
                                    />
                                }
                            >
                                <Meta
                                    title={<Link to={item.link}>{item.title}</Link>}
                                    description={
                                        <div
                                            className={styles.descriptionRelatedArticles}
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    }
                                />
                                <div style={{ marginTop: 16 }}>
                                    <SafetyCertificateOutlined style={{ marginRight: 8 }} /> ONE TEAM INSURANCE
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default BlogDetails;
