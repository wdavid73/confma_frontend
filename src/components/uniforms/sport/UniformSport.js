import React, { Component } from "react";
import { Card, Col, Row, PageHeader, message } from "antd";
import OptionsModal from "../OptionsModal";
import CreateShirt from "../CreateShirt";
import CreatePants from "../CreatePants";
import ListUniforms from "../TableListUniforms";
import FindCollege from "../FindCollege";
import CreateUniformSport from "./CreateUniformSport";
import Options from "../../common/Options";

import {
  getListUniformsSportMale,
  getListUniformsSportFemale,
} from "../js/gets.js";
import { createShirt, createPants } from "../js/posts";
import { equals } from "../../common/Validations";

import "../css/index.css";
import "../../../css/basic.css";

import pants from "../../../assets/trousers.png";
import shirt_male from "../../../assets/shirt_male.png";
import checklist from "../../../assets/checklist.png";
import find from "../../../assets/search.png";

export default class UniformSport extends Component {
  state = {
    modalShirt: false,
    modalPants: false,
    modalListUniformsMale: false,
    modalListUniformsFemale: false,
    modalFindCollege: false,
    visibleModalType: false,
    titleModal: "",
    listUnifoms: [],
    shirts: [],
    pants: [],
  };

  getUniformsMale = () => {
    getListUniformsSportMale().then((data) => {
      this.setState({ listUnifoms: [...data.uniforms_sports_male] });
    });
  };

  getUniformsFemale = () => {
    getListUniformsSportFemale().then((data) => {
      this.setState({ listUnifoms: [...data.uniforms_sports_female] });
    });
  };

  handleShowModal = (type) => {
    if (type === "shirt") {
      this.setState({
        modalShirt: true,
        modalPants: false,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Registrar Camisa de Uniforme de Deportes",
      });
    }
    if (type === "pants") {
      this.setState({
        modalShirt: false,
        modalPants: true,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Registrar Pantalones de Uniforme de Deportes",
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
    if (type === "select_type") {
      this.setState({
        modalShirt: false,
        modalPants: false,
        modalFindCollege: false,
        visibleModalType: true,
        /* modalListUniforms: true, */
        /* titleModal: "Lista de Uniformes Confeccionados", */
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

  selectOption = (option) => {
    if (equals(option, "SportMale")) {
      console.log(option);
      this.getUniformsMale();
    }
    if (equals(option, "SportFemale")) {
      console.log(option);
      this.getUniformsFemale();
    }
  };

  handleSubmitUniform = (formState) => {
    console.log(formState);
  };

  render() {
    const options = [
      { option: "SportMale", title: "Masculino" },
      { option: "SportFemale", title: "Femenino" },
    ];
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Uniformes Deportivos"
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
                    cover={<img src={shirt_male} alt="shirt" id="img_shirt" />}
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
                    cover={<img src={pants} alt="pants" id="img_pants" />}
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
                    onClick={() => this.handleShowModal("select_type")}
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

        <div>
          <OptionsModal
            visible={this.state.visibleModalType}
            title={"Para que genero desea registar el uniforme"}
            onCancel={this.handleCancel}
          >
            <Options options={options} selectOption={this.selectOption} />
          </OptionsModal>
        </div>

        <OptionsModal
          visible={
            this.state.modalShirt ||
            this.state.modalPants ||
            /* this.state.modalListUniforms || */
            this.state.modalFindCollege
          }
          title={this.state.titleModal}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
        >
          {this.state.modalShirt ? (
            <CreateShirt
              onSubmit={this.handleSubmitShirt}
              /* type="Male" */ selectType={true}
            />
          ) : (
            ""
          )}
          {this.state.modalPants ? (
            <CreatePants
              onSubmit={this.handleSubmitPants}
              /* type="Male" */ selectType={true}
            />
          ) : (
            ""
          )}
          {/* {this.state.modalListUniforms ? (
              <ListUniforms
                title="Registrar Uniforme Masculino"
                uniforms={this.state.listUnifoms}
                /* male={true}
                /*onSubmit={this.handleSubmitUniform              >
                <CreateUniformSport
                  onSubmit={this.handleSubmitUniform}
                  pants={this.state.pants}
                  shirts={this.state.shirts}
                />
              </ListUniforms>
            ) : (
              ""
            )} */}
          {this.state.modalFindCollege ? (
            <FindCollege /* gender="male" */ />
          ) : (
            ""
          )}
        </OptionsModal>
      </div>
    );
  }
}
