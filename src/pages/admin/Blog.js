import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Input, Row, Col, Card, Popconfirm, Modal, Form } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddBlog from './add/AddBlog';
import EditBlog from './edit/EditBlog';

const { Header, Content } = Layout;

const BlogAdmin = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [deletedBlogs, setDeletedBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isDeletedModalVisible, setIsDeletedModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [form] = Form.useForm();

    const API_URL = 'https://localhost:7289/api/News';

    // Fetch blog data
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(API_URL);
            setDataSource(response.data);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        }
    };

    // Fetch deleted blogs
    const fetchDeletedBlogs = async () => {
        try {
            const response = await axios.get(`${API_URL}/deleted`);
            setDeletedBlogs(response.data);
        } catch (error) {
            console.error('Failed to fetch deleted blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
        setCurrentPage(1);
    };

    const filteredBlogs = dataSource.filter((blog) => {
        const searchLower = filterName.toLowerCase();
        const nameLower = blog.name ? blog.name.toLowerCase() : '';
        return nameLower.includes(searchLower);
    });

    const paginatedBlogs = filteredBlogs;

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
            dataIndex: 'image',
            key: 'image',
            render: (text) =>
                text ? (
                    <img
                        src={`data:image/png;base64,${text}`}
                        alt="Blog"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                    />
                ) : (
                    <span>No Image</span>
                ),
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
                        onClick={() => handleEdit(record)}
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
                    <Popconfirm title="Are you sure to delete this blog?" onConfirm={() => handleDelete(record.id)}>
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            style={{ backgroundColor: '#f60308', borderColor: '#f60308' }}
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        form.setFieldsValue({
            name: blog.name,
            description: blog.description,
        });
        setIsEditModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((blog) => blog.id !== id));
        } catch (error) {
            console.error('Failed to delete blog:', error);
        }
    };

    const handleModalCancel = () => {
        setIsAddModalVisible(false);
        setIsEditModalVisible(false);
        setIsDetailModalVisible(false);
        setIsDeletedModalVisible(false);
        form.resetFields();
        setSelectedBlog(null);
    };

    const handleAddOk = async (values) => {
        const updatedValues = { ...values };

        if (updatedValues.image) {
            updatedValues.image = updatedValues.image.replace('data:image/png;base64,', '');
        } else {
            alert('Please select image of blog');
        }

        try {
            const response = await axios.post(API_URL, {
                ...updatedValues,
                verified: false,
            });

            setDataSource([...dataSource, response.data]);
            setIsAddModalVisible(false);
        } catch (error) {
            console.error('Failed to add blog:', error.response?.data?.errors || error.response?.data || error);
        }
    };

    const handleEditOk = async (values) => {
        const updatedValues = { ...values };
        if (updatedValues.image_path) {
            updatedValues.image_path = updatedValues.image_path.replace('data:image/png;base64,', '');
        }

        try {
            await axios.put(`${API_URL}/${selectedBlog.id}`, {
                id: selectedBlog.id,
                ...updatedValues,
            });

            fetchBlogs();
            setIsEditModalVisible(false);
        } catch (error) {
            console.error('Failed to edit user:', error);
        }
    };

    const handleDetail = (blog) => {
        setSelectedBlog(blog);
        setIsDetailModalVisible(true);
    };

    const showDeletedBlogsModal = () => {
        fetchDeletedBlogs();
        setIsDeletedModalVisible(true);
    };

    const handleRestore = async (id) => {
        try {
            await axios.put(`${API_URL}/restore/${id}`);
            fetchBlogs();
            fetchDeletedBlogs();
        } catch (error) {
            console.error('Failed to restore blog:', error);
        }
    };

    const handlePermanentDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/deleted/${id}`);
            fetchDeletedBlogs();
        } catch (error) {
            console.error('Failed to permanently delete blog:', error);
        }
    };

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
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setIsAddModalVisible(true)}>
                    Add Blog
                </Button>
                <h1 style={{ margin: 0 }}>Blog Management</h1>
                <div></div>
            </Header>

            <Content style={{ margin: '16px' }}>
                <div style={{ padding: 24, background: '#fff' }}>
                    <Input
                        placeholder="Search for blog by name"
                        value={filterName}
                        onChange={handleFilterChange}
                        style={{ marginBottom: 16 }}
                    />

                    <Row gutter={16}>
                        <Col span={24}>
                            <Table
                                dataSource={paginatedBlogs}
                                columns={columns}
                                rowKey="id"
                                pagination={{
                                    pageSize: 5,
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Content>

            <Modal title="Add Blog" open={isAddModalVisible} onCancel={handleModalCancel} footer={null}>
                <AddBlog onFinish={handleAddOk} />
            </Modal>

            <Modal title="Edit Blog" open={isEditModalVisible} onCancel={handleModalCancel} footer={null}>
                <EditBlog blog={selectedBlog} onFinish={handleEditOk} />
            </Modal>

            <Modal title="Blog Details" open={isDetailModalVisible} onCancel={handleModalCancel} footer={null}>
                {selectedBlog && (
                    <Card style={{ padding: 16 }}>
                        <h3>{selectedBlog.name}</h3>
                        <div dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
                        <p>
                            <strong>Image:</strong>
                        </p>
                        <img
                            src={`data:image/png;base64,${selectedBlog.image_path}`}
                            alt="Blog"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Card>
                )}
            </Modal>

            <Modal title="Deleted Blogs" open={isDeletedModalVisible} onCancel={handleModalCancel} footer={null}>
                {deletedBlogs.map((blog) => (
                    <Card key={blog.id} style={{ marginBottom: 16, padding: 16 }}>
                        <p>
                            <strong>ID:</strong> {blog.id}
                        </p>
                        <p>
                            <strong>Name:</strong> {blog.name}
                        </p>
                        <Popconfirm title="Are you sure to restore this blog?" onConfirm={() => handleRestore(blog.id)}>
                            <Button type="primary" style={{ marginRight: 8 }}>
                                Restore
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Are you sure to permanently delete this blog?"
                            onConfirm={() => handlePermanentDelete(blog.id)}
                        >
                            <Button type="danger">Delete Permanently</Button>
                        </Popconfirm>
                    </Card>
                ))}
            </Modal>
        </Layout>
    );
};

export default BlogAdmin;
