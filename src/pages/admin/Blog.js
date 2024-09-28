// Blog.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Upload, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, LogoutOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';

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
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    // Dữ liệu mẫu
    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                name: 'First Blog Post',
                description: 'This is the first blog post.',
                image_path: '/path/to/image1.jpg',
            },
            {
                id: 2,
                name: 'Second Blog Post',
                description: 'This is the second blog post.',
                image_path: '/path/to/image2.jpg',
            },
            {
                id: 3,
                name: 'Third Blog Post',
                description: 'This is the third blog post.',
                image_path: '/path/to/image3.jpg',
            },
            {
                id: 4,
                name: 'Fourth Blog Post',
                description: 'This is the fourth blog post.',
                image_path: '/path/to/image4.jpg',
            },
            {
                id: 5,
                name: 'Fifth Blog Post',
                description: 'This is the fifth blog post.',
                image_path: '/path/to/image5.jpg',
            },
            {
                id: 6,
                name: 'Sixth Blog Post',
                description: 'This is the sixth blog post.',
                image_path: '/path/to/image6.jpg',
            },
        ];
        setDataSource(sampleData);
    }, []);

    const showModal = (post = null) => {
        setIsModalVisible(true);
        setImageUrl(''); // Reset image URL
        setFileList([]); // Reset file list
        setCurrentPost(post);
        if (post) {
            setIsEditMode(true);
            form.setFieldsValue(post);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (isEditMode && currentPost) {
                // Sửa bài viết
                setDataSource(
                    dataSource.map((post) =>
                        post.id === currentPost.id ? { ...post, ...values, image_path: imageUrl } : post,
                    ),
                );
            } else {
                // Thêm bài viết
                setDataSource([...dataSource, { id: dataSource.length + 1, ...values, image_path: imageUrl }]);
            }
            form.resetFields();
            setIsModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
                setImageUrl(reader.result);
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

    const handleDelete = (id) => {
        setDataSource(dataSource.filter((post) => post.id !== id));
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
                <span>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, backgroundColor: '#32CD32', borderColor: '#32CD32' }}
                        onClick={() => showModal(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this blog post?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            style={{ marginLeft: 8, backgroundColor: '#f60308', borderColor: '#f60308' }}
                        />
                    </Popconfirm>
                </span>
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
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={handleOk} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the blog name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Upload Image">
                            <Upload
                                beforeUpload={() => false} // Ngăn không tự động upload
                                showUploadList={false} // Ẩn danh sách upload nếu không cần
                                fileList={fileList}
                                onChange={handleChange}
                                onRemove={handleRemove}
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
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
            </Content>
        </Layout>
    );
};

export default Blog;
