import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '~/config';

const { Content } = Layout;
const { Title } = Typography;

const ContractList = () => {
    const navigate = useNavigate();
    // const [contractList, setContractList] = useState([]);

    const [contractData, setContractData] = useState([]);
    const getDataApi = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/CustomerInsurances/by-user/1');
        console.log(res);

        if (res.status === 200) {
            console.log(res.data);

            setContractData(
                res.data.map((i) => ({
                    id: i.insurance.id,
                    name: i.insurance.name,
                    description: `Start date: ${i.startDate.slice(0, 10)} ---> expire date: ${i.expireDate.slice(
                        0,
                        10,
                    )}`,
                })),
            );
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
                                <Button type="primary" onClick={() => handleClick(item.id)}>
                                    View
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta title={<Link to="/">{item.name}</Link>} description={item.description} />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default ContractList;
