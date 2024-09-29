// Vehicle.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Select, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Option } = Select;

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
            { id: 1, name: 'Toyota Camry', model: '2021', version: 'XSE', type: 'Car', carNumber: 'ABC123', userId: 1 },
            { id: 2, name: 'Honda Civic', model: '2020', version: 'EX', type: 'Car', carNumber: 'XYZ456', userId: 2 },
            {
                id: 3,
                name: 'Yamaha R1',
                model: '2022',
                version: 'M',
                type: 'Motorbike',
                carNumber: 'MOTO789',
                userId: 3,
            },
            {
                id: 4,
                name: 'Kawasaki Ninja',
                model: '2021',
                version: 'ZX-10R',
                type: 'Motorbike',
                carNumber: 'MOTO101',
                userId: 4,
            },
            { id: 5, name: 'Ford Mustang', model: '2021', version: 'GT', type: 'Car', carNumber: 'FORD999', userId: 5 },
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
                // Sửa phương tiện
                setDataSource(dataSource.map((veh) => (veh.id === currentVehicle.id ? { ...veh, ...values } : veh)));
            } else {
                // Thêm phương tiện
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

    const filteredData = dataSource.filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase()));

    const handleDelete = (id) => {
        setDataSource(dataSource.filter((veh) => veh.id !== id));
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
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Version',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Car Number',
            dataIndex: 'carNumber',
            key: 'carNumber',
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
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
                        <Input placeholder="Filter by Name" value={filterName} onChange={handleFilterChange} />
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
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the vehicle name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="model"
                            label="Model"
                            rules={[{ required: true, message: 'Please input the vehicle model!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="version"
                            label="Version"
                            rules={[{ required: true, message: 'Please input the vehicle version!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please select the vehicle type!' }]}
                        >
                            <Select placeholder="Select type">
                                <Option value="Car">Car</Option>
                                <Option value="Motorbike">Motorbike</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="carNumber"
                            label="Car Number"
                            rules={[{ required: true, message: 'Please input the car number!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="userId"
                            label="User ID"
                            rules={[{ required: true, message: 'Please input the user ID!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Vehicle;
