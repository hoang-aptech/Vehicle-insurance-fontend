import React, { useState, useEffect, useContext } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '~/Context';
import config from '~/config';

const { Header, Content } = Layout;
// const { Option } = Select;

const InsurancePackage = () => {
    const navigate = useNavigate();
    const { adminToken, handleLogoutAdmin } = useContext(Context);
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null);
    const [form] = Form.useForm();
    const [filterName, setFilterName] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const API_URL = process.env.REACT_APP_BACKEND_URL + '/InsurancePackages';

    const handleError = (err) => {
        if (err.status === 401) {
            alert('Unauthorized. Please log in again.');
            const Logouted = handleLogoutAdmin();
            if (Logouted) {
                navigate(config.routes.loginAdmin);
            }
        } else if (err.status === 400) {
            alert(err.response.data.message);
        }
    };

    const fetchInsurancePackageData = async () => {
        try {
            const response = await axios.get(API_URL, { headers: { Authorization: 'Bearer ' + adminToken } });
            setDataSource(response.data);
        } catch (error) {
            console.error('Unable to fetch insurance package data:', error);
            handleError(error);
        }
    };

    useEffect(() => {
        fetchInsurancePackageData();
    }, []);

    const showModal = (insurancePackage = null) => {
        setIsModalVisible(true);
        setCurrentPackage(insurancePackage);
        if (insurancePackage) {
            setIsEditMode(true);
            form.setFieldsValue(insurancePackage);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (isEditMode && currentPackage) {
                await axios.put(`${API_URL}/${currentPackage.id}`, {
                    id: currentPackage.id,
                    ...values,
                });
            } else {
                const response = await axios.post(API_URL, values);
                setDataSource((prevData) => [...prevData, response.data]);
            }

            setIsModalVisible(false);
            form.resetFields();
            fetchInsurancePackageData();
        } catch (error) {
            console.error('Unable to update insurance package information:', error.response?.data || error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
    };

    const filteredData = (dataSource || []).filter((item) => {
        return item && item.name && item.name.toLowerCase().includes(filterName.toLowerCase());
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((insurancePackage) => insurancePackage.id !== id));
        } catch (error) {
            console.error('Unable to delete insurance package:', error);
        }
    };

    const handleDetail = (insurancePackage) => {
        setCurrentPackage(insurancePackage);
        setIsDetailModalVisible(true);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Duration (Months)',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Insurance ID',
            dataIndex: 'insuranceId',
            key: 'insuranceId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, backgroundColor: '#32CD32', borderColor: '#32CD32' }}
                        onClick={() => showModal(record)}
                    />
                    <Button
                        type="default"
                        style={{ marginRight: 8, backgroundColor: '#1E90FF', borderColor: '#1E90FF' }}
                        onClick={() => handleDetail(record)}
                    >
                        <img
                            src={require('./assetadmin/ảnh detail.png')}
                            alt="Detail"
                            style={{ width: 16, height: 16 }}
                        />
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        style={{ marginLeft: 8, backgroundColor: '#f60308', borderColor: '#f60308' }}
                        onClick={() => handleDelete(record.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#006494',
                    color: '#fff',
                }}
            >
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => showModal()}>
                    Add Insurance Package
                </Button>
                <h1 style={{ margin: 0 }}>Insurance Package Management</h1>
                <div></div>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Name" value={filterName} onChange={handleFilterChange} />
                    </Col>
                </Row>
                <Table columns={columns} dataSource={filteredData} rowKey="id" pagination={{ pageSize: 5 }} />

                <Modal
                    title={isEditMode ? 'Edit Insurance Package' : 'Add New Insurance Package'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter the name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="duration"
                            label="Duration (Months)"
                            rules={[{ required: true, message: 'Please enter the duration!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please enter the price!' }]}
                        >
                            <Input type="number" step="0.01" />
                        </Form.Item>
                        <Form.Item
                            name="insuranceId"
                            label="Insurance ID"
                            rules={[{ required: true, message: 'Please enter the insurance ID!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Insurance Package Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                >
                    {currentPackage && (
                        <Card>
                            <p>
                                <strong>ID:</strong> {currentPackage.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {currentPackage.name}
                            </p>
                            <p>
                                <strong>Duration:</strong> {currentPackage.duration} Months
                            </p>
                            <p>
                                <strong>Price:</strong> ${currentPackage.price.toFixed(2)}
                            </p>
                            <p>
                                <strong>Insurance ID:</strong> {currentPackage.insuranceId}
                            </p>
                        </Card>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default InsurancePackage;
