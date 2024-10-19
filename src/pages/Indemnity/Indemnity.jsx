import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Typography, Modal, Form, Input, notification, Select } from 'antd';
import axios from 'axios'; // Import axios

import config from '~/config';
import { Context } from '~/Context';
import Wrapper from '~/components/Wrapper';
import Khong from '../../assets/Images/khong.png';
import Icon1 from '../../assets/Images/icon-1.jpg';
import Icon2 from '../../assets/Images/icon-2.jpg';
import Chat from '../ChatBot/Chat';
import styles from './Indemnity.module.scss';

const { Title, Paragraph } = Typography;

const Indemnity = ({ role = 'user' }) => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const { user, userToken, handleLogoutUser, adminToken } = useContext(Context);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [compensations, setCompensations] = useState([]);
    const [chatId, setChatId] = useState();
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState([]);
    const chatRef = useRef();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        console.log('Received values:', values);
        try {
            const res = await axios.post(
                process.env.REACT_APP_BACKEND_URL + `/CustomerSupports`,
                {
                    ...values,
                    userId: 3,
                },
                {
                    headers: { Authorization: `Bearer ${userToken}` },
                },
            );
            if (res.status === 201) {
                fetchCompensations();
                openNotificationWithIcon(
                    'success',
                    'Success!',
                    'Your indemnity request has been submitted successfully.',
                );
            }
        } catch (err) {
            console.log(err);

            if (err.status === 401) {
                openNotificationWithIcon(
                    'error',
                    'Unauthorized!',
                    'You no longer have permission to perform this action.',
                );
                setTimeout(() => {
                    if (handleLogoutUser()) {
                        navigate(config.routes.login);
                    }
                }, 1000);
            }
        }
        setIsModalVisible(false);
    };

    const fetchVehicleByUser = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/vehicles/by-user/${user.id}`, {
                headers: { Authorization: `Bearer ${userToken}` },
            });
            console.log(res);
            if (res.status === 200) {
                if (res.data.length > 0) {
                    setVehicles(res.data);
                    return;
                }
                openNotificationWithIcon(
                    'info',
                    'Notification!',
                    'You have not registered any vehicle insurance. Please purchase insurance for your vehicle.',
                );
                setTimeout(() => {
                    navigate(config.routes.home);
                }, 1000);
            }
        } catch (err) {
            if (err.status === 401) {
                openNotificationWithIcon('error', 'Unauthorized!', 'You do not have permission to access this page');
                setTimeout(() => {
                    if (handleLogoutUser()) {
                        navigate(config.routes.login);
                    }
                }, 1000);
            }
        }
    };
    const fetchCompensations = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7289/api/CustomerSupports/by-role?${
                    role === 'user' ? `userId=${user.id}` : 'employeeId=3'
                }`,
                {
                    headers: { Authorization: `Bearer ${userToken || adminToken}` },
                },
            );
            setCompensations(response.data);
        } catch (err) {
            if (err.status === 401) {
                openNotificationWithIcon('error', 'Unauthorized!', 'You do not have permission to access this page');
                setTimeout(() => {
                    if (handleLogoutUser()) {
                        navigate(config.routes.login);
                    }
                }, 1000);
            }
        } finally {
            setLoading(false);
        }
    };
    const handleShowChat = (csId) => {
        setChatId(csId);
        if (chatRef.current) {
            chatRef.current.handleShowChat(true);
        }
    };

    useEffect(() => {
        fetchCompensations();
        if (role === 'user') {
            fetchVehicleByUser();
        }
    }, []);

    return (
        <Wrapper>
            {contextHolder}
            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '790px', margin: 'auto' }}>
                <h2 style={{ marginRight: 'auto' }}>Indemnity</h2>
                <Button type="primary" onClick={showModal}>
                    Create Indemnity
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
                    <Title level={4}>Indemnity History</Title>
                    {loading ? (
                        <p>Loading...</p>
                    ) : compensations.length === 0 ? (
                        <div style={{ display: 'flex' }}>
                            <img src={Khong} alt="" />
                            <Paragraph>
                                <p style={{ marginTop: '50px' }}>No indemnity requests</p>
                                <p style={{ marginBottom: '-20px' }}>
                                    You have not created any indemnity requests yet.
                                </p>
                            </Paragraph>
                        </div>
                    ) : (
                        compensations.map((compensation) => (
                            <Paragraph key={compensation.id}>
                                {role === 'admin' && (
                                    <>
                                        <strong>Customer name:</strong> {compensation.customerName} -{' '}
                                        {compensation.customerPhone}
                                        <br />
                                        <strong>Customer vehicle name:</strong> {compensation.customerVehicle}
                                        <br />
                                    </>
                                )}
                                <strong>Type:</strong> {compensation.type}
                                <br />
                                <strong>Description:</strong> {compensation.description}
                                <br />
                                <strong>Place:</strong> {compensation.place}
                                <br />
                                <Button
                                    type="primary"
                                    className={styles.chatBtn}
                                    onClick={() => handleShowChat(compensation.id)}
                                >
                                    Chat
                                </Button>
                                <br />
                                <br />
                                <hr />
                            </Paragraph>
                        ))
                    )}

                    <Title level={4}>Advantages of Oneteam Indemnity Portal</Title>
                    <div style={{ display: 'flex', marginBottom: '15px' }}>
                        <img src={Icon1} alt="" />
                        <Paragraph style={{ marginTop: '20px', marginLeft: '20px' }}>
                            <strong style={{ display: 'flex' }}>Quick indemnity creation:</strong> Create indemnity
                            requests in just a few minutes following the system's guidance.
                        </Paragraph>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '40px' }}>
                        <img src={Icon2} alt="" />
                        <Paragraph style={{ marginTop: '20px', marginLeft: '20px' }}>
                            <strong style={{ display: 'flex' }}>Easy management and updates:</strong> Manage and update
                            the status of indemnity requests promptly and quickly.
                        </Paragraph>
                    </div>

                    <Title level={5}>Contact Oneteam</Title>
                    <div className={styles.container}>
                        <Paragraph className={styles.paragraph}>
                            <MailOutlined className={styles.icon} />
                            Email: <a href="mailto:cs@saladin.vn">cs@oneteam.vn</a>
                        </Paragraph>
                        <Paragraph className={styles.paragraph}>
                            <PhoneOutlined className={styles.icon} />
                            Phone: 1900 638 454
                        </Paragraph>
                    </div>
                </Card>
            </div>

            <Modal title="Create Indemnity Request" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <p>
                    <b>Full name:</b> {user?.fullname}
                </p>
                <p>
                    <b>Phone number:</b> {user?.phone}
                </p>
                <p>
                    <b>Email:</b> {user?.email}
                </p>
                <Form className={styles.form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select a type!' }]}>
                        <Select placeholder="Select a type">
                            <Select.Option value="Maintenance">Maintenance</Select.Option>
                            <Select.Option value="Repair">Repair</Select.Option>
                            <Select.Option value="TechnicalIssue">TechnicalIssue</Select.Option>
                            <Select.Option value="Inquiry">Inquiry</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Vehicle"
                        name="vehicleId"
                        rules={[{ required: true, message: 'Please select a vehicle!' }]}
                    >
                        <Select placeholder="Select a vehicle">
                            {vehicles.map((vehicle) => (
                                <Select.Option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide a description!',
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Place"
                        name="place"
                        rules={[{ required: true, message: 'Please provide the place where the event occurred!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {chatId && (
                <Chat chatId={chatId} role={role === 'user' ? 'User' : 'Employee'} showChat={true} ref={chatRef} />
            )}
        </Wrapper>
    );
};

export default Indemnity;
