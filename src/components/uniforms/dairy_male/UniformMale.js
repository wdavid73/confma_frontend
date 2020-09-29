import React, { Component } from "react";
import { Card, Col, Row, PageHeader } from "antd";
import OptionsModal from "../OptionsModal";
import CreatePants from "../dairy_male/CreatePants";
import CreateShirt from "../dairy_male/CreateShirt";
import ListUniforms from "../dairy_male/ListUniforms";
import FindCollege from "../dairy_male/FindCollege";

import "../css/dairy-male.css";
import "../../../css/basic.css";

import pants from "../../../assets/pants_normal.png";
import shirt_male from "../../../assets/shirt_uniform.png";
import checklist from "../../../assets/checklist.png";
import find from "../../../assets/search.png";

export default class UniformMale extends Component {
  state = {
    modalShirt: false,
    modalPants: false,
    modalListUniforms: false,
    modalFindCollege: false,
    titleModal: "",
  };

  handleShowModal = (type) => {
    if (type === "shirt") {
      this.setState({
        modalShirt: true,
        modalPants: false,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Shirts",
      });
    }
    if (type === "pants") {
      this.setState({
        modalShirt: false,
        modalPants: true,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Pants",
      });
    }
    if (type === "find_college") {
      this.setState({
        modalShirt: false,
        modalPants: false,
        modalFindCollege: true,
        modalListUniforms: false,
        titleModal: "FindCollege",
      });
    }
    if (type === "list_uniforms") {
      this.setState({
        modalShirt: false,
        modalPants: false,
        modalFindCollege: false,
        modalListUniforms: true,
        titleModal: "ListUniforms",
      });
    }
  };

  handleCancel = () => {
    this.setState({
      modalShirt: false,
      modalPants: false,
      modalFindCollege: false,
      modalListUniforms: false,
      titleModal: "",
    });
  };

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Uniformes de diario Masculinos"
        />
        <div className="container" style={{ marginTop: "6%" }}>
          <div className="row align-items-center">
            <div className="col-md-12">
              <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered
                    style={{ width: 300, height: 220, margin: "0 auto" }}
                    hoverable
                    onClick={() => this.handleShowModal("shirt")}
                    cover={
                      <img src={shirt_male} alt="shirt_male" id="img_shirt" />
                    }
                  >
                    <Card.Meta
                      description={
                        <p className="text-general text-white">
                          Registrar Camisa
                        </p>
                      }
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered
                    style={{ width: 300, height: 220, margin: "0 auto" }}
                    hoverable
                    onClick={() => this.handleShowModal("pants")}
                    cover={<img src={pants} alt="pants_male" id="img_pants" />}
                  >
                    <Card.Meta
                      description={
                        <p className="text-general text-white">
                          Registrar Pantalon
                        </p>
                      }
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered
                    className="card-dairy-male"
                    style={{ width: 300, height: 220, margin: "0 auto" }}
                    hoverable
                    onClick={() => this.handleShowModal("list_uniforms")}
                    cover={
                      <img
                        src={checklist}
                        alt="img_list_uniforms"
                        id="img_list_uniforms"
                      />
                    }
                  >
                    <Card.Meta
                      description={
                        <p className="text-general text-white">
                          Lista de Uniformes Confeccionados
                        </p>
                      }
                    />
                  </Card>
                </Col>

                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered
                    className="card-dairy-male"
                    style={{ width: 300, height: 220, margin: "0 auto" }}
                    hoverable
                    onClick={() => this.handleShowModal("find_college")}
                    cover={
                      <img
                        src={find}
                        alt="img_find_college"
                        id="img_find_college"
                      />
                    }
                  >
                    <Card.Meta
                      description={
                        <p className="text-general text-white">
                          Buscar por Colegio
                        </p>
                      }
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <OptionsModal
          visible={
            this.state.modalShirt ||
            this.state.modalPants ||
            this.state.modalListUniforms ||
            this.state.modalFindCollege
          }
          title={this.state.titleModal}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
        >
          <p>OPTIONS</p>
          {this.state.modalShirt ? <CreateShirt /> : ""}
          {this.state.modalPants ? <CreatePants /> : ""}
          {this.state.modalListUniforms ? <ListUniforms /> : ""}
          {this.state.modalFindCollege ? <FindCollege /> : ""}
        </OptionsModal>
      </div>
    );
  }
}
