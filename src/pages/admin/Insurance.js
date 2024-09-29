// Insurance.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const Insurance = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentInsurance, setCurrentInsurance] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterName, setFilterName] = useState('');

    // Dữ liệu mẫu
    useEffect(() => {
        const sampleData = [
            { id: 1, policyNumber: 'INS001', holderName: 'John Doe', premium: 500 },
            { id: 2, policyNumber: 'INS002', holderName: 'Jane Smith', premium: 600 },
            { id: 3, policyNumber: 'INS003', holderName: 'Tom Brown', premium: 700 },
            { id: 4, policyNumber: 'INS004', holderName: 'Emily White', premium: 800 },
            { id: 5, policyNumber: 'INS005', holderName: 'Michael Green', premium: 900 },
        ];
        setDataSource(sampleData);
    }, []);

    const showModal = (insurance = null) => {
        setIsModalVisible(true);
        setCurrentInsurance(insurance);
        if (insurance) {
            setIsEditMode(true);
            form.setFieldsValue(insurance);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (isEditMode && currentInsurance) {
                // Sửa bảo hiểm
                setDataSource(dataSource.map((ins) => (ins.id === currentInsurance.id ? { ...ins, ...values } : ins)));
            } else {
                // Thêm bảo hiểm
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

    const filteredData = dataSource.filter((item) => item.holderName.toLowerCase().includes(filterName.toLowerCase()));

    const handleDelete = (id) => {
        setDataSource(dataSource.filter((ins) => ins.id !== id));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Policy Number',
            dataIndex: 'policyNumber',
            key: 'policyNumber',
        },
        {
            title: 'Holder Name',
            dataIndex: 'holderName',
            key: 'holderName',
        },
        {
            title: 'Premium',
            dataIndex: 'premium',
            key: 'premium',
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
                        title="Are you sure to delete this insurance?"
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
                    Add Insurance
                </Button>
                <h1 style={{ margin: 0 }}>Insurance Management</h1>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Holder Name" value={filterName} onChange={handleFilterChange} />
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
                    title={isEditMode ? 'Edit Insurance' : 'Add New Insurance'}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={handleOk} layout="vertical">
                        <Form.Item
                            name="policyNumber"
                            label="Policy Number"
                            rules={[{ required: true, message: 'Please input the policy number!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="holderName"
                            label="Holder Name"
                            rules={[{ required: true, message: 'Please input the holder name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="premium"
                            label="Premium"
                            rules={[{ required: true, message: 'Please input the premium!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Insurance;