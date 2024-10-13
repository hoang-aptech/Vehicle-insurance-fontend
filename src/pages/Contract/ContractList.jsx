import React, { useContext, useEffect, useState } from 'react';
import { List, Typography, Button, Layout, notification, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Context } from '~/Context';
import ButtonCustom from '~/components/Button';
import config from '~/config';

const { Content } = Layout;
const { Title } = Typography;

const ContractList = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [insuranceRenewals, setInsuranceRenewals] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const handleShowDetails = async (id) => {
        try {
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/Billings/transactions/${id}`, {
                headers: { Authorization: 'Bearer ' + userToken },
            });
            console.log(res);
            setInsuranceRenewals(res.data);
            setIsModalOpen(true);
        } catch (err) {
            if (err.status === 401) {
                openNotificationWithIcon('error', 'Unauthorized!', 'You do not have permission to access this page');
                setTimeout(() => {
                    if (handleLogoutUser()) {
                        navigate(config.routes.login);
                    }
                }, 1000);
            } else {
                console.error(err);
            }
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { user, userToken, handleLogoutUser } = useContext(Context);
    const [contractData, setContractData] = useState([]);
    const getDataApi = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/Billings/by-user/${user.id}`, {
                headers: { Authorization: 'Bearer ' + userToken },
            });
            if (res.status === 200) {
                setContractData(
                    res.data.map((i) => ({
                        id: i.id,
                        insuranceId: i.insurancePackage.insuranceId,
                        name: `${i.insurancePackage.name} - ${i.insurancePackage.insurance.name}`,
                        description: `Start date: ${i.createdAt.slice(0, 10)} ---> expire date: ${i.expireDate.slice(
                            0,
                            10,
                        )}`,
                    })),
                );
            }
        } catch (err) {
            if (err.status === 401) {
                openNotificationWithIcon('error', 'Unauthorized!', 'You do not have permission to access this page');
                setTimeout(() => {
                    if (handleLogoutUser()) {
                        navigate(config.routes.login);
                    }
                }, 1000);
            } else {
                console.error(err);
            }
        }
    };

    const handleClick = (id) => {
        navigate(config.routes.contract.replace(':id', id));
    };

    useEffect(() => {
        getDataApi();
    }, []);

    return (
        <Layout style={{ minHeight: '70vh' }}>
            {contextHolder}
            <Content style={{ padding: '50px' }}>
                <Title style={{ color: '#A3D900' }}>Contract List</Title>
                <List
                    bordered
                    dataSource={contractData}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            style={{ backgroundColor: '#e5ffde', border: '1px solid #A3D900' }}
                            actions={[
                                <Button
                                    type="dashed"
                                    style={{ backgroundColor: 'green', color: '#fff' }}
                                    onClick={() => {}}
                                >
                                    Extend
                                </Button>,
                                <Button danger onClick={() => handleShowDetails(item.id)}>
                                    Details
                                </Button>,
                                <Button type="primary" onClick={() => handleClick(item.insuranceId)}>
                                    View
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<Link to={config.routes.contract.replace(':id', item.id)}>{item.name}</Link>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                    locale={{
                        emptyText: (
                            <h4>
                                You do not have any contract yet.{' '}
                                <ButtonCustom title="Buy now" to={config.routes.home} />
                            </h4>
                        ),
                    }}
                />
                <Modal title="Extend content" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <List
                        bordered
                        dataSource={insuranceRenewals}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                style={{ backgroundColor: '#e5ffde', border: '1px solid #A3D900' }}
                            >
                                <List.Item.Meta
                                    title={`Renewal date: ${item.createdAt.slice(0, 10)}`}
                                    description={`Price: $${item.price} ${
                                        item.oldExpiredDate
                                            ? ` - Old expired date: ${item.oldExpiredDate.slice(0, 10)}`
                                            : ''
                                    }`}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>
            </Content>
        </Layout>
    );
};

export default ContractList;
