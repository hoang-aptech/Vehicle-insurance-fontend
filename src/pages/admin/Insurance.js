import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const { Header, Content } = Layout;

const Insurance = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentInsurance, setCurrentInsurance] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [content, setContent] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const API_URL = 'https://localhost:7289/api/Insurances';

    // Fetch insurance data from the API
    useEffect(() => {
        const fetchInsuranceData = async () => {
            try {
                const response = await axios.get(API_URL);
                setDataSource(response.data);
            } catch (error) {
                console.error('Failed to fetch insurance data:', error);
            }
        };
        fetchInsuranceData();
    }, []);

    const showModal = (insurance = null) => {
        setIsModalVisible(true);
        setCurrentInsurance(insurance);
        if (insurance) {
            setIsEditMode(true);
            form.setFieldsValue(insurance);
            setContent(insurance.description); // Set content for TinyMCE
        } else {
            setIsEditMode(false);
            form.resetFields();
            setContent('');
        }
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        const updatedInsurance = { ...values, description: content }; // Get the content from TinyMCE
        if (isEditMode && currentInsurance) {
            // Update insurance
            try {
                const response = await axios.put(`${API_URL}/${currentInsurance.id}`, updatedInsurance);
                setDataSource(dataSource.map((ins) => (ins.id === currentInsurance.id ? response.data : ins)));
            } catch (error) {
                console.error('Failed to update insurance:', error);
            }
        } else {
            // Add new insurance
            try {
                const response = await axios.post(API_URL, updatedInsurance);
                setDataSource([...dataSource, response.data]);
            } catch (error) {
                console.error('Failed to add insurance:', error);
            }
        }
        form.resetFields();
        setContent('');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((ins) => ins.id !== id));
        } catch (error) {
            console.error('Failed to delete insurance:', error);
        }
    };

    const handleDetail = (insurance) => {
        setCurrentInsurance(insurance);
        setIsDetailModalVisible(true);
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
            title: 'Duration (Months)',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`,
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
                    Add Insurance
                </Button>
                <h1 style={{ margin: 0 }}>Insurance Management</h1>
                <Button type="default" icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }} />
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: dataSource.length,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />

                <Modal
                    title={isEditMode ? 'Edit Insurance' : 'Add New Insurance'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={handleOk} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the insurance name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="duration"
                            label="Duration (Months)"
                            rules={[{ required: true, message: 'Please input the duration!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input type="number" step="0.01" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Editor
                                apiKey="l1i9v8q0xwfkdzno0iih7p59m4dqchz5cdie0khvrozcztbg"
                                initialValue={content}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: ['image'],
                                    toolbar:
                                        'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'image | removeformat | help',
                                    automatic_uploads: false,
                                    images_upload_handler: (blobInfo, success) => {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            success(reader.result);
                                        };
                                        reader.readAsDataURL(blobInfo.blob());
                                    },
                                }}
                                onEditorChange={(newContent) => setContent(newContent)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Insurance Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                >
                    {currentInsurance && (
                        <Card>
                            <p>
                                <strong>ID:</strong> {currentInsurance.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {currentInsurance.name}
                            </p>
                            <p>
                                <strong>Description:</strong>{' '}
                                <div dangerouslySetInnerHTML={{ __html: currentInsurance.description }} />
                            </p>
                            <p>
                                <strong>Duration:</strong> {currentInsurance.duration} months
                            </p>
                            <p>
                                <strong>Price:</strong> ${currentInsurance.price.toFixed(2)}
                            </p>
                        </Card>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default Insurance;
