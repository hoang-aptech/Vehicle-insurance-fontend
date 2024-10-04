import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Input, Row, Col, Card, Avatar, Popconfirm, Modal } from 'antd';
import { UserAddOutlined, LogoutOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUser from './add/AddUser';
import EditUser from './edit/EditUser';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import './UserAdmin.css';

const { Header, Content } = Layout;

const UserAdmin = () => {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const API_URL = 'https://localhost:7289/api/Users';

    // Fetch user data
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setDataSource(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = dataSource.filter(
        (user) =>
            user.fullname.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
    );

    const pageSize = 5;
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalUsers = filteredUsers.length;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
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
                        onClick={() => handleEdit(record)}
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
                    <Popconfirm title="Are you sure to delete this user?" onConfirm={() => handleDelete(record.id)}>
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            style={{ backgroundColor: '#f60308', borderColor: '#f60308' }}
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleAddOk = async (values) => {
        try {
            const hashedPassword = await bcrypt.hash(values.password, 10);
            const response = await axios.post(API_URL, {
                ...values,
                password: hashedPassword,
                verified: 0,
            });
            setDataSource([...dataSource, response.data]);
            setIsAddModalVisible(false);
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    const handleEditOk = async (values) => {
        try {
            const updatedValues = { ...values };
            if (values.password) {
                updatedValues.password = await bcrypt.hash(values.password, 10);
            }

            const response = await axios.put(`${API_URL}/${selectedUser.id}`, {
                id: selectedUser.id,
                ...updatedValues,
            });

            setDataSource(dataSource.map((user) => (user.id === selectedUser.id ? response.data : user)));
            setIsEditModalVisible(false);
        } catch (error) {
            console.error('Failed to edit user:', error);
        }
    };

    const handleDetail = (user) => {
        setSelectedUser(user);
        setIsDetailModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsAddModalVisible(false);
        setIsEditModalVisible(false);
        setIsDetailModalVisible(false);
    };

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
                <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsAddModalVisible(true)}>
                    Add User
                </Button>
                <h1 style={{ margin: 0 }}>User Management</h1>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>

            <Content style={{ margin: '16px' }}>
                <div style={{ padding: 24, background: '#fff' }}>
                    <Input
                        placeholder="Search for user by fullname or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ marginBottom: 16 }}
                    />

                    <Row gutter={16}>
                        <Col span={20}>
                            <Table
                                dataSource={paginatedUsers}
                                columns={columns}
                                rowKey="id"
                                onRow={(record) => ({
                                    onClick: () => handleUserClick(record),
                                })}
                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: totalUsers,
                                    onChange: (page) => setCurrentPage(page),
                                }}
                            />
                        </Col>
                        <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {selectedUser ? (
                                <Card style={{ padding: 16, textAlign: 'center', width: '100%' }}>
                                    <Avatar
                                        src={'data:image/png;base64,' + selectedUser.avatar}
                                        size={100}
                                        style={{ borderRadius: '50%', marginBottom: 16 }}
                                    />
                                    <h3>{selectedUser.fullname}</h3>
                                    <p>Email: {selectedUser.email}</p>
                                    <p>Address: {selectedUser.address}</p>
                                    <p>Phone: {selectedUser.phone}</p>
                                    <p>Role: {selectedUser.role}</p>
                                </Card>
                            ) : (
                                <div>Click on a user to see their profile</div>
                            )}
                        </Col>
                    </Row>
                </div>
            </Content>

            <Modal title="Add User" open={isAddModalVisible} onCancel={handleModalCancel} footer={null}>
                <AddUser onFinish={handleAddOk} />
            </Modal>

            <Modal title="Edit User" open={isEditModalVisible} onCancel={handleModalCancel} footer={null}>
                <EditUser user={selectedUser} onFinish={handleEditOk} />
            </Modal>

            <Modal title="User Details" open={isDetailModalVisible} onCancel={handleModalCancel} footer={null}>
                <Card style={{ padding: 16 }}>
                    <Avatar
                        src={'data:image/png;base64,' + selectedUser?.avatar}
                        size={100}
                        style={{ borderRadius: '50%', marginBottom: 16 }}
                    />
                    <h3>{selectedUser?.fullname}</h3>
                    <p>Email: {selectedUser?.email}</p>
                    <p>Address: {selectedUser?.address}</p>
                    <p>Phone: {selectedUser?.phone}</p>
                    <p>Role: {selectedUser?.role}</p>
                </Card>
            </Modal>
        </Layout>
    );
};

export default UserAdmin;
