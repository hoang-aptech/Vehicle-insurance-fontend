// EditUser.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const EditUser = ({ user, onFinish }) => {
    return (
        <Form name="editUser" initialValues={user} onFinish={onFinish}>
            <Form.Item
                name="fullname"
                label="Full Name"
                rules={[{ required: true, message: 'Please input the full name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
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
                    Save Changes
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditUser;
