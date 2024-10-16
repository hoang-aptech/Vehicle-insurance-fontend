// AdminSidebar.js
import React, { useContext } from 'react';
import { Button, Layout, Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    BilibiliOutlined,
    InsuranceOutlined,
    CarOutlined,
    UserAddOutlined,
    LogoutOutlined,
    SendOutlined,
} from '@ant-design/icons';
import logo from './assetadmin/logo.png';
import blogIcon from './assetadmin/ảnhblog.png'; // Import hình ảnh cho Blog
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';
import { Context } from '~/Context';
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
    {
        key: config.routes.insurancepackage,
        label: <Button onClick={{}}>InsurancePackage</Button>,
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
    const navigate = useNavigate();
    const { admin, handleLogoutAdmin } = useContext(Context);

    const handleLogout = (e) => {
        e.preventDefault();
        const loggedOut = handleLogoutAdmin();
        if (loggedOut) {
            navigate(config.routes.loginAdmin);
        }
    };

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
            key: config.routes.insurancePackage,
            label: <Link to={config.routes.insurancePackage}>InsurancePackage</Link>,
            icon: <InsuranceOutlined style={{ color: 'black' }} />,
        },
        {
            key: config.routes.sendEmailReminderAdmin,
            label: <Link to={config.routes.sendEmailReminderAdmin}>Send email reminder</Link>,
            icon: <SendOutlined style={{ color: 'black' }} />,
        },
        {
            key: '/logout',
            label: (
                <Link to="/" onClick={handleLogout}>
                    Logout
                </Link>
            ),
            icon: <LogoutOutlined style={{ color: 'black' }} />,
        },
    ];

    let filteredItems = items;

    console.log(admin.role);

    if (admin.role === 'Employee') {
        filteredItems = items.filter((item, index) => ![0, 1, 4, 7].includes(index));
        console.log(filteredItems);
    }

    // Xác định key hiện tại dựa trên đường dẫn
    const selectedKey = filteredItems.find((item) => location.pathname === item.key)?.key || config.routes.admin;

    return (
        <Sider width={280} style={{ background: '#006494' }}>
            <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e8e8e8' }}>
                <img src={logo} alt="Logo" className="image-logo" />
                <h2 className="title-logo">Vehicle Insurance</h2>
            </div>

            {/* Phần Menu Điều Hướng */}
            <Menu mode="inline" selectedKeys={[selectedKey]} items={filteredItems} />
        </Sider>
    );
};

export default AdminSidebar;
