import { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router";
import { Button, Layout, Menu, Dropdown, type MenuProps, notification } from "antd";
import {
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { logout } from '../../auth/services/Auth.service';
import { openNotificationWithIcon } from '../../shared/services/Shared.service';

const { Header, Sider, Content, Footer } = Layout;


export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button
                    type="text"
                    icon={<UserOutlined />}
                    onClick={() => logOut()}
                    style={{
                    // fontSize: "16px",
                    // width: 64,
                    // height: 64,
                    }}
                >
                    Cerrar sesión
                </Button>),
        },
    ];

    const deleteCredentials = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }


    const logOut = async () => {
        try {
            await logout();
            deleteCredentials();
            navigate("/auth/login", { replace: true });
        } catch (error) {
            openNotificationWithIcon(
                api,
                'error',
                'Cerrar sesión',
                'No se pudo cerrar sesión, inténtelo nuevamente.'
            )
        }
    };


    return (
        <>
        {contextHolder}
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
                    <div style={{ marginLeft: "auto" }}>
                        <Dropdown menu={{ items }} placement="bottomRight">
                            <Button
                                type="text"
                                icon={<UserOutlined />}
                                style={{
                                    fontSize: "16px",
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Dropdown>
                    </div>
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
        </>

    );
}