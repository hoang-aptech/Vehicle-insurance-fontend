// Billing.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';

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

    // Dữ liệu mẫu
    useEffect(() => {
        const sampleData = [
            { id: 1, price: 100.0, customerInsuranceId: 101 },
            { id: 2, price: 150.5, customerInsuranceId: 102 },
            { id: 3, price: 200.75, customerInsuranceId: 103 },
            { id: 4, price: 250.0, customerInsuranceId: 104 },
            { id: 5, price: 300.25, customerInsuranceId: 105 },
        ];
        setDataSource(sampleData);
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

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (isEditMode && currentBilling) {
                // Sửa hóa đơn
                setDataSource(
                    dataSource.map((billing) =>
                        billing.id === currentBilling.id ? { ...billing, ...values } : billing,
                    ),
                );
            } else {
                // Thêm hóa đơn
                setDataSource([...dataSource, { id: dataSource.length + 1, ...values }]);
            }
            form.resetFields();
            setIsModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFilterChange = (e) => {
        setFilterPrice(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = dataSource.filter((item) => item.price.toString().includes(filterPrice));

    const handleDelete = (id) => {
        setDataSource(dataSource.filter((billing) => billing.id !== id));
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
                <span>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, backgroundColor: '#32CD32', borderColor: '#32CD32' }}
                        onClick={() => showModal(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this billing record?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            style={{ marginLeft: 8, backgroundColor: '#f60308', borderColor: '#f60308' }}
                        />
                    </Popconfirm>
                </span>
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
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={handleOk} layout="vertical">
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
            </Content>
        </Layout>
    );
};

export default Billing;
