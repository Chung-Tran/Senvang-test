import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, DashboardOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: 6,
                        textAlign: 'center',
                        color: 'white',
                        lineHeight: '32px',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                >
                    {collapsed ? <AppstoreOutlined style={{ fontSize: 20 }} /> : 'User Manager'}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                >
                    <Menu.Item key="/" icon={<DashboardOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="/users" icon={<UserOutlined />}>
                        <Link to="/users">Users</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ background: '#fff', padding: '0 16px' }}>
                    <h2>Admin Panel</h2>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 16, background: '#fff', minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
