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
import blogIcon from './assetadmin/ảnhblog.png'; // Import hình ảnh cho Blog
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const { Sider } = Layout;

const items = [
    {
        key: '1',
        label: <Link to="/admin">Dashboard</Link>,
        icon: <HomeOutlined style={{ color: 'black' }} />,
    },
    {
        key: '2',
        label: <Link to="/admin/user-admin">Users</Link>,
        icon: <UserOutlined style={{ color: 'black' }} />,
    },
    {
        key: '3',
        label: <Link to="/admin/billing-admin">Billing</Link>,
        icon: <BilibiliOutlined style={{ color: 'black' }} />,
    },
    {
        key: '4',
        label: <Link to="/admin/adver-admin">Advertisement</Link>,
        icon: <UserAddOutlined style={{ color: 'black' }} />,
    },
    {
        key: '5',
        label: <Link to="/admin/insurance-admin">Insurance</Link>,
        icon: <InsuranceOutlined style={{ color: 'black' }} />,
    },
    {
        key: '6',
        label: <Link to="/admin/vehicle-admin">Vehicle</Link>,
        icon: <CarOutlined style={{ color: 'black' }} />,
    },
    {
        key: '7',
        label: <Link to="/admin/blog-admin">Blog</Link>,
        icon: <img src={blogIcon} alt="Blog Icon" style={{ width: '20px', height: '20px' }} />,
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
