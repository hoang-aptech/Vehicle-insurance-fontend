// Vehicle.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const Vehicle = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterName, setFilterName] = useState('');

    // Dữ liệu mẫu
    useEffect(() => {
        const sampleData = [
            { id: 1, licensePlate: 'ABC123', model: 'Toyota Camry', owner: 'John Doe' },
            { id: 2, licensePlate: 'XYZ456', model: 'Honda Accord', owner: 'Jane Smith' },
            { id: 3, licensePlate: 'LMN789', model: 'Ford Focus', owner: 'Tom Brown' },
            { id: 4, licensePlate: 'DEF012', model: 'Chevrolet Malibu', owner: 'Emily White' },
            { id: 5, licensePlate: 'GHI345', model: 'Nissan Altima', owner: 'Michael Green' },
        ];
        setDataSource(sampleData);
    }, []);

    const showModal = (vehicle = null) => {
        setIsModalVisible(true);
        setCurrentVehicle(vehicle);
        if (vehicle) {
            setIsEditMode(true);
            form.setFieldsValue(vehicle);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (isEditMode && currentVehicle) {
                // Sửa xe
                setDataSource(dataSource.map((v) => (v.id === currentVehicle.id ? { ...v, ...values } : v)));
            } else {
                // Thêm xe
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

    const filteredData = dataSource.filter((item) => item.owner.toLowerCase().includes(filterName.toLowerCase()));

    const handleDelete = (id) => {
        setDataSource(dataSource.filter((v) => v.id !== id));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'License Plate',
            dataIndex: 'licensePlate',
            key: 'licensePlate',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
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
                    <Popconfirm title="Are you sure to delete this vehicle?" onConfirm={() => handleDelete(record.id)}>
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
                    Add Vehicle
                </Button>
                <h1 style={{ margin: 0 }}>Vehicle Management</h1>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Owner Name" value={filterName} onChange={handleFilterChange} />
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
                    title={isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={handleOk} layout="vertical">
                        <Form.Item
                            name="licensePlate"
                            label="License Plate"
                            rules={[{ required: true, message: 'Please input the license plate!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="model"
                            label="Model"
                            rules={[{ required: true, message: 'Please input the model!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="owner"
                            label="Owner"
                            rules={[{ required: true, message: "Please input the owner's name!" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Vehicle;
