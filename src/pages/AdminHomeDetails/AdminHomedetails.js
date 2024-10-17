import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;

const InsuranceContents = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);
    const [form] = Form.useForm();

    const API_URL = 'https://localhost:7289/api/Insurancecontents';

    const fetchInsuranceData = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log('Data received from API:', response.data);
            setDataSource(response.data);
        } catch (error) {
            console.error('Unable to fetch insurance data:', error);
            message.error('Failed to retrieve insurance data!');
        }
    };

    useEffect(() => {
        fetchInsuranceData();
    }, []);

    const showModal = (content = null) => {
        setIsModalVisible(true);
        setCurrentContent(content);
        if (content) {
            setIsEditMode(true);
            form.setFieldsValue({
                contentType: content.contentType,
                title: content.title,
                description: content.description,
            });
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = form.getFieldsValue();
            if (isEditMode && currentContent) {
                values.id = currentContent.id;
                console.log('Data sent to API:', values);
                if (!values.contentType || !values.title || !values.description) {
                    message.error('Please fill in all required fields!');
                    return;
                }
                await axios.put(`${API_URL}/${currentContent.id}`, values);
                message.success('Updated successfully!');
            } else {
                await axios.post(API_URL, values);
                message.success('Added successfully!');
            }
            setIsModalVisible(false);
            fetchInsuranceData();
        } catch (error) {
            console.error('Error during update:', error);
            message.error('Update failed!');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Content',
            content: 'Are you sure you want to delete this content?',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    await axios.delete(`${API_URL}/${id}`);
                    setDataSource(dataSource.filter((content) => content.id !== id));
                    message.success('Deleted successfully!');
                } catch (error) {
                    console.error('Unable to delete content:', error);
                    message.error('Delete failed!');
                }
            },
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Content Type',
            dataIndex: 'contentType',
            key: 'contentType',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record)} />
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </div>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#006494', color: '#fff' }}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => showModal()}>
                    Add New Content
                </Button>
                <h1 style={{ margin: 0 }}>Insurance Content Management</h1>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Table columns={columns} dataSource={dataSource} rowKey="id" />

                <Modal
                    title={isEditMode ? 'Edit Content' : 'Add New Content'}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="contentType"
                            label="Content Type"
                            rules={[{ required: true, message: 'Please enter content type!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter description!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default InsuranceContents;
