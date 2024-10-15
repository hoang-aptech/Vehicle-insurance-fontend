import React, { useContext, useEffect, useState } from 'react';
import { List, Typography, Button, Layout, notification, Form, Input, Select, Modal } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '~/Context';
import config from '~/config';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const InsurancePackages = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const { user } = useContext(Context);
    const { insuranceId } = useParams();
    const [form] = Form.useForm();
    const [insurancePackageData, setInsurancePackageData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [insurancePackageId, setInsurancePackageId] = useState(null);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        // console.log('Form values:', values);
        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/Vehicles', {
                ...values,
                userId: user.id,
            });
            if (res.status === 201) {
                localStorage.setItem('vehicleIdToBuyInsurance', JSON.stringify(res.data.id));
                openNotificationWithIcon(
                    'success',
                    'Vehicle Registered Successfully',
                    `You have registered your vehicle successfully with License Plate: ${values.licensePlate}`,
                );

                setTimeout(() => {
                    if (insurancePackageId) {
                        axios
                            .get(`https://localhost:7289/api/insurances/pay/${insurancePackageId}`)
                            .then((response) => {
                                const { paymentUrl } = response.data;
                                window.location.href = paymentUrl;
                            })
                            .catch((error) => {
                                console.error('Error initiating payment:', error);
                            });
                    }
                }, 500);
            }
        } catch (e) {
            console.error(e);
            openNotificationWithIcon('error', 'Insurance registration failed', 'Error while registering insurance');
        }
        setIsModalVisible(false);
    };

    const getDataApi = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/InsurancePackages/insurance/' + insuranceId);
        console.log(res);

        if (res.status === 200) {
            console.log(res.data);

            setInsurancePackageData(
                res.data.map((i) => ({
                    id: i.id,
                    name: i.name,
                    description: `Price: $${i.price} - Duration: ${i.duration}`,
                })),
            );
        }
    };

    const handleBuyClick = (id) => {
        if (user) {
            form.resetFields();
            setIsModalVisible(true);
            setInsurancePackageId(id);
        } else {
            openNotificationWithIcon('error', 'Login!', 'You must log in before purchasing insurance.');
            setTimeout(() => {
                navigate(config.routes.login);
            }, 1000);
        }
    };

    useEffect(() => {
        getDataApi();
    }, []);

    return (
        <Layout style={{ minHeight: '70vh' }}>
            {contextHolder}
            <Content style={{ padding: '50px' }}>
                <Title style={{ color: '#A3D900' }}>Insurance packages</Title>
                <List
                    bordered
                    dataSource={insurancePackageData}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            style={{ backgroundColor: '#e5ffde', border: '1px solid #A3D900' }}
                            actions={[
                                <Button type="primary" onClick={() => handleBuyClick(item.id)}>
                                    Buy
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta title={<Link to="/">{item.name}</Link>} description={item.description} />
                        </List.Item>
                    )}
                />
                <Modal title="Vehicle Registration Form" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Vehicle Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter the vehicle name!' }]}
                        >
                            <Input placeholder="Enter vehicle name" />
                        </Form.Item>

                        <Form.Item
                            label="Vehicle Model"
                            name="model"
                            rules={[{ required: true, message: 'Please enter the vehicle model!' }]}
                        >
                            <Input placeholder="Enter vehicle model" />
                        </Form.Item>

                        <Form.Item
                            label="Version"
                            name="version"
                            rules={[{ required: true, message: 'Please enter the vehicle version!' }]}
                        >
                            <Input placeholder="Enter vehicle version" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please select the vehicle type!' }]}
                        >
                            <Select placeholder="Select vehicle type">
                                <Option value="Car">Car</Option>
                                <Option value="Motorbike">Motorbike</Option>
                                <Option value="Bike">Bike</Option>
                                <Option value="E-bike">E-bike</Option>
                                <Option value="Taxi">Taxi</Option>
                                <Option value="Truck">Truck</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="License Plate"
                            name="licensePlate"
                            rules={[{ required: true, message: 'Please enter the license plate!' }]}
                        >
                            <Input placeholder="Enter license plate" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Pay
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default InsurancePackages;
