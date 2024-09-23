// UserAdmin.js
import React, { useState } from 'react';
import { Layout, Table, Button, Input, Row, Col, Card, Avatar } from 'antd';
import { UserAddOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const UserAdmin = () => {
    const [search, setSearch] = useState('');

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
        // Thêm dữ liệu người dùng ở đây
    ];

    // Lọc người dùng theo tên hoặc email
    const filteredUsers = dataSource.filter(
        (user) =>
            user.fullname.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
    );

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
                <Button type="primary" icon={<UserAddOutlined />}>
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
                    <Table dataSource={filteredUsers} columns={columns} rowKey="id" />

                    <Row gutter={16} style={{ marginTop: 32 }}>
                        {filteredUsers.map((user) => (
                            <Col span={6} key={user.id}>
                                <Card style={{ marginBottom: 16 }}>
                                    <Avatar src={user.avatar} size={64} style={{ borderRadius: '50%' }} />
                                    <h3>{user.fullname}</h3>
                                    <p>{user.email}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default UserAdmin;
