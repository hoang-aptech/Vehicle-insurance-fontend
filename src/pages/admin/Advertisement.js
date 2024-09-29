// Advertisement.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Popconfirm, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';

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

    // Dữ liệu mẫu
    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                customerName: 'John Doe',
                customerPhone: '0123456789',
                customerEmail: 'john@example.com',
                type: 'Car',
            },
            {
                id: 2,
                customerName: 'Jane Smith',
                customerPhone: '0987654321',
                customerEmail: 'jane@example.com',
                type: 'Motorbike',
            },
            {
                id: 3,
                customerName: 'Alice Johnson',
                customerPhone: '0112233445',
                customerEmail: 'alice@example.com',
                type: 'Car',
            },
            {
                id: 4,
                customerName: 'Bob Brown',
                customerPhone: '0223344556',
                customerEmail: 'bob@example.com',
                type: 'Motorbike',
            },
            {
                id: 5,
                customerName: 'Charlie Green',
                customerPhone: '0334455667',
                customerEmail: 'charlie@example.com',
                type: 'Car',
            },
        ];
        setDataSource(sampleData);
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

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (isEditMode && currentAd) {
                // Sửa quảng cáo
                setDataSource(dataSource.map((ad) => (ad.id === currentAd.id ? { ...ad, ...values } : ad)));
            } else {
                // Thêm quảng cáo
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
        setFilterName(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = dataSource.filter((item) =>
        item.customerName.toLowerCase().includes(filterName.toLowerCase()),
    );

    const handleDelete = (id) => {
        setDataSource(dataSource.filter((ad) => ad.id !== id));
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
                <span>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, backgroundColor: '#32CD32', borderColor: '#32CD32' }}
                        onClick={() => showModal(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this advertisement?"
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
                    title={isEditMode ? 'Edit Advertisement' : 'Add New Advertisement'}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={handleOk} layout="vertical">
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
            </Content>
        </Layout>
    );
};

export default Advertisement;
