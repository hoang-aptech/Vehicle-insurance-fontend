// layouts/AdminLayout.js
import React from 'react';
import { Layout } from 'antd';
import AdminSidebar from '../../pages/admin/AdminSidebar'; // Điều chỉnh đường dẫn nếu cần
import { DashboardOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            <Layout style={{ marginLeft: '280px' }}>
                <Header
                    style={{
                        background: '#001529',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h1 style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                        <DashboardOutlined style={{ marginRight: '8px' }} />
                        Admin Dashboard
                    </h1>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2024 Created by Quang Huy</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
