import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditUser = ({ user, onFinish }) => {
    const [form] = Form.useForm();
    const [avatarFileList, setAvatarFileList] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (user && user.avatar) {
            setAvatarUrl(`data:image/png;base64,${user.avatar}`); // Đảm bảo rằng avatar là chuỗi base64 hợp lệ
            setFileName(user.avatarName || ''); // Lấy tên tệp từ user.avatarName nếu có
        }
        form.setFieldsValue(user);
        return () => {
            form.resetFields();
        };
    }, [user]);

    const handleUploadChange = ({ fileList }) => {
        setAvatarFileList(fileList);
        if (fileList.length > 0) {
            const file = fileList[fileList.length - 1].originFileObj;
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result); // Cập nhật avatarUrl với ảnh mới
                setFileName(file.name); // Lưu tên tệp mới
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarUrl('');
            setFileName(''); // Đặt lại tên tệp khi không có tệp
        }
    };

    const handleRemove = (file) => {
        const newFileList = avatarFileList.filter((item) => item.uid !== file.uid);
        setAvatarFileList(newFileList);
        if (newFileList.length === 0) {
            setAvatarUrl('');
            setFileName(''); // Đặt lại tên tệp khi không có tệp
        } else {
            const lastFile = newFileList[newFileList.length - 1];
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result);
                setFileName(lastFile.name); // Cập nhật tên tệp
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
                onFinish({ ...values, avatar: base64String, avatarName: file.name }); // Gửi tên tệp cùng với ảnh
            };
            reader.readAsDataURL(file);
        } else {
            onFinish({ ...values, avatar: avatarUrl, avatarName: fileName }); // Gửi avatar hiện tại và tên tệp
        }
    };

    return (
        <Form name="editUser" form={form} onFinish={handleSubmit}>
            <Form.Item name="username" label="UserName" rules={[{ required: true, message: 'Please enter username!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="fullname"
                label="FullName"
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
            <Form.Item
                name="password"
                label="Password (if you want to change)"
                rules={[{ required: false, message: 'Please enter your password if you want to change it!' }]}
            >
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
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    {avatarUrl && (
                        <img
                            src={avatarUrl}
                            alt="Xem trước Avatar"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                        />
                    )}
                    {fileName && <span>{fileName}</span>} {/* Hiển thị tên tệp bên cạnh ảnh */}
                </div>
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
