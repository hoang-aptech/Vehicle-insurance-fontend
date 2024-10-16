import React, { useState, useEffect, useContext } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Select, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '~/Context';
import config from '~/config';

const { Header, Content } = Layout;
const { Option } = Select;

const Vehicle = () => {
    const navigate = useNavigate();
    const { adminToken, handleLogoutAdmin } = useContext(Context);
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterName, setFilterName] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const API_URL = 'https://localhost:7289/api/Vehicles';

    // Fetch vehicle data from the API
    const fetchVehicleData = async () => {
        try {
            const response = await axios.get(API_URL, { headers: { Authorization: 'Bearer ' + adminToken } });
            setDataSource(response.data);
        } catch (error) {
            console.error('Failed to fetch vehicle data:', error);
            handleError(error);
        }
    };

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

    useEffect(() => {
        fetchVehicleData();
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

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (isEditMode && currentVehicle) {
                const updatedVehicle = {
                    id: currentVehicle.id,
                    ...values,
                };
                await axios.put(`${API_URL}/${currentVehicle.id}`, updatedVehicle);
                fetchVehicleData(); // Refresh data after update
            } else {
                const response = await axios.post(API_URL, values);
                setDataSource((prevData) => [...prevData, response.data]);
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Cannot update vehicle information:', error.response?.data || error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchVehicleData(); // Refresh data after deletion
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
        }
    };

    const handleDetail = (vehicle) => {
        setCurrentVehicle(vehicle);
        setIsDetailModalVisible(true);
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = dataSource.filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase()));

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
            title: 'License Plate',
            dataIndex: 'licensePlate',
            key: 'licensePlate',
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
                    Add Vehicle
                </Button>
                <h1 style={{ margin: 0 }}>Vehicle Management</h1>
                <div></div>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Name" value={filterName} onChange={handleFilterChange} />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{
                        pageSize: 5,
                    }}
                />

                <Modal
                    title={isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
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
                            name="licensePlate"
                            label="License Plate"
                            rules={[{ required: true, message: 'Please input the license plate!' }]}
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

                <Modal
                    title="Vehicle Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                >
                    {currentVehicle && (
                        <Card>
                            <p>
                                <strong>ID:</strong> {currentVehicle.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {currentVehicle.name}
                            </p>
                            <p>
                                <strong>Model:</strong> {currentVehicle.model}
                            </p>
                            <p>
                                <strong>Version:</strong> {currentVehicle.version}
                            </p>
                            <p>
                                <strong>Type:</strong> {currentVehicle.type}
                            </p>
                            <p>
                                <strong>License Plate:</strong> {currentVehicle.licensePlate}
                            </p>
                            <p>
                                <strong>User ID:</strong> {currentVehicle.userId}
                            </p>
                        </Card>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default Vehicle;
