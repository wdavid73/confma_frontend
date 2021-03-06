import React, { Component } from "react";
import { Button, message, Empty, Spin } from "antd";

import { FileAddOutlined } from "@ant-design/icons";

import AddQuotationForm from "./AddQuotationForm";
import UpdateQuotationForm from "./UpdateQuotationForm";
import TableQuotation from "./TableQuotation";
import DrawerQuotation from "./DrawerQuotation";
import QuotationClient from "./QuotationClient";
import LinkQuotationClient from "./LinkQuotationClient";
import SelectCloth from "../rental/AddRental/SelectCloth";
import OneCloth from "../cloth/OneCloth";
import {
  getClothWithOutQuotation,
  getQuotations,
  createQuotation,
  createQuotationClient,
  deleteQuotation,
  updateQuotation,
} from "./js/QuotationFunctions.js";
import "../../css/basic.css";
import empty from "../../assets/box.png";

message.config({
  top: 20,
  duration: 2.5,
  maxCount: 3,
  rtl: true,
});

export default class Quotation extends Component {
  state = {
    quotation_id: null,
    cloth_id: null,
    client_id: null,
    quotation_client_id: null,
    quotations: [],
    cloth: [],
    clients: [],
    visibleDrawerSubmit: false,
    visibleDrawerUpdate: false,
    visibleModal: false,
    loading: false,
    disable: false,
    cloth_selected: "",
    clearSelect: false,
  };

  onChange = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };
  componentDidMount() {
    this.getAll();
    this.showSpin();
    this.handleClothSelect();
  }

  formRef = React.createRef();

  showDrawerSubmit = () => {
    this.setState({
      visibleDrawerSubmit: true,
    });
  };

  showDrawerUpdate = () => {
    this.setState({
      visibleDrawerUpdate: true,
    });
  };

  onCloseSubmit = () => {
    this.setState({
      visibleDrawerSubmit: false,
    });
  };

  onCloseUpdate = () => {
    this.setState({
      visibleDrawerUpdate: false,
    });
  };

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 15000);
  };

  getAll = () => {
    getQuotations().then((data) => {
      this.setState({
        quotations: [...data.quotations],
      });
    });
    getClothWithOutQuotation().then((data) => {
      this.setState({
        cloth: [...data.response],
      });
    });
  };

  showModal = () => {
    this.setState({
      visibleModal: true,
    });
  };

  handleOkModal = (client_id, quotation_id) => {
    let errors;
    this.handleCancel();
    this.showSpin();
    message
      .loading({
        content: "Guardando Cliente",
        onClose: createQuotationClient(quotation_id, client_id).then((res) => {
          if (res.response !== undefined && res.response.status >= 400) {
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
            content: "Cliente Guardado Correctamente",
          });
        }
      });
  };

  handleCancel = () => {
    this.setState({ visibleModal: false });
  };

  handleSubmit = (formState) => {
    let errors;
    this.onCloseSubmit();
    this.showSpin();
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createQuotation(formState, this.state.cloth_id).then((res) => {
          if (res.response !== undefined && res.response.status >= 400) {
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
            content: "Registro Completado",
            onClose: this.getAll(),
          });
          this.setState({ clearSelect: true });
          this.clearState();
        }
      });
  };

  clearState = () => {
    this.setState({
      quotation_id: null,
      cloth_id: null,
      cloth_selected: "",
      clearSelect: false,
    });
  };

  handleUpdate = (formState) => {
    let errors;

    this.onCloseUpdate();
    this.showSpin();
    message
      .loading({
        content: "Actualizacion en Proceso",
        onCLose: updateQuotation(formState).then((res) => {
          if (res.response !== undefined && res.response.status >= 400) {
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
            content: "Actualizacion Completada",
            onClose: this.getAll(),
          });
          this.setState({ clearSelect: true });
        }
      });
  };

  handleEditQuotation = (quotation_id) => {
    this.setState({
      quotation_id: quotation_id,
    });
    this.showDrawerUpdate();
  };

  handleDeleteQuotation = (quotation_id) => {
    let errors;

    this.showSpin();
    message
      .loading({
        content: "Eliminado Cotizacion",
        onClose: deleteQuotation(quotation_id).then((res) => {
          if (res.response !== undefined && res.response.status >= 400) {
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
          message.warning({
            content: "Eliminacion Completada",
            onClose: this.DeleteRowTable(quotation_id),
          });
        }
      });
  };

  DeleteRowTable = (id) => {
    let data = [...this.state.quotations];
    data.filter((client, index) => {
      if (client.id === id) {
        data.splice(index, 1);
      }
      this.setState({
        quotations: [...data],
      });
      return true;
    });
  };

  handleAddClientQuotation = (quotation_id) => {
    this.showModal();
    this.setState({
      quotation_client_id: quotation_id,
    });
  };

  handleSelectCloth = (cloth_id) => {
    this.setState({ cloth_id: cloth_id });
  };

  handleClothSelect = () => {
    if (this.props.location.state !== undefined) {
      this.setState({ cloth_selected: this.props.location.state.detail });
      this.showDrawerSubmit();
    }
  };

  render() {
    return (
      <div className="text-general">
        <Spin spinning={this.state.loading} tip="loading">
          <div>
            {/** DISPLAY QUOTATIONS */}
            {this.state.quotations.length > 0 ? (
              <div>
                <Button
                  type="link"
                  id="btn-form-icon-link"
                  onClick={this.showDrawerSubmit}
                  style={{ marginBottom: "20px", color: "#ffc53d" }}
                  disabled={this.state.disable}
                >
                  <FileAddOutlined style={{ fontSize: "24px" }} />
                  Registrar Cotizacion
                </Button>

                <TableQuotation
                  quotations={this.state.quotations}
                  onEdit={this.handleEditQuotation}
                  onDelete={this.handleDeleteQuotation}
                  onAddClient={this.handleAddClientQuotation}
                />
              </div>
            ) : (
              <Empty
                image={empty}
                imageStyle={{
                  height: 60,
                }}
                description={<span>No hay Cotizaciones Registrados</span>}
              >
                <Button
                  type="link"
                  id="btn-form-icon-link"
                  onClick={this.showDrawerSubmit}
                  style={{ marginBottom: "20px" }}
                >
                  <FileAddOutlined style={{ fontSize: "24px" }} />
                  Registrar Cotizacion
                </Button>
              </Empty>
            )}
          </div>
        </Spin>

        <div>
          {/** ADD QUOTATION */}
          <DrawerQuotation
            onClose={this.onCloseSubmit}
            visible={this.state.visibleDrawerSubmit}
            title={"Registrar Cotizacion"}
          >
            <AddQuotationForm onSubmit={this.handleSubmit}>
              <Spin spinning={this.state.loading} tip="Loading">
                {this.state.cloth_selected === "" ? (
                  <SelectCloth
                    cloths={this.state.cloth}
                    onChange={this.handleSelectCloth}
                    clear={this.state.clearSelect}
                  />
                ) : (
                  <OneCloth
                    cloth={this.state.cloth_selected}
                    onChange={this.handleSelectCloth}
                  />
                )}
              </Spin>
            </AddQuotationForm>
          </DrawerQuotation>
        </div>

        {/** UPDATE QUOTATIOn */}
        <DrawerQuotation
          onClose={this.onCloseUpdate}
          visible={this.state.visibleDrawerUpdate}
          title={"Actualizar Cotizacion"}
        >
          <UpdateQuotationForm
            onUpdate={this.handleUpdate}
            quotationId={this.state.quotation_id}
            disable={this.state.disable}
          />
        </DrawerQuotation>
        {/**QUOTATION CLIENT */}
        <QuotationClient
          onOK={this.handleOK}
          visible={this.state.visibleModal}
          title={"Cotizacion - Client"}
          onCancel={this.handleCancel}
        >
          <LinkQuotationClient
            onSubmit={this.handleOkModal}
            quotationId={this.state.quotation_client_id}
          />
        </QuotationClient>
        <div></div>
      </div>
    );
  }
}
