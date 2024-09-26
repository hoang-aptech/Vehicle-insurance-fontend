// AdminSidebar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    BilibiliOutlined,
    InsuranceOutlined,
    CarOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import logo from './assetadmin/logo.png';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const { Sider } = Layout;

const items = [
    {
        key: '1',
        label: <Link to="/admin">Dashboard</Link>,
        icon: <HomeOutlined />,
    },
    {
        key: '2',
        label: <Link to="/admin/user-admin">Users</Link>,
        icon: <UserOutlined />,
    },
    {
        key: '3',
        label: 'Billing',
        icon: <BilibiliOutlined />,
    },
    {
        key: '4',
        label: 'Advertisement',
        icon: <UserAddOutlined />,
    },
    {
        key: '5',
        label: 'Insurance',
        icon: <InsuranceOutlined />,
    },
    {
        key: '6',
        label: 'Vehicle',
        icon: <CarOutlined />,
    },
];

const AdminSidebar = () => {
    return (
        <Sider width={280} style={{ background: '#006494' }}>
            <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e8e8e8' }}>
                <img src={logo} alt="Logo" className="image-logo" />
                <h2 className="title-logo">Vehicle Insurance</h2>
            </div>

            {/* Phần Menu Điều Hướng */}
            <Menu mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Sider>
    );
};

export default AdminSidebar;
