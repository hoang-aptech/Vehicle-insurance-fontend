// Insurance.js
import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';

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

    // Dữ liệu mẫu
    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                name: 'Health Insurance',
                description: 'Comprehensive health coverage.',
                duration: 12,
                price: 500.0,
            },
            { id: 2, name: 'Car Insurance', description: 'Insurance for your car.', duration: 12, price: 300.5 },
            { id: 3, name: 'Home Insurance', description: 'Protection for your home.', duration: 12, price: 400.75 },
            { id: 4, name: 'Travel Insurance', description: 'Insurance for your travels.', duration: 6, price: 150.25 },
            {
                id: 5,
                name: 'Life Insurance',
                description: 'Financial protection for your loved ones.',
                duration: 24,
                price: 600.0,
            },
        ];
        setDataSource(sampleData);
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

    const handleOk = () => {
        form.validateFields().then((values) => {
            const updatedInsurance = { ...values, description: content }; // Get the content from TinyMCE
            if (isEditMode && currentInsurance) {
                // Sửa bảo hiểm
                setDataSource(
                    dataSource.map((ins) => (ins.id === currentInsurance.id ? { ...ins, ...updatedInsurance } : ins)),
                );
            } else {
                // Thêm bảo hiểm
                setDataSource([...dataSource, { id: dataSource.length + 1, ...updatedInsurance }]);
            }
            form.resetFields();
            setContent('');
            setIsModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = (id) => {
        setDataSource(dataSource.filter((ins) => ins.id !== id));
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
                <span>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, backgroundColor: '#32CD32', borderColor: '#32CD32' }}
                        onClick={() => showModal(record)}
                    />
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        style={{ marginLeft: 8, backgroundColor: '#f60308', borderColor: '#f60308' }}
                        onClick={() => handleDelete(record.id)}
                    />
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
                    visible={isModalVisible}
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
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount',
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'link image | removeformat | help',
                                }}
                                onEditorChange={(newContent) => setContent(newContent)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Insurance;
