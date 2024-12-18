import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Table, Button, Input, Row, Col, Card, Avatar, Popconfirm, Modal } from 'antd';
import { UserAddOutlined, LogoutOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUser from './add/AddUser';
import EditUser from './edit/EditUser';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { Context } from '~/Context';
import './UserAdmin.css';
import config from '~/config';

const { Header, Content } = Layout;

const UserAdmin = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(null);
    const [deletedUsers, setDeletedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [filterName, setFilterName] = useState('');

    const API_URL = process.env.REACT_APP_BACKEND_URL + '/Users';

    const { adminToken, handleLogoutAdmin } = useContext(Context);

    const handleError = (err) => {
        if (err.status === 401) {
            alert('Unauthorized. Please log in again.');
            const Logouted = handleLogoutAdmin();
            if (Logouted) {
                navigate(config.routes.loginAdmin); // Refresh the page to log out
            }
        } else if (err.status === 400) {
            alert(err.response.data.message);
        }
    };

    // Fetch user data
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL, { headers: { Authorization: 'Bearer ' + adminToken } });
            setDataSource(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            handleError(error);
        }
    };

    // Fetch deleted users
    const fetchDeletedUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/deleted`, {
                headers: { Authorization: 'Bearer ' + adminToken },
            });
            console.log('Deleted users:', response.data); // Log the response
            setDeletedUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch deleted users:', error);
            handleError(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredUsers = dataSource.filter((user) => {
        const searchLower = filterName.toLowerCase();
        const fullnameLower = user.fullname ? user.fullname.toLowerCase() : '';
        const emailLower = user.email ? user.email.toLowerCase() : '';

        return fullnameLower.includes(searchLower) || emailLower.includes(searchLower);
    });

    // const pageSize = 5;
    // const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    // const totalUsers = filteredUsers.length;

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

    // Handle user edit
    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalVisible(true);
    };

    // Handle user delete
    const handleDelete = async (id) => {
        try {
            await axios.patch(
                `${API_URL}/${id}`,
                { deleted: true },
                { headers: { Authorization: 'Bearer ' + adminToken } },
            );
            console.log(dataSource.filter((user) => user.id !== id));

            setDataSource(dataSource.filter((user) => user.id !== id));
            // setDeletedUsers(id);
            fetchDeletedUsers(); // Add this line to refresh the deleted users
        } catch (error) {
            console.error('Failed to delete user:', error);
            handleError(error);
        }
    };

    // Handle modal close
    const handleModalCancel = () => {
        setIsAddModalVisible(false);
        setIsEditModalVisible(false);
        setIsDetailModalVisible(false);
        setIsDeletedModalVisible(false);
    };

    // Handle adding user
    const handleAddOk = async (values) => {
        console.log('Values before adding user:', values); // Log the values
        const updatedValues = { ...values };

        if (updatedValues.avatar) {
            updatedValues.avatar = updatedValues.avatar.replace('data:image/png;base64,', '');
        }

        try {
            if (values.password) {
                const hashedPassword = await bcrypt.hash(values.password, 10);
                updatedValues.password = hashedPassword;
            }

            console.log('Updated values before API call:', updatedValues);

            const response = await axios.post(
                API_URL,
                {
                    ...updatedValues,
                    verified: false, // Adjusted this to boolean
                },
                { headers: { Authorization: 'Bearer ' + adminToken } },
            );

            setDataSource([...dataSource, response.data]);
            setIsAddModalVisible(false);
        } catch (error) {
            console.error('Failed to add user:', error);
            handleError(error);
        }
    };

    // Handle editing user
    const handleEditOk = async (values) => {
        const updatedValues = { ...values };
        if (updatedValues.avatar) {
            updatedValues.avatar = updatedValues.avatar.replace('data:image/png;base64,', '');
        }

        try {
            if (values.password) {
                updatedValues.password = await bcrypt.hash(values.password, 10);
            }

            await axios.put(`${API_URL}/${selectedUser.id}`, {
                id: selectedUser.id,
                ...updatedValues,
            });

            fetchUsers();
            setIsEditModalVisible(false);
        } catch (error) {
            console.error('Failed to edit user:', error);
        }
    };

    // View user details
    const handleDetail = (user) => {
        setSelectedUser(user);
        setIsDetailModalVisible(true);
    };

    // View deleted users
    const showDeletedUsersModal = () => {
        fetchDeletedUsers();
        setIsDeletedModalVisible(true);
    };

    // Restore deleted user
    const handleRestore = async (id) => {
        try {
            await axios.patch(
                `${API_URL}/${id}`,
                { deleted: false },
                { headers: { Authorization: 'Bearer ' + adminToken } },
            ); // Assuming you have a restore endpoint
            fetchUsers();
            fetchDeletedUsers();
        } catch (error) {
            console.error('Failed to restore user:', error);
        }
    };

    // Permanently delete user
    const handlePermanentDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: 'Bearer ' + adminToken } }); // Assuming you have a permanently delete endpoint
            fetchDeletedUsers();
        } catch (error) {
            console.error('Failed to permanently delete user:', error);
            handleError(error);
        }
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
                <h1 style={{ margin: 120 }}>User Management</h1>
                <Button
                    type="default"
                    icon={<DeleteOutlined />}
                    onClick={showDeletedUsersModal}
                    style={{ backgroundColor: '#f60308', borderColor: '#f60308' }}
                ></Button>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>

            <Content style={{ margin: '16px' }}>
                <div style={{ padding: 24, background: '#fff' }}>
                    <Input
                        placeholder="Search for user by fullname or email"
                        value={filterName}
                        onChange={handleFilterChange}
                        style={{ marginBottom: 16 }}
                    />

                    <Row gutter={16}>
                        <Col span={24}>
                            <Table
                                dataSource={filteredUsers}
                                columns={columns}
                                rowKey="id"
                                pagination={{
                                    pageSize: 5,
                                }}
                            />
                        </Col>
                        {/* <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        </Col> */}
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

            <Modal title="Deleted Users" open={isDeletedModalVisible} onCancel={handleModalCancel} footer={null}>
                {deletedUsers.length > 0 ? (
                    deletedUsers.map((user) => (
                        <Card key={user.id} style={{ marginBottom: 16, padding: 16 }}>
                            <p>
                                <strong>ID:</strong> {user.id}
                            </p>
                            <p>
                                <strong>Full Name:</strong> {user.fullname}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <Popconfirm
                                title="Are you sure to restore this user?"
                                onConfirm={() => handleRestore(user.id)}
                            >
                                <Button type="primary" style={{ marginRight: 8 }}>
                                    Restore
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                title="Are you sure to permanently delete this user?"
                                onConfirm={() => handlePermanentDelete(user.id)}
                            >
                                <Button type="default" style={{ marginRight: 8 }}>
                                    Delete Permanently
                                </Button>
                            </Popconfirm>
                        </Card>
                    ))
                ) : (
                    <p>No deleted users found.</p>
                )}
            </Modal>
        </Layout>
    );
};

export default UserAdmin;
