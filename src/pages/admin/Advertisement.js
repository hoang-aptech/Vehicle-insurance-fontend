import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Card, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;
const { Option } = Select;

const Advertisement = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentAd, setCurrentAd] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterName, setFilterName] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const API_URL = 'https://localhost:7289/api/Advertisements';

    const fetchAdvertisementData = async () => {
        try {
            const response = await axios.get(API_URL);
            setDataSource(response.data);
        } catch (error) {
            console.error('Unable to fetch advertisement data:', error);
        }
    };

    useEffect(() => {
        fetchAdvertisementData();
    }, []);

    const showModal = (ad = null) => {
        setIsModalVisible(true);
        setCurrentAd(ad);
        if (ad) {
            setIsEditMode(true);
            form.setFieldsValue(ad);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (isEditMode && currentAd) {
                const updatedAd = {
                    id: currentAd.id,
                    ...values,
                };
                await axios.put(`${API_URL}/${currentAd.id}`, updatedAd);
                fetchAdvertisementData();
            } else {
                const response = await axios.post(API_URL, values);
                setDataSource((prevData) => [...prevData, response.data]);
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Unable to update advertisement information:', error.response?.data || error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = (dataSource || []).filter((item) => {
        return item && item.customerName && item.customerName.toLowerCase().includes(filterName.toLowerCase());
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((ad) => ad.id !== id));
        } catch (error) {
            console.error('Unable to delete advertisement:', error);
        }
    };

    const handleDetail = (ad) => {
        setCurrentAd(ad);
        setIsDetailModalVisible(true);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Customer Phone',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
        },
        {
            title: 'Customer Email',
            dataIndex: 'customerEmail',
            key: 'customerEmail',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
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
                    Add Advertisement
                </Button>
                <h1 style={{ margin: 0 }}>Advertisement Management</h1>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Customer Name" value={filterName} onChange={handleFilterChange} />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: filteredData.length,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />

                <Modal
                    title={isEditMode ? 'Edit Advertisement Record' : 'Add New Advertisement Record'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="customerName"
                            label="Customer Name"
                            rules={[{ required: true, message: 'Please input the customer name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="customerPhone"
                            label="Customer Phone"
                            rules={[{ required: true, message: 'Please input the customer phone!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="customerEmail"
                            label="Customer Email"
                            rules={[{ required: true, message: 'Please input the customer email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please select the type!' }]}
                        >
                            <Select placeholder="Select type">
                                <Option value="Car">Car</Option>
                                <Option value="Motorbike">Motorbike</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Advertisement Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                >
                    {currentAd && (
                        <Card>
                            <p>
                                <strong>ID:</strong> {currentAd.id}
                            </p>
                            <p>
                                <strong>Customer Name:</strong> {currentAd.customerName}
                            </p>
                            <p>
                                <strong>Customer Phone:</strong> {currentAd.customerPhone}
                            </p>
                            <p>
                                <strong>Customer Email:</strong> {currentAd.customerEmail}
                            </p>
                            <p>
                                <strong>Type:</strong> {currentAd.type}
                            </p>
                        </Card>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default Advertisement;
