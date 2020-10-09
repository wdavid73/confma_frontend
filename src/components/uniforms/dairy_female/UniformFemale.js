import React, { Component } from "react";
import { Card, Col, Row, PageHeader, message } from "antd";
import OptionsModal from "../OptionsModal";
import CreateShirt from "../CreateShirt";
import CreateDress from "../CreateDress";
import ListUniformsFemale from "../TableListUniformsFemale";
import FindCollege from "../FindCollege";
import CreateUniformFemale from "./CreateUniformFemale";
import { getListUniformsFemale } from "../js/gets";
import { createShirt, createDress, createUniformFemale } from "../js/posts";

import "../../../css/basic.css";
import "../css/index.css";

import checklist from "../../../assets/checklist.png";
import find from "../../../assets/search.png";
import shirt_female from "../../../assets/shirt_uniform.png";
import dress from "../../../assets/uniform_female.png";

export default class UniformFemale extends Component {
  state = {
    modalDress: false,
    modalShirt: false,
    modalListUniforms: false,
    modalFindCollege: false,
    titleModal: "",
    listUnifoms: [],
    shirts: [],
    dresses: [],
  };

  getUniforms = () => {
    getListUniformsFemale().then((data) => {
      this.setState({ listUnifoms: [...data.uniforms_female] });
    });
  };

  handleShowModal = (type) => {
    if (type === "shirt") {
      this.setState({
        modalShirt: true,
        modalDress: false,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Registrar Camisa de Uniforme de Diario Femenino",
      });
    }
    if (type === "dress") {
      this.setState({
        modalShirt: false,
        modalDress: true,
        modalFindCollege: false,
        modalListUniforms: false,
        titleModal: "Registrar Vestido de Uniforme de Diario Masculino",
      });
    }
    if (type === "find_college") {
      this.setState({
        modalShirt: false,
        modalDress: false,
        modalFindCollege: true,
        modalListUniforms: false,
        titleModal: "Buscar por Colegio",
      });
    }
    if (type === "list_uniforms") {
      this.setState({
        modalShirt: false,
        modalDress: false,
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
      modalDress: false,
      modalPants: false,
      modalFindCollege: false,
      modalListUniforms: false,
      titleModal: "",
      listUnifoms: [],
    });
  };

  handleOk = () => {
    console.log("handle ok");
  };

  handleSubmitShirt = (formState) => {
    this.handleCancel();
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createShirt(formState),
      })
      .then(() => {
        message.success({
          content: "Registro Completo",
        });
      });
  };

  handleSubmitDress = (formState) => {
    let errors;
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createDress(formState).then((res) => {
          if (res.response !== undefined && res.response.status >= 400) {
            /* console.log("res");
            console.log(res.response.data);
            console.log(res.response.status); */
            errors = res.response.data;
          }
        }),
      })
      .then(() => {
        if (errors) {
          for (const err in errors) {
            message.error({
              content: err + " : " + errors[err][0],
              className: "msg-error",
              style: {
                float: "right",
              },
              duration: 3,
            });
          }
        } else {
          message.success({
            content: "Registro Completo",
            onClose: this.handleCancel(),
          });
        }
      });
  };

  handleSubmitUniform = (formState) => {
    this.handleCancel();
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createUniformFemale(formState),
      })
      .then(() => {
        message.success({
          content: "Registro Completo",
        });
      });
  };

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Uniformes de diario Femeninos"
        />

        <div className="container mt-4">
          <Row gutter={[16, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card
                bordered
                style={{ width: 300, height: 220, margin: "0 auto" }}
                hoverable
                onClick={() => this.handleShowModal("shirt")}
                cover={
                  <img src={shirt_female} alt="shirt_female" id="img_shirt" />
                }
              >
                <Card.Meta
                  description={
                    <p className="text-general text-white">Registrar Camisas</p>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card
                bordered
                style={{ width: 300, height: 220, margin: "0 auto" }}
                hoverable
                onClick={() => this.handleShowModal("dress")}
                cover={<img src={dress} alt="dress" id="img_dress" />}
              >
                <Card.Meta
                  description={
                    <p className="text-general text-white">Registrar Vestido</p>
                  }
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card
                bordered
                className="card-dairy-female"
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

        <OptionsModal
          visible={
            this.state.modalDress ||
            this.state.modalShirt ||
            this.state.modalFindCollege ||
            this.state.modalListUniforms
          }
          title={this.state.titleModal}
          onOk={this.handleOK}
          onCancel={this.handleCancel}
        >
          {this.state.modalShirt ? (
            <CreateShirt onSubmit={this.handleSubmitShirt} type="Female" />
          ) : (
            ""
          )}
          {this.state.modalDress ? (
            <CreateDress onSubmit={this.handleSubmitDress} />
          ) : (
            ""
          )}
          {this.state.modalListUniforms ? (
            <ListUniformsFemale
              title="Registrar Unifrome Femenino"
              uniforms={this.state.listUnifoms}
              /* male={false} */
            >
              <CreateUniformFemale onSubmit={this.handleSubmitUniform} />
            </ListUniformsFemale>
          ) : (
            ""
          )}
          {this.state.modalFindCollege ? <FindCollege gender="female" /> : ""}
        </OptionsModal>
      </div>
    );
  }
}
