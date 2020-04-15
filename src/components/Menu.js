import React from 'react'
import { Link } from 'react-router-dom';

import '../css/basic.css'
import { Layout, Menu, message } from 'antd';
import {
    UserOutlined,
    ProfileOutlined,
    SkinOutlined,
    AppstoreOutlined
} from '@ant-design/icons';

const { Content, Sider, Footer } = Layout;

const info_client = () => {
    message.info('Bienvenido al Registro y Listado de Clientes', 5);
};

const MenuCustom = (props) => {

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={false}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                        <Link to='/' >
                            <AppstoreOutlined />
                            <span> Inicio </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/clients' onClick={info_client}>
                            <UserOutlined />
                            <span> Clientes </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <SkinOutlined />
                        <span > Prendas  </span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <ProfileOutlined />
                        <span>  Alquileres </span>
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
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout >
    )
}

export default MenuCustom

/*export default class Ant_Component extends React.Component {

    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const info = () => {
            message.info('Bienvenido al Registro y Listado de Clientes', 5);
        };
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">

                            <Link to='/' ><AppstoreOutlined /></Link>
                        </Menu.Item>
                        <Menu.Item key="2">

                            <Link to='/clients' onClick={info}><UserOutlined /></Link>
                        </Menu.Item>
                        <Menu.Item key="3">

                            <span> <SkinOutlined /> </span>
                        </Menu.Item>
                        <Menu.Item key="4">

                            <span> <ProfileOutlined /> </span>
                        </Menu.Item>
                        <Menu.Item key="5">

                            <span> <ProfileOutlined /> </span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>


            </Layout>

        )
    }
}*/