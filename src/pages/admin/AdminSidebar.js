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
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';
import config from '~/config';

const { Sider } = Layout;

const items = [
    {
        key: config.routes.admin,
        label: <Link to={config.routes.admin}>Dashboard</Link>,
        icon: <HomeOutlined style={{ color: 'black' }} />,
    },
    {
        key: config.routes.userAdmin,
        label: <Link to={config.routes.userAdmin}>Users</Link>,
        icon: <UserOutlined style={{ color: 'black' }} />,
    },
    {
        key: config.routes.billingAdmin,
        label: <Link to={config.routes.billingAdmin}>Billing</Link>,
        icon: <BilibiliOutlined style={{ color: 'black' }} />,
    },
    {
        key: config.routes.advertisementAdmin,
        label: <Link to={config.routes.advertisementAdmin}>Advertisement</Link>,
        icon: <UserAddOutlined style={{ color: 'black' }} />,
    },
    {
        key: config.routes.insuranceAdmin,
        label: <Link to={config.routes.insuranceAdmin}>Insurance</Link>,
        icon: <InsuranceOutlined style={{ color: 'black' }} />,
    },
    {
        key: config.routes.vehicleAdmin,
        label: <Link to={config.routes.vehicleAdmin}>Vehicle</Link>,
        icon: <CarOutlined style={{ color: 'black' }} />,
    },
    {
        key: config.routes.blogAdmin,
        label: <Link to={config.routes.blogAdmin}>Blog</Link>,
        icon: <img src={blogIcon} alt="Blog Icon" style={{ width: '20px', height: '20px' }} />,
    },
    {
        key: config.routes.insurancepackage,
        label: <Link to={config.routes.insurancepackage}>InsurancePackage</Link>,
        icon: <InsuranceOutlined style={{ color: 'black' }} />,
    },
    // {
    //     key: config.routes.blogAdmin,
    //     label: <Link to={config.routes.blogAdmin}>Blog</Link>,
    //     icon: <img src={blogIcon} alt="Blog Icon" style={{ width: '20px', height: '20px' }} />,
    // },
];

const AdminSidebar = () => {
    const location = useLocation();

    // Xác định key hiện tại dựa trên đường dẫn
    const selectedKey = items.find((item) => location.pathname === item.key)?.key || config.routes.admin;

    return (
        <Sider width={280} style={{ background: '#006494' }}>
            <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e8e8e8' }}>
                <img src={logo} alt="Logo" className="image-logo" />
                <h2 className="title-logo">Vehicle Insurance</h2>
            </div>

            {/* Phần Menu Điều Hướng */}
            <Menu mode="inline" selectedKeys={[selectedKey]} items={items} />
        </Sider>
    );
};

export default AdminSidebar;
