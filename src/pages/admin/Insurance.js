import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Card, Select, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const { Header, Content } = Layout;
const { Option } = Select;

const Insurance = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentInsurance, setCurrentInsurance] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterName, setFilterName] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [descriptionContent, setDescriptionContent] = useState('');
    const [clauseContent, setClauseContent] = useState('');

    const API_URL = 'https://localhost:7289/api/Insurances';

    const fetchInsuranceData = async () => {
        try {
            const response = await axios.get(API_URL);
            setDataSource(response.data);
        } catch (error) {
            console.error('Unable to fetch insurance data:', error);
        }
    };

    useEffect(() => {
        fetchInsuranceData();
    }, []);

    const showModal = (insurance = null) => {
        setIsModalVisible(true);
        setCurrentInsurance(insurance);
        if (insurance) {
            setIsEditMode(true);
            form.setFieldsValue(insurance);
            setDescriptionContent(insurance.description); // Set content for description
            setClauseContent(insurance.clause); // Set content for clause
        } else {
            setIsEditMode(false);
            form.resetFields();
            setDescriptionContent('');
            setClauseContent('');
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const insuranceData = {
                ...values,
                description: descriptionContent, // Mô tả
                clause: clauseContent, // Điều khoản
            };

            if (isEditMode && currentInsurance) {
                await axios.put(`${API_URL}/${currentInsurance.id}`, {
                    id: currentInsurance.id,
                    ...insuranceData,
                });
            } else {
                const response = await axios.post(API_URL, insuranceData);
                setDataSource((prevData) => [...prevData, response.data]);
            }

            setIsModalVisible(false);
            form.resetFields();
            setDescriptionContent(''); // Reset nội dung mô tả
            setClauseContent(''); // Reset nội dung điều khoản
            fetchInsuranceData();
        } catch (error) {
            console.error('Unable to update insurance information:', error.response?.data || error);
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = (dataSource || []).filter((item) => {
        return item && item.name && item.name.toLowerCase().includes(filterName.toLowerCase());
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setDataSource(dataSource.filter((insurance) => insurance.id !== id));
        } catch (error) {
            console.error('Unable to delete insurance:', error);
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
            title: 'Clause',
            dataIndex: 'clause',
            key: 'clause',
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Is New',
            dataIndex: 'isNew',
            key: 'isNew',
            render: (text) => (text ? 'Yes' : 'No'),
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
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input placeholder="Filter by Name" value={filterName} onChange={handleFilterChange} />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="id"
                />

                <Modal
                    title={isEditMode ? 'Edit Insurance Record' : 'Add New Insurance Record'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter the name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please select the type!' }]}
                        >
                            <Select placeholder="Select type">
                                <Option value="Car">Car</Option>
                                <Option value="Motorbike">Motorbike</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="isNew" valuePropName="checked">
                            <Checkbox>Is New</Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please enter a description!' }]}
                        >
                            <Editor
                                apiKey="l1i9v8q0xwfkdzno0iih7p59m4dqchz5cdie0khvrozcztbg"
                                initialValue={descriptionContent}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: ['image'],
                                    toolbar:
                                        'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'image | removeformat | help',
                                }}
                                onEditorChange={(newContent) => setDescriptionContent(newContent)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Clause"
                            name="clause"
                            rules={[{ required: true, message: 'Please enter a clause!' }]}
                        >
                            <Editor
                                apiKey="l1i9v8q0xwfkdzno0iih7p59m4dqchz5cdie0khvrozcztbg"
                                initialValue={clauseContent}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: ['image'],
                                    toolbar:
                                        'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'image | removeformat | help',
                                }}
                                onEditorChange={(newContent) => setClauseContent(newContent)}
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
                                <strong>Clause:</strong>{' '}
                                <div dangerouslySetInnerHTML={{ __html: currentInsurance.clause }} />
                            </p>
                            <p>
                                <strong>Type:</strong> {currentInsurance.type}
                            </p>
                            <p>
                                <strong>Is New:</strong> {currentInsurance.isNew ? 'Yes' : 'No'}
                            </p>
                        </Card>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default Insurance;
