import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Upload, Card } from 'antd';
import { EditOutlined, DeleteOutlined, LogoutOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const { Header, Content } = Layout;

const Blog = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterName, setFilterName] = useState('');
    const [description, setDescription] = useState('');
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const API_URL = 'https://localhost:7289/api/News';

    // Fetch blog posts from the API
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get(API_URL);
                setDataSource(response.data);
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            }
        };
        fetchBlogPosts();
    }, []);

    const showModal = (post = null) => {
        setIsModalVisible(true);
        setCurrentPost(post);
        setImageUrl(''); // Reset image URL
        setFileList([]); // Reset file list
        if (post) {
            setIsEditMode(true);
            form.setFieldsValue(post);
            setDescription(post.description); // Set description for TinyMCE
            setImageUrl(post.image_path); // Set image URL if editing
        } else {
            setIsEditMode(false);
            form.resetFields();
            setDescription('');
        }
    };

    const handleDetail = (post) => {
        setCurrentPost(post);
        setIsDetailModalVisible(true);
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        const updatedPost = {
            ...values,
            description,
            image_path: imageUrl,
        };

        if (isEditMode && currentPost) {
            // Update blog post
            try {
                const response = await axios.put(`${API_URL}/${currentPost.id}`, updatedPost);
                setDataSource(dataSource.map((post) => (post.id === currentPost.id ? response.data : post)));
            } catch (error) {
                console.error('Failed to update blog post:', error);
            }
        } else {
            // Add new blog post
            try {
                const response = await axios.post(API_URL, updatedPost);
                setDataSource([...dataSource, response.data]);
            } catch (error) {
                console.error('Failed to add blog post:', error);
            }
        }

        form.resetFields();
        setDescription('');
        setImageUrl('');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((post) => post.id !== id));
        } catch (error) {
            console.error('Failed to delete blog post:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = dataSource.filter((item) => item.name.toLowerCase().includes(filterName.toLowerCase()));

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
        if (fileList.length > 0) {
            const file = fileList[fileList.length - 1].originFileObj;
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result); // Save binary string
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl('');
        }
    };

    const handleRemove = (file) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(newFileList);
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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
        {
            title: 'Image',
            dataIndex: 'image_path',
            key: 'image_path',
            render: (text) => <img src={text} alt="Blog" style={{ width: 100 }} />,
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
                        onClick={() => showModal(record)}
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
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        style={{ marginLeft: 8, backgroundColor: '#f60308', borderColor: '#f60308' }}
                        onClick={() => handleDelete(record.id)}
                    />
                </div>
            ),
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
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => showModal()}>
                    Add Post
                </Button>
                <h1 style={{ margin: 0 }}>Blog Management</h1>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Name" value={filterName} onChange={handleFilterChange} />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: filteredData.length,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />

                <Modal
                    title={isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={handleOk} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the blog post name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Editor
                                apiKey="l1i9v8q0xwfkdzno0iih7p59m4dqchz5cdie0khvrozcztbg"
                                initialValue={description}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: ['image'],
                                    toolbar:
                                        'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'image | removeformat | help',
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
                                onEditorChange={(newDescription) => setDescription(newDescription)}
                            />
                        </Form.Item>
                        <Form.Item label="Upload Image">
                            <div>
                                <Upload
                                    beforeUpload={() => false} // Ngăn không tự động tải lên
                                    showUploadList={false} // Ẩn danh sách upload nếu không cần
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onRemove={handleRemove}
                                >
                                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                                </Upload>
                                {fileList.length > 0 && <span style={{ marginLeft: '10px' }}>{fileList[0].name}</span>}
                            </div>
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Blog Post Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                >
                    {currentPost && (
                        <Card>
                            <p>
                                <strong>ID:</strong> {currentPost.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {currentPost.name}
                            </p>
                            <p>
                                <strong>Description:</strong>{' '}
                                <div dangerouslySetInnerHTML={{ __html: currentPost.description }} />
                            </p>
                            <p>
                                <strong>Image:</strong>{' '}
                                <img src={currentPost.image_path} alt="Blog" style={{ width: 100 }} />
                            </p>
                        </Card>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default Blog;
