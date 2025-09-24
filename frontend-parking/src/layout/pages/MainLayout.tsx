import { useState } from 'react';
import { Outlet, Link } from "react-router";
import { Button, Layout, Menu } from "antd";
import {
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";


const { Header, Sider, Content, Footer } = Layout;


export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        { key: "1", icon: <UserOutlined />, label: <Link to="/layout/modulo1">Módulo 1</Link> },
                        { key: "2", icon: <VideoCameraOutlined />, label: "nav 2" },
                        { key: "3", icon: <UploadOutlined />, label: "nav 3" },
                    ]}
                />
            </Sider>

            <Layout>
                {/* Header con botón toggle */}
                <Header
                    style={{
                        padding: 0,
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <h2 style={{ marginLeft: "16px" }}>Mi Sistema</h2>
                </Header>

                {/* Contenido dinámico */}
                <Content
                    style={{
                        margin: "16px",
                        padding: 24,
                        background: "#fff",
                        borderRadius: 8,
                    }}
                >
                    <Outlet />
                </Content>

                <Footer style={{ textAlign: "center" }}>© 2025 - Mi Sistema</Footer>
            </Layout>
        </Layout>
    );
}