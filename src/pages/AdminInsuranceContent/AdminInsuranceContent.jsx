import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;

const AdminInsuranceContent = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [currentRecord, setCurrentRecord] = useState(null);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contentTypes = [
        'title',
        'subtitle',
        'description',
        'buttonText1',
        'buttonText2',
        'benefitTitle',
        'Description',
        'benefits',
        'benefits',
        'benefits',
        'buttons',
        'buttons',
        'buttons',
        'buttons',
        'title2',
        'features',
        'features',
        'features',
        'features',
        'features',
        'features',
        'title3',
        'claims',
        'claims',
        'claims',
        'claims',
        'claims',
        'title4',
        'features5',
        'features5',
        'features5',
        'features5',
        'features5',
        'features5',
        'title5',
        'description2',
        'features13',
        'features13',
        'features13',
        'steps',
        'steps',
        'steps',
        'title6',
        'title7',
        'questions7',
        'questions7',
        'questions7',
    ];

    const API_URL = 'https://localhost:7289/api/Insurancecontents';

    const fetchInsuranceData = async () => {
        try {
            const response = await axios.get(API_URL);
            setDataSource(response.data);
        } catch (error) {
            message.error('Failed to retrieve insurance data!');
        }
    };

    useEffect(() => {
        fetchInsuranceData();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
    };

    const showEditModal = (record) => {
        setIsEditModalVisible(true);
        setCurrentRecord(record);
        editForm.setFieldsValue({
            insuranceId: record.insuranceId,
            ...record,
        });
    };

    const handlePageChange = () => {
        const currentValues = form.getFieldsValue();
        setFormData((prev) => ({ ...prev, ...currentValues }));
    };

    const handleAdd = async () => {
        if (isSubmitting) return; // Ngăn gửi nhiều lần
        setIsSubmitting(true);

        try {
            const currentValues = form.getFieldsValue();
            const allValues = { ...formData, ...currentValues };
            console.log('All Form Values:', allValues);

            if (!allValues.insuranceId) {
                message.error('Please fill in the Insurance ID!');
                return;
            }

            const allRecordsResponse = await axios.get(API_URL);
            const allRecords = allRecordsResponse.data;

            const allInsuranceIds = allRecords.map((record) => record.insuranceId);
            if (allInsuranceIds.includes(allValues.insuranceId)) {
                message.error('Insurance ID already exists!');
                return;
            }

            const maxId = allRecords.length > 0 ? Math.max(...allRecords.map((record) => record.id)) : 0;

            const newEntries = contentTypes
                .map((type, index) => ({
                    id: maxId + index + 1,
                    insuranceId: allValues.insuranceId,
                    contentType: type,
                    title: allValues[`title_${type}`] || null,
                    description: allValues[`description_${type}`] || null,
                }))
                .filter((entry) => entry.title || entry.description);

            console.log('Data to be sent:', newEntries);

            await Promise.all(newEntries.map((entry) => axios.post(API_URL, entry)));

            message.success('Added successfully!');
            setIsModalVisible(false);
            fetchInsuranceData();
        } catch (error) {
            console.error('Error during add:', error);
            message.error('Add failed!');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const values = editForm.getFieldsValue();
            if (currentRecord) {
                values.id = currentRecord.id;

                if (!values.insuranceId || !values.contentType || !values.title || !values.description) {
                    message.error('Please fill in all required fields!');
                    return;
                }

                await axios.put(`${API_URL}/${currentRecord.id}`, values);
                message.success('Updated successfully!');
            }

            setIsEditModalVisible(false);
            fetchInsuranceData();
        } catch (error) {
            console.error('Error during update:', error);
            message.error('Update failed!');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false);
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
                    message.error('Delete failed!');
                }
            },
        });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#006494', color: '#fff' }}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>
                    Add New Content
                </Button>
                <h1 style={{ margin: 0, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
                    Insurance Contents
                </h1>
            </Header>
            <Content style={{ padding: '20px' }}>
                <Table
                    columns={[
                        { title: 'Id', dataIndex: 'id', key: 'id' },
                        { title: 'Insurance ID', dataIndex: 'insuranceId', key: 'insuranceId' },
                        { title: 'Content Type', dataIndex: 'contentType', key: 'contentType' },
                        { title: 'Title', dataIndex: 'title', key: 'title' },
                        { title: 'Description', dataIndex: 'description', key: 'description' },
                        {
                            title: 'Actions',
                            dataIndex: 'actions',
                            key: 'actions',
                            render: (text, record) => (
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                        onClick={() => showEditModal(record)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    <Button
                                        type="danger"
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(record.id)}
                                    />
                                </span>
                            ),
                        },
                    ]}
                    dataSource={dataSource}
                />
                <Modal
                    title="Add New Content"
                    visible={isModalVisible}
                    onOk={handleAdd}
                    onCancel={handleCancel}
                    afterClose={() => setFormData({})}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Insurance ID"
                            name="insuranceId"
                            rules={[{ required: true, message: 'Please input Insurance ID!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Table
                            columns={[
                                { title: 'Content Type', dataIndex: 'contentType', key: 'contentType' },
                                { title: 'Title', dataIndex: 'title', key: 'title' },
                                { title: 'Description', dataIndex: 'description', key: 'description' },
                            ]}
                            dataSource={contentTypes.map((type, index) => ({
                                key: index,
                                contentType: type,
                                title: (
                                    <Form.Item name={`title_${type}`} noStyle>
                                        <Input />
                                    </Form.Item>
                                ),
                                description: (
                                    <Form.Item name={`description_${type}`} noStyle>
                                        <Input.TextArea />
                                    </Form.Item>
                                ),
                            }))}
                            pagination={{ onChange: handlePageChange }}
                        />
                    </Form>
                </Modal>

                <Modal
                    title="Edit Content"
                    visible={isEditModalVisible}
                    onOk={handleUpdate}
                    onCancel={() => setIsEditModalVisible(false)}
                >
                    <Form form={editForm} layout="vertical">
                        <Form.Item
                            label="Insurance ID"
                            name="insuranceId"
                            rules={[{ required: true, message: 'Please input Insurance ID!' }]}
                        >
                            <Input disabled defaultValue={currentRecord?.insuranceId} />
                        </Form.Item>
                        <Form.Item
                            label="Content Type"
                            name="contentType"
                            rules={[{ required: true, message: 'Please input Content Type!' }]}
                        >
                            <Input disabled defaultValue={currentRecord?.contentType} />
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input Title!' }]}
                        >
                            <Input defaultValue={currentRecord?.title} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input Description!' }]}
                        >
                            <Input.TextArea defaultValue={currentRecord?.description} />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default AdminInsuranceContent;
