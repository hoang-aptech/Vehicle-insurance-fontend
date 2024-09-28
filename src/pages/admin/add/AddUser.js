// AddUser.js
import React, { useState } from 'react';
import { Layout, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const AddUser = () => {
    const [fileName, setFileName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [fileList, setFileList] = useState([]);

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Thêm logic để xử lý dữ liệu người dùng mới
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);

        if (fileList.length > 0) {
            const file = fileList[fileList.length - 1].originFileObj; // Lấy đối tượng Blob từ tệp mới nhất
            setFileName(fileList[fileList.length - 1].name); // Cập nhật tên tệp

            // Tạo URL cho hình ảnh xem trước
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file); // Đọc tệp hình ảnh
        } else {
            setFileName('');
            setImageUrl('');
        }
    };

    const handleRemove = (file) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid); // Xóa tệp khỏi fileList
        setFileList(newFileList); // Cập nhật fileList

        if (newFileList.length === 0) {
            setFileName(''); // Reset tên tệp
            setImageUrl(''); // Reset URL hình ảnh
        } else {
            const lastFile = newFileList[newFileList.length - 1];
            setFileName(lastFile.name); // Cập nhật tên tệp mới nhất
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(lastFile.originFileObj); // Đọc lại tệp mới nhất
        }
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
                    <Form.Item name="avatar" label="Avatar">
                        <div>
                            <Upload
                                beforeUpload={() => false} // Ngăn không tự động upload
                                showUploadList={false} // Ẩn danh sách upload nếu không cần
                                fileList={fileList}
                                onChange={handleChange}
                                onRemove={handleRemove}
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                            {/* Hiển thị tên tệp bên cạnh */}
                            {fileName && <span style={{ marginLeft: '10px' }}>{fileName}</span>}
                        </div>
                    </Form.Item>
                    {imageUrl && (
                        <Form.Item label="Preview">
                            <img
                                src={imageUrl}
                                alt="preview"
                                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                            />
                        </Form.Item>
                    )}
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
