// Advertisement.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

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
            { id: 1, title: 'Ad #1', description: 'This is the first advertisement.', duration: '30 days' },
            { id: 2, title: 'Ad #2', description: 'This is the second advertisement.', duration: '60 days' },
            { id: 3, title: 'Ad #3', description: 'This is the third advertisement.', duration: '15 days' },
            { id: 4, title: 'Ad #4', description: 'This is the fourth advertisement.', duration: '45 days' },
            { id: 5, title: 'Ad #5', description: 'This is the fifth advertisement.', duration: '90 days' },
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

    const filteredData = dataSource.filter((item) => item.title.toLowerCase().includes(filterName.toLowerCase()));

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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
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
                        <Input placeholder="Filter by Title" value={filterName} onChange={handleFilterChange} />
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
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please input the advertisement title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="duration"
                            label="Duration"
                            rules={[{ required: true, message: 'Please input the duration!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Advertisement;
