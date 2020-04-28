import React from 'react'
import { Link } from 'react-router-dom';

import '../../css/basic.css'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    ProfileOutlined,
    SkinOutlined,
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {
    crud_client,
    find_client,
    crud_cloth,
    crud_rental,
    list_rental
} from './messages'

const { Content, Sider, Footer, Header } = Layout;
const { SubMenu } = Menu;




export default class MenuCustom extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        this.setState({ collapsed });
                    }}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        left: 0,
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">
                            <Link to='/' >
                                <AppstoreOutlined />
                                <span> Inicio </span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><UserOutlined /><span>Clientes</span></span>}>
                            <Menu.Item key="3">
                                <Link to='/clients' onClick={crud_client}>
                                    <span> Registro y Listado </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to='/clients/find' onClick={find_client}>
                                    <span> Buscar </span>
                                </Link>
                            </Menu.Item>

                        </SubMenu>
                        <Menu.Item key="5">
                            <SkinOutlined />
                            <Link to='/cloth' onClick={crud_cloth}>
                                <span > Prendas  </span>
                            </Link>

                        </Menu.Item>

                        <SubMenu key='sub2' title={<span><ProfileOutlined /><span>Alquileres</span></span>}>
                            <Menu.Item key="6">
                                <Link to='/rental' onClick={crud_rental}>
                                    <span>  Registro de Alquileres </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to='/rental/list' onClick={list_rental}>
                                    <span>  Listado de Alquileres </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>


                        <SubMenu key='sub3' 
                                title={<span>
                                    <ProfileOutlined /> <span>Cotizaciones</span>
                                </span>}>
                            <Menu.Item key="8">
                                <Link to='/quotation'>
                                    <span> Registar Cotizaciones </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to='/quotation/list'>
                                    <span> Lista de Cotizaciones </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            style: { width: '30px', fontSize: '24px' },
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED<small className="text-muted"> - Confecciones Maribel</small>
                    </Footer>
                </Layout>
            </Layout>
        )
    }

}