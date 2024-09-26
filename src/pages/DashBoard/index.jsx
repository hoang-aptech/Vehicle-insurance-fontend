import React from 'react';
import { Row, Col, Typography, Button, Card, Avatar } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined, BellOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
    return (
        <div className="Dashboard-container">
            <div style={{ padding: '2rem' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={2}>
                            Welcome to your dashboard, <span style={{ color: '#1890ff' }}>Aptech</span>
                        </Title>
                        <p>Hieu.lq.2203@aptechlearning.edu.vn</p>
                    </Col>
                    <Col>
                        <BellOutlined style={{ marginRight: '0.5rem' }} />
                        <Button type="primary" style={{ marginRight: '1rem' }}>
                            Log out
                        </Button>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginTop: '2rem' }}>
                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card>
                                    <Card.Meta
                                        avatar={
                                            <Avatar
                                                icon={<UserOutlined />}
                                                size="large"
                                                style={{ backgroundColor: '#1890ff', color: '#fff' }}
                                            />
                                        }
                                        title="Add other admins"
                                        description="Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!"
                                    />
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card>
                                    <Card.Meta
                                        avatar={
                                            <Avatar
                                                icon={<BookOutlined />}
                                                size="large"
                                                style={{ backgroundColor: '#1890ff', color: '#fff' }}
                                            />
                                        }
                                        title="Add classes"
                                        description="Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!"
                                    />
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card>
                                    <Card.Meta
                                        avatar={
                                            <Avatar
                                                icon={<TeamOutlined />}
                                                size="large"
                                                style={{ backgroundColor: '#1890ff', color: '#fff' }}
                                            />
                                        }
                                        title="Add students"
                                        description="Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;
