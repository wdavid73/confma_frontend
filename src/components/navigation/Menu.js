import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  SkinOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import homepage from "../../assets/homepage.png";
import user from "../../assets/man.png";
import cloth from "../../assets/fashion.png";
import rental from "../../assets/hang-clothes.png";
import quotation from "../../assets/payment.png";
import add_user from "../../assets/add-user.png";
import find_user from "../../assets/find-my-friend.png";
import add_rental from "../../assets/laundry.png";
import list from "../../assets/checklist.png";
import add_quo from "../../assets/boton.png";

import "../../css/basic.css";

const { Content, Sider, Footer, Header } = Layout;
const { SubMenu } = Menu;

export default class MenuCustom extends React.Component {
  constructor(props) {
    super(props);
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
          onCollapse={(collapsed, type) => {
            this.setState({ collapsed });
          }}
          style={{
            overflow: "auto",
            height: "100vh",
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">
                <img src={homepage} width="25" alt="homepage" />
                <span> INICIO </span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <img src={user} width="25" alt="user" />
                  <span>Clientes</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link to="/clients">
                  <img src={add_user} width="25" alt="add_user" />
                  <span> Registro y Listado </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/clients/find">
                  <img src={find_user} width="25" alt="find_user" />
                  <span> Buscar </span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <img src={cloth} width="25" alt="cloth" />
              <Link to="/cloth">
                <span> Prendas </span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <img src={rental} width="25" alt="rental" />
                  <span>Alquileres</span>
                </span>
              }
            >
              <Menu.Item key="6">
                <Link to="/rental">
                  <img src={add_rental} width="25" alt="add_rental" />
                  <span> Registro de Alquileres </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/rental/list">
                  <img src={list} width="25" alt="list_rental" />
                  <span> Listado de Alquileres </span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title={
                <span>
                  <img src={quotation} width="25" alt="quotation" />{" "}
                  <span>Cotizaciones</span>
                </span>
              }
            >
              <Menu.Item key="8">
                <Link to="/quotation">
                  <img src={add_quo} width="25" alt="add_quo" />
                  <span> Registar Cotizaciones </span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                style: { width: "30px", fontSize: "24px" },
                onClick: this.toggle,
                id: "menufold",
              }
            )}
          </Header>
          <Content style={{ margin: "12px 16px 0", overflow: "initial" }}>
            <div style={{ textAlign: "center" }}>{this.props.children}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <div>
              Icons from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
            Ant Design ©2018 Created by Ant UED
            <small className="text-muted"> - Confecciones Maribel</small>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
