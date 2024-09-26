// AddUser.js
import React from 'react';
import { Layout, Form, Input, Button } from 'antd';

const { Header, Content } = Layout;

const AddUser = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
        // Thêm logic để xử lý dữ liệu người dùng mới
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#006494', color: '#fff', textAlign: 'center' }}>
                <h1>Add User</h1>
            </Header>
            <Content style={{ padding: '24px', background: '#fff' }}>
                <Form name="addUser" onFinish={onFinish}>
                    <Form.Item
                        name="fullname"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input the full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Address">
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone">
                        <Input />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default AddUser;
