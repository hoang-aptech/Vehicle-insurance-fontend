import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Layout } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '~/config';

const { Content } = Layout;
const { Title } = Typography;

const InsurancePackages = () => {
    const navigate = useNavigate();
    const { insuranceId } = useParams();
    const [insurancePackageData, setInsurancePackageData] = useState([]);

    console.log(insuranceId);

    const getDataApi = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/InsurancePackages/insurance/' + insuranceId);
        console.log(res);

        if (res.status === 200) {
            console.log(res.data);

            setInsurancePackageData(
                res.data.map((i) => ({
                    id: i.id,
                    name: i.name,
                    description: `Price: $${i.price} - Duration: ${i.duration}`,
                })),
            );
        }
    };

    const handleClick = (id) => {
        // navigate(config.routes.contract.replace(':id', id));
    };

    useEffect(() => {
        getDataApi();
    }, []);

    return (
        <Layout style={{ minHeight: '70vh' }}>
            <Content style={{ padding: '50px' }}>
                <Title style={{ color: '#A3D900' }}>Insurance packages</Title>
                <List
                    bordered
                    dataSource={insurancePackageData}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            style={{ backgroundColor: '#e5ffde', border: '1px solid #A3D900' }}
                            actions={[
                                <Button type="primary" onClick={() => handleClick(item.id)}>
                                    Buy
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

export default InsurancePackages;
