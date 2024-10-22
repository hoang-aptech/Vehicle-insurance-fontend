import React, { useState, useEffect, useContext } from 'react';
import { Layout, Table, Button, Form, Input, Modal, Row, Col, Card, Select, List } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Context } from '~/Context';
import config from '~/config';

const { Header, Content } = Layout;

const Billing = () => {
    const navigate = useNavigate();
    const { handleLogoutAdmin, adminToken } = useContext(Context);
    const [dataSource, setDataSource] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBilling, setCurrentBilling] = useState(null);
    const [currentTransactions, setCurrentTransactions] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [filterPrice, setFilterPrice] = useState('');
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [insurancePackage, setInsurancePackage] = useState([]);

    const API_URL = process.env.REACT_APP_BACKEND_URL + '/Billings';

    const handleError = (err) => {
        if (err.status === 401) {
            alert('Unauthorized. Please log in again.');
            const Logouted = handleLogoutAdmin();
            if (Logouted) {
                navigate(config.routes.loginAdmin); // Refresh the page to log out
            }
        } else if (err.status === 400) {
            alert(err.response.data.message);
        }
    };

    const addMonthsToDate = (dateString, months) => {
        const date = new Date(dateString);

        // Add the months
        date.setMonth(date.getMonth() + months);

        // Format the result back to 'YYYY-MM-DD'
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const fetchBillingData = async () => {
        try {
            const response = await axios.get(API_URL, { headers: { Authorization: 'Bearer ' + adminToken } });
            setDataSource(response.data);
            setFilterData(response.data);
        } catch (error) {
            console.error('Unable to fetch billing data:', error);
            handleError(error);
        }
    };

    const fetchDataToAdd = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/vehicles', {
                headers: { Authorization: 'Bearer ' + adminToken },
            });
            setVehicles(response.data);
            const response2 = await axios.get(process.env.REACT_APP_BACKEND_URL + '/insurancePackages', {
                headers: { Authorization: 'Bearer ' + adminToken },
            });
            setInsurancePackage(response2.data);
        } catch (error) {
            console.error(error);
            handleError(error);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month (0-based index)
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchBillingData();
        fetchDataToAdd();
    }, []);

    const showModal = (billing = null) => {
        setIsModalVisible(true);
        setCurrentBilling(billing);
        if (billing) {
            setIsEditMode(true);
            form.setFieldsValue(billing);
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    };

    const handleOk = async () => {
        const now = new Date();
        const utcOffset = 7 * 60; // +7 hours in minutes
        const localTime = new Date(now.getTime() + utcOffset * 60 * 1000);
        try {
            const values = await form.validateFields();

            if (values) {
                const insurancePackageItem = insurancePackage.find((i) => i.id === values.insurancePackageId);
                localTime.setMonth(localTime.getMonth() + insurancePackageItem.duration);
                const timeFormattedDate = formatDate(localTime);
                const billing = {
                    ...values,
                    expireDate: timeFormattedDate,
                };
                const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/billings', billing, {
                    headers: { Authorization: 'Bearer ' + adminToken },
                });
                if (res.status === 201) {
                    const transaction = {
                        billingId: res.data.id,
                        price: insurancePackageItem.price,
                    };
                    const res2 = await axios.post(process.env.REACT_APP_BACKEND_URL + '/transactions', transaction, {
                        headers: { Authorization: 'Bearer' + adminToken },
                    });
                    if (res2.status === 201) {
                        alert('Bill and transaction added successfully!');
                        fetchBillingData();
                    }
                }

                setIsModalVisible(false);
                form.resetFields();
            }

            // if (isEditMode && currentBilling) {
            //     const updatedBilling = {
            //         id: currentBilling.id,
            //         ...values,
            //     };
            //     await axios.put(`${API_URL}/${currentBilling.id}`, updatedBilling);
            //     fetchBillingData();
            // } else {
            // const response = await axios.post(API_URL, values);
            // setDataSource((prevData) => [...prevData, response.data]);
            // }
        } catch (error) {
            console.error('Unable to update billing information:', error.response?.data || error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFilter = (e) => {
        if (e.key === 'Enter') {
            if (filterPrice === '') {
                setFilterData(dataSource);
                return;
            }
            setFilterData(dataSource.filter((i) => parseFloat(i.insurancePackage.price) >= parseFloat(filterPrice)));
        }
    };

    // const filteredData = (dataSource || []).filter((item) => {
    //     return item && item.price !== undefined && item.price.toString().includes(filterPrice);
    // });

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`${API_URL}/${id}`);
    //         setDataSource(dataSource.filter((billing) => billing.id !== id));
    //     } catch (error) {
    //         console.error('Unable to delete billing:', error);
    //     }
    // };

    const handleDetail = async (billing) => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/transactions/by-billingId/${billing.id}`, {
            headers: { Authorization: 'Bearer ' + adminToken },
        });
        if (res.status === 200) {
            setCurrentTransactions(res.data);
            setCurrentBilling(billing);
            setIsDetailModalVisible(true);
        }
    };

    const handleAddTransaction = async () => {
        const transaction = {
            billingId: currentBilling.id,
            price: currentBilling.insurancePackage.price,
            oldExpiredDate: currentBilling.expireDate,
        };

        try {
            const res = await axios.patch(
                process.env.REACT_APP_BACKEND_URL + `/billings/${currentBilling.id}`,
                { expireDate: addMonthsToDate(currentBilling.expireDate, currentBilling.insurancePackage.duration) },
                {
                    headers: { Authorization: 'Bearer ' + adminToken },
                },
            );
            if (res.status === 200) {
                const res2 = await axios.post(process.env.REACT_APP_BACKEND_URL + '/transactions', transaction, {
                    headers: { Authorization: 'Bearer ' + adminToken },
                });
                if (res2.status === 201) {
                    alert('Transaction added successfully');
                    setIsDetailModalVisible(false);
                }
            }
        } catch (e) {
            console.error(e);
            handleError(e);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Expire date',
            dataIndex: 'expireDate',
            key: 'expireDate',
            render: (text) => text.slice(0, 10),
        },
        {
            title: 'Package',
            dataIndex: 'insurancePackage',
            key: 'insurancePackage',
            render: (text) => `Name: ${text.name} - price $${text.price}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, backgroundColor: '#32CD32', borderColor: '#32CD32' }}
                        onClick={() => showModal(record)}
                    /> */}
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
                    {/* <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        style={{ marginLeft: 8, backgroundColor: '#f60308', borderColor: '#f60308' }}
                        onClick={() => handleDelete(record.id)}
                    /> */}
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
                    Add Billing
                </Button>
                <h1 style={{ margin: 0 }}>Billing Management</h1>
                <div></div>
            </Header>
            <Content style={{ margin: '16px' }}>
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={8}>
                        <Input
                            value={filterPrice}
                            placeholder="Filter by Price"
                            onKeyUp={handleFilter}
                            onChange={(e) => setFilterPrice(e.target.value)}
                        />
                    </Col>
                </Row>
                <Table columns={columns} dataSource={filterData} rowKey="id" pagination={{ pageSize: 5 }} />

                <Modal
                    title={isEditMode ? 'Edit Billing Record' : 'Add New Billing Record'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="vehicleId"
                            label="Vehicle"
                            rules={[{ required: true, message: 'Please input the vehicle!' }]}
                        >
                            <Select>
                                {vehicles.map((vehicle) => (
                                    <Select.Option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.name} - {vehicle.user.fullname}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="insurancePackageId"
                            label="Package"
                            rules={[{ required: true, message: 'Please input Package!' }]}
                        >
                            <Select>
                                {insurancePackage.map((i) => (
                                    <Select.Option key={i.id} value={i.id}>
                                        {i.name} - ${i.price}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Billing Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                >
                    {currentBilling && (
                        <Card>
                            <p>
                                <strong>ID:</strong> {currentBilling.id}
                            </p>
                            <p>
                                <strong>Expire date:</strong> {currentBilling.expireDate.slice(0, 10)}
                            </p>
                            <p>
                                <strong>Vehicle:</strong> {currentBilling.vehicle.name}
                            </p>
                            <p>
                                <strong>Insurance Package: </strong>
                                <br />
                                <strong>Name: </strong> {currentBilling.insurancePackage.name} -{' '}
                                <strong>Price: </strong> ${currentBilling.insurancePackage.price}
                            </p>
                            <h4>Transactions</h4>
                            <List
                                bordered
                                dataSource={currentTransactions}
                                renderItem={(item) => (
                                    <List.Item
                                        key={item.id}
                                        style={{ backgroundColor: '#e5ffde', border: '1px solid #A3D900' }}
                                    >
                                        <List.Item.Meta
                                            title={`Transaction date: ${item.createdAt.slice(0, 10)}`}
                                            description={`Price: $${item.price}`}
                                        />
                                    </List.Item>
                                )}
                            />
                            <Button style={{ marginTop: '6px' }} type="primary" onClick={handleAddTransaction}>
                                Add transactions
                            </Button>
                        </Card>
                    )}
                </Modal>
                {/* <Modal
                    title="Add transaction"
                    open={isModalAddTransaction}
                    onOk={handleAddTransaction}
                    onCancel={handleCancelAddTransaction}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="vehicleId"
                            label="Vehicle"
                            rules={[{ required: true, message: 'Please input the vehicle!' }]}
                        >
                            <Select>
                                {vehicles.map((vehicle) => (
                                    <Select.Option value={vehicle.id}>
                                        {vehicle.name} - {vehicle.user.fullname}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="insurancePackageId"
                            label="Package"
                            rules={[{ required: true, message: 'Please input Package!' }]}
                        >
                            <Select>
                                {insurancePackage.map((i) => (
                                    <Select.Option value={i.id}>
                                        {i.name} - ${i.price}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal> */}
            </Content>
        </Layout>
    );
};

export default Billing;
