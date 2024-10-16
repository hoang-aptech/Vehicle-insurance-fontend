import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';

const EditBlog = ({ blog, onFinish }) => {
    const [description, setDescription] = useState('');
    const [imageFileList, setImageFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        if (blog && blog.image) {
            form.setFieldsValue(blog);

            setImageUrl(`data:image/png;base64,${blog.image}`); // Đảm bảo rằng image_path là chuỗi base64 hợp lệ
            // setFileName(blog.image_name || ''); // Lấy tên tệp từ blog.image_name nếu có
            setDescription(blog.description || ''); // Thiết lập mô tả từ blog
        }
    }, [blog]);

    const handleUploadChange = ({ fileList }) => {
        setImageFileList(fileList);
        if (fileList.length > 0) {
            const file = fileList[fileList.length - 1].originFileObj;
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result); // Cập nhật imageUrl với ảnh mới
                setFileName(file.name); // Lưu tên tệp mới
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl('');
            setFileName(''); // Đặt lại tên tệp khi không có tệp
        }
    };

    const handleRemove = (file) => {
        const newFileList = imageFileList.filter((item) => item.uid !== file.uid);
        setImageFileList(newFileList);
        if (newFileList.length === 0) {
            setImageUrl('');
            setFileName(''); // Đặt lại tên tệp khi không có tệp
        } else {
            const lastFile = newFileList[newFileList.length - 1];
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
                setFileName(lastFile.name); // Cập nhật tên tệp
            };
            reader.readAsDataURL(lastFile.originFileObj);
        }
    };

    const handleSubmit = async (values) => {
        if (imageFileList.length > 0) {
            const file = imageFileList[imageFileList.length - 1].originFileObj;
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Lấy phần Base64
                onFinish({ ...values, description, image: base64String }); // Gửi tên tệp cùng với ảnh
            };
            reader.readAsDataURL(file);
        } else {
            onFinish({ ...values, description, image: imageUrl.replace('data:image/png;base64,', '') }); // Gửi hình ảnh hiện tại và tên tệp
        }
    };

    const handleChangeDescription = (content) => {
        form.setFieldValue('description', content);
        setDescription(content);
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                value={description}
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Editor
                    apiKey="l1i9v8q0xwfkdzno0iih7p59m4dqchz5cdie0khvrozcztbg"
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: ['image'],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help',
                    }}
                    onEditorChange={handleChangeDescription}
                />
            </Form.Item>
            <Form.Item name="image_path" label="Upload Image">
                <div>
                    <Upload
                        fileList={imageFileList}
                        showUploadList={false}
                        beforeUpload={() => false} // Không tự động tải lên
                        onChange={handleUploadChange}
                        onRemove={handleRemove}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                        />
                    )}
                    {fileName && <span>{fileName}</span>} {/* Hiển thị tên tệp bên cạnh ảnh */}
                </div>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditBlog;
