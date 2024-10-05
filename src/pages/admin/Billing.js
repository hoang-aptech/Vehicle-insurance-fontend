import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;

const Billing = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBilling, setCurrentBilling] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterPrice, setFilterPrice] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const API_URL = 'https://localhost:7289/api/Billings';

    // Fetch billing data from the API
    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const response = await axios.get(API_URL);
                setDataSource(response.data);
            } catch (error) {
                console.error('Failed to fetch billing data:', error);
            }
        };
        fetchBillingData();
    }, []);

    const showModal = (billing = null) => {
        setIsModalVisible(true);
        setCurrentBilling(billing);
        if (billing) {
            setIsEditMode(true);
            form.setFieldsValue(billing);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        if (isEditMode && currentBilling) {
            // Update billing record
            try {
                const response = await axios.put(`${API_URL}/${currentBilling.id}`, values);
                setDataSource(
                    dataSource.map((billing) => (billing.id === currentBilling.id ? response.data : billing)),
                );
            } catch (error) {
                console.error('Failed to update billing:', error);
            }
        } else {
            // Add new billing record
            try {
                const response = await axios.post(API_URL, values);
                setDataSource([...dataSource, response.data]);
            } catch (error) {
                console.error('Failed to add billing:', error);
            }
        }
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFilterChange = (e) => {
        setFilterPrice(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = dataSource.filter((item) => item.price.toString().includes(filterPrice));

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((billing) => billing.id !== id));
        } catch (error) {
            console.error('Failed to delete billing:', error);
        }
    };

    const handleDetail = (billing) => {
        setCurrentBilling(billing);
        setIsDetailModalVisible(true);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Customer Insurance ID',
            dataIndex: 'customerInsuranceId',
            key: 'customerInsuranceId',
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
                    Add Billing
                </Button>
                <h1 style={{ margin: 0 }}>Billing Management</h1>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Price" value={filterPrice} onChange={handleFilterChange} />
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
                    title={isEditMode ? 'Edit Billing Record' : 'Add New Billing Record'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input type="number" step="0.01" />
                        </Form.Item>
                        <Form.Item
                            name="customerInsuranceId"
                            label="Customer Insurance ID"
                            rules={[{ required: true, message: 'Please input the customer insurance ID!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Billing Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                >
                    {currentBilling && (
                        <Card>
                            <p>
                                <strong>ID:</strong> {currentBilling.id}
                            </p>
                            <p>
                                <strong>Price:</strong> ${currentBilling.price.toFixed(2)}
                            </p>
                            <p>
                                <strong>Customer Insurance ID:</strong> {currentBilling.customerInsuranceId}
                            </p>
                        </Card>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default Billing;
