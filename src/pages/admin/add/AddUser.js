import React, { useState } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddUser = ({ onFinish }) => {
    const [avatarFileList, setAvatarFileList] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleUploadChange = ({ fileList }) => {
        setAvatarFileList(fileList);
        if (fileList.length > 0) {
            const file = fileList[fileList.length - 1].originFileObj;
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarUrl('');
        }
    };

    const handleRemove = (file) => {
        const newFileList = avatarFileList.filter((item) => item.uid !== file.uid);
        setAvatarFileList(newFileList);
        if (newFileList.length === 0) {
            setAvatarUrl('');
        } else {
            const lastFile = newFileList[newFileList.length - 1];
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(lastFile.originFileObj);
        }
    };

    const handleSubmit = async (values) => {
        if (avatarFileList.length > 0) {
            const file = avatarFileList[0].originFileObj;
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Lấy phần Base64
                onFinish({ ...values, avatar: base64String });
            };
            reader.readAsDataURL(file);
        } else {
            onFinish(values);
        }
    };

    return (
        <Form name="addUser" onFinish={handleSubmit}>
            <Form.Item name="username" label="UserName" rules={[{ required: true, message: 'Please enter username!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="fullname"
                label="Fullname"
                rules={[{ required: true, message: 'Please enter full name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please enter email!' },
                    { type: 'email', message: 'Invalid email!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter address!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter phone!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please enter role!' }]}>
                <Select placeholder="Select Role">
                    <Option value="Admin">Admin</Option>
                    <Option value="User">User</Option>
                    <Option value="Employee">Employee</Option>
                </Select>
            </Form.Item>
            <Form.Item name="avatar" label="Upload Avatar">
                <div>
                    <Upload
                        fileList={avatarFileList}
                        showUploadList={false}
                        beforeUpload={() => false} // Không tự động tải lên
                        onChange={handleUploadChange}
                        onRemove={handleRemove}
                    >
                        <Button icon={<UploadOutlined />}>Tải lên Avatar</Button>
                    </Upload>
                    {avatarFileList.length > 0 && <span style={{ marginLeft: '10px' }}>{avatarFileList[0].name}</span>}
                </div>
                {avatarUrl && (
                    <img
                        src={avatarUrl}
                        alt="Xem trước Avatar"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                    />
                )}
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                    Add User
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddUser;
