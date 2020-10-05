import React, { Component } from "react";
import { Card, Col, Row, PageHeader, message } from "antd";
import OptionsModal from "../OptionsModal";
import CreatePants from "../CreatePants";
import CreateShirt from "../CreateShirt";
import ListUniforms from "../TableListUniforms";
import FindCollege from "../FindCollege";
import CreateUniformMale from "./CreateUniformMale";

import { getListUniforms } from "../js/gets";
import { createShirt, createPants, createUniformMale } from "../js/posts";

import "../css/index.css";
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
    listUnifoms: [],
    shirts: [],
    pants: [],
  };

  componentDidMount() {
    //this.getUniforms();
  }

  getUniforms = () => {
    getListUniforms().then((data) => {
      this.setState({ listUnifoms: [...data.uniforms_male] });
    });
  };

  handleShowModal = (type) => {
    if (type === "shirt") {
      this.setState({
        modalShirt: true,
        modalPants: false,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Registrar Camisa de Uniforme de Diario Masculino",
      });
    }
    if (type === "pants") {
      this.setState({
        modalShirt: false,
        modalPants: true,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Registrar Pantalones de Uniforme de Diario Masculino",
      });
    }
    if (type === "find_college") {
      this.setState({
        modalShirt: false,
        modalPants: false,
        modalFindCollege: true,
        modalListUniforms: false,
        titleModal: "Buscar por Colegio",
      });
    }
    if (type === "list_uniforms") {
      this.setState({
        modalShirt: false,
        modalPants: false,
        modalFindCollege: false,
        modalListUniforms: true,
        titleModal: "Lista de Uniformes Confeccionados",
      });
      this.getUniforms();
    }
  };

  handleCancel = () => {
    this.setState({
      modalShirt: false,
      modalPants: false,
      modalFindCollege: false,
      modalListUniforms: false,
      titleModal: "",
      listUnifoms: [],
    });
  };

  handleSubmitShirt = (formState) => {
    this.handleCancel();
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createShirt(formState),
      })
      .then(() =>
        message.success({
          content: "Registro Completado",
        })
      );
  };

  handleSubmitPants = (formState) => {
    this.handleCancel();
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createPants(formState),
      })
      .then(() =>
        message.success({
          content: "Registro Completado",
        })
      );
  };

  handleSubmitUniform = (formState) => {
    this.handleCancel();
    console.log("uniform register ", formState);
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createUniformMale(formState),
      })
      .then(() => {
        message.success({
          content: "Registro Completado",
        });
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
          {this.state.modalShirt ? (
            <CreateShirt onSubmit={this.handleSubmitShirt} gender="Male" />
          ) : (
            ""
          )}
          {this.state.modalPants ? (
            <CreatePants onSubmit={this.handleSubmitPants} gender="Male" />
          ) : (
            ""
          )}
          {this.state.modalListUniforms ? (
            <ListUniforms
              title="Registrar Uniforme Masculino"
              uniforms={this.state.listUnifoms}
              /* male={true} */
              /*onSubmit={this.handleSubmitUniform}*/
            >
              <CreateUniformMale
                onSubmit={this.handleSubmitUniform}
                /* pants={this.state.pants}
                shirts={this.state.shirts} */
              />
            </ListUniforms>
          ) : (
            ""
          )}
          {this.state.modalFindCollege ? <FindCollege gender="male" /> : ""}
        </OptionsModal>
      </div>
    );
  }
}
