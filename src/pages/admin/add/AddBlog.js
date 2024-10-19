// AddBlog.js
import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';

const AddBlog = ({ onFinish }) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState('');
    const [imageFileList, setImageFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const handleUploadChange = ({ fileList }) => {
        setImageFileList(fileList);
        if (fileList.length > 0) {
            const file = fileList[fileList.length - 1].originFileObj;
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl('');
        }
    };

    const handleRemove = (file) => {
        const newFileList = imageFileList.filter((item) => item.uid !== file.uid);
        setImageFileList(newFileList);
        if (newFileList.length === 0) {
            setImageUrl('');
        } else {
            const lastFile = newFileList[newFileList.length - 1];
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(lastFile.originFileObj);
        }
    };

    const handleSubmit = async (values) => {
        if (imageFileList.length > 0) {
            const file = imageFileList[imageFileList.length - 1].originFileObj; // Get the first file
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Get the Base64 part
                onFinish({ ...values, description, image: base64String });
            };
            reader.readAsDataURL(file);
        } else {
            onFinish({ ...values, description });
        }
    };

    const handleDescriptionChange = (newContent) => {
        form.setFieldValue('description', newContent);
        setDescription(newContent);
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Editor
                    apiKey="l1i9v8q0xwfkdzno0iih7p59m4dqchz5cdie0khvrozcztbg"
                    value={description}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: ['image'],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help',
                        automatic_uploads: false, // Tắt tự động upload
                        images_upload_handler: (blobInfo, success) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                // Chèn hình ảnh dưới dạng base64
                                success(reader.result);
                            };
                            reader.readAsDataURL(blobInfo.blob()); // Đọc blob thành chuỗi nhị phân
                        },
                    }}
                    onEditorChange={handleDescriptionChange}
                />
            </Form.Item>
            <Form.Item name="image_path" label="Upload Image_Path">
                <div>
                    <Upload
                        fileList={imageFileList}
                        showUploadList={false}
                        beforeUpload={() => false} // Không tự động tải lên
                        onChange={handleUploadChange}
                        onRemove={handleRemove}
                    >
                        <Button icon={<UploadOutlined />}>Tải lên Avatar</Button>
                    </Upload>
                    {imageFileList.length > 0 && <span style={{ marginLeft: '10px' }}>{imageFileList[0].name}</span>}
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Xem trước Avatar"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                        />
                    )}
                </div>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddBlog;
