import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Modal, Form, Input } from 'antd';
import Khong from '../../assets/Images/khong.png';
import Icon1 from '../../assets/Images/icon-1.jpg';
import Icon2 from '../../assets/Images/icon-2.jpg';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import axios
import styles from './Indemnity.module.scss';
import Chat from '../ChatBot/Chat';

const { Title, Paragraph } = Typography;

const Indemnity = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [compensations, setCompensations] = useState([]);
    const [loading, setLoading] = useState(true);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchCompensations = async () => {
            try {
                const response = await axios.get('https://localhost:7289/api/CustomerSupports');
                setCompensations(response.data);
            } catch (error) {
                console.error('Error fetching compensation requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompensations();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '790px', margin: 'auto' }}>
                <h2 style={{ marginRight: 'auto' }}>Bồi thường</h2>
                <Button type="primary" onClick={showModal}>
                    Tạo bồi thường
                </Button>
            </div>

            <div style={{ padding: '20px' }}>
                <Card
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '800px',
                        margin: 'auto',
                    }}
                >
                    <Title level={4}>Lịch sử bồi thường</Title>
                    {loading ? (
                        <p>Loading...</p>
                    ) : compensations.length === 0 ? (
                        <div style={{ display: 'flex' }}>
                            <img src={Khong} alt="" />
                            <Paragraph>
                                <p style={{ marginTop: '50px' }}>Không có yêu cầu bồi thường</p>
                                <p style={{ marginBottom: '-20px' }}>
                                    Hiện tại bạn chưa có yêu cầu bồi thường nào được tạo.
                                </p>
                            </Paragraph>
                        </div>
                    ) : (
                        compensations.map((compensation) => (
                            <Paragraph key={compensation.id}>
                                <strong>Type:</strong> {compensation.type}
                                <br />
                                <strong>Description:</strong> {compensation.description}
                                <br />
                                <strong>Place:</strong> {compensation.place}
                                <br />
                                <hr />
                            </Paragraph>
                        ))
                    )}

                    <Title level={4}>Ưu điểm của cổng bồi thường Saladin</Title>
                    <div style={{ display: 'flex', marginBottom: '15px' }}>
                        <img src={Icon1} alt="" />
                        <Paragraph style={{ marginTop: '20px', marginLeft: '20px' }}>
                            <strong style={{ display: 'flex' }}>Tạo bồi thường nhanh chóng:</strong> Tạo yêu cầu bồi
                            thường chỉ trong vài phút theo hướng dẫn của hệ thống.
                        </Paragraph>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '40px' }}>
                        <img src={Icon2} alt="" />
                        <Paragraph style={{ marginTop: '20px', marginLeft: '20px' }}>
                            <strong style={{ display: 'flex' }}>Quản lý và cập nhật dễ dàng:</strong> Quản lý và cập
                            nhật tình trạng yêu cầu bồi thường kịp thời, nhanh chóng.
                        </Paragraph>
                    </div>

                    <Title level={5}>Liên hệ Saladin</Title>
                    <div className={styles.container}>
                        <Paragraph className={styles.paragraph}>
                            <MailOutlined className={styles.icon} />
                            Email: <a href="mailto:cs@saladin.vn">cs@saladin.vn</a>
                        </Paragraph>
                        <Paragraph className={styles.paragraph}>
                            <PhoneOutlined className={styles.icon} />
                            Điện thoại: 1900 638 454
                        </Paragraph>
                    </div>
                </Card>
            </div>

            <Modal title="Tạo yêu cầu bồi thường" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form layout="vertical" onFinish={onFinish}>
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
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả yêu cầu bồi thường"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả yêu cầu!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Gửi yêu cầu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Chat />
        </>
    );
};

export default Indemnity;
