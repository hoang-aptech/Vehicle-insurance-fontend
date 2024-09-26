import React, { useState } from 'react';
import { Layout, Table, Button, Input, Row, Col, Card, Avatar, Popconfirm, Modal } from 'antd';
import { UserAddOutlined, LogoutOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUser from './add/AddUser';
import EditUser from './edit/EditUser';
import './UserAdmin.css';

const { Header, Content } = Layout;

const UserAdmin = () => {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const dataSource = [
        {
            id: '1',
            fullname: 'John Doe',
            address: '10 Downing Street',
            phone: '0123456789',
            email: 'john@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
        {
            id: '2',
            fullname: 'Jane Doe',
            address: '20 Downing Street',
            phone: '0987654321',
            email: 'jane@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
        {
            id: '3',
            fullname: 'Alice Smith',
            address: '30 Downing Street',
            phone: '0123456780',
            email: 'alice@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
        {
            id: '4',
            fullname: 'Bob Johnson',
            address: '40 Downing Street',
            phone: '0123456781',
            email: 'bob@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
        {
            id: '5',
            fullname: 'Charlie Brown',
            address: '50 Downing Street',
            phone: '0123456782',
            email: 'charlie@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
        {
            id: '6',
            fullname: 'Diana Prince',
            address: '60 Downing Street',
            phone: '0123456783',
            email: 'diana@example.com',
            avatar: 'https://via.placeholder.com/150',
        },
    ];

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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, backgroundColor: '#32CD32', borderColor: '#32CD32' }}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm title="Are you sure to delete this user?" onConfirm={() => handleDelete(record.id)}>
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

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalVisible(true);
    };

    const handleDelete = (id) => {
        // Logic xóa người dùng
        console.log('Delete user with ID:', id);
    };

    const handleAddOk = (values) => {
        console.log('Add user:', values);
        setIsAddModalVisible(false);
        // Logic thêm người dùng mới
    };

    const handleEditOk = (values) => {
        console.log('Edit user:', values);
        setIsEditModalVisible(false);
        // Logic cập nhật người dùng
    };

    const handleModalCancel = () => {
        setIsAddModalVisible(false);
        setIsEditModalVisible(false);
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
                        <Col span={16}>
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
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {selectedUser ? (
                                <Card style={{ padding: 16, textAlign: 'center', width: '100%' }}>
                                    <Avatar
                                        src={selectedUser.avatar}
                                        size={100}
                                        style={{ borderRadius: '50%', marginBottom: 16 }}
                                    />
                                    <h3>{selectedUser.fullname}</h3>
                                    <p>Email: {selectedUser.email}</p>
                                    <p>Address: {selectedUser.address}</p>
                                    <p>Phone: {selectedUser.phone}</p>
                                </Card>
                            ) : (
                                <div>Click on a user to see their profile</div>
                            )}
                        </Col>
                    </Row>
                </div>
            </Content>

            <Modal title="Add User" visible={isAddModalVisible} onCancel={handleModalCancel} footer={null}>
                <AddUser onFinish={handleAddOk} />
            </Modal>

            <Modal title="Edit User" visible={isEditModalVisible} onCancel={handleModalCancel} footer={null}>
                <EditUser user={selectedUser} onFinish={handleEditOk} />
            </Modal>
        </Layout>
    );
};

export default UserAdmin;
