import React from 'react'
import '../css/basic.css'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    ProfileOutlined,
    SkinOutlined,
    AppstoreOutlined
} from '@ant-design/icons';

import ClientList from './ClientsList'

const { Content, Sider, Footer } = Layout;


export default class Ant_Component extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">
                            <AppstoreOutlined />
                            <span> Inicio </span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <UserOutlined />
                            <span> Clientes </span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <SkinOutlined />
                            <span> Prendas </span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <ProfileOutlined />
                            <span> Alquileres </span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <ProfileOutlined />
                            <span> Cotizaciones </span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">

                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <ClientList />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>


            </Layout>

        )
    }
}