import React from "react";
import { message, Card, Row, Col, Modal, Button, Spin } from "antd";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "./js/ClientFuncions";
import AddClientForm from "./AddClientFrom";
import TableListClient from "./TableListClient";
import UpdateClientForm from "./UpdateClientForm";
import "../../css/basic.css";

message.config({
  top: 20,
  duration: 2.5,
  maxCount: 3,
  rtl: true,
});

export default class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: "",
      activeModal: false,
      disable: false,
      loading: false,
      clients: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
    this.showSpin();
  }

  getAll = () => {
    getClients().then((data) => {
      this.setState({ clients: [...data.clients] });
    });
  };

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 5000);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCancel = () => {
    this.setState({
      activeModal: false,
    });
  };

  handleSubmit = (formState) => {
    this.showSpin();
    message
      .loading({
        content: "Registro en Proceso...",
        onClose: createClient(formState) /* Cuando termine ejercutara esto*/,
      })
      .then(() =>
        message.success({
          content: "Registro Completado",
          onClose: this.getAll() /* Cuando termine ejercutara esto*/,
        })
      );
  };

  handleSelectClient = (client_id) => {
    this.setState({
      client_id: client_id,
      activeModal: true,
    });
  };

  handleUpdate = (formState) => {
    this.handleCancel();
    this.showSpin();
    message
      .loading({
        content: "Actualizacion en Proceso...",
        onClose: updateClient(formState),
      })
      .then(() =>
        message.success({
          content: "Actualizacion Completada",
          onClose: this.getAll(),
        })
      );
  };

  handleDelete = (client_d_id) => {
    this.showSpin();
    message
      .loading({
        content: "Eliminando Cliente",
        onClose: deleteClient(client_d_id),
      })
      .then(() => {
        message.warning({
          content: " Eliminacion Completada",
          onClose: this.DeleteRowTable(client_d_id),
        });
      });
  };

  DeleteRowTable = (id) => {
    let data = [...this.state.clients];
    data.filter((client, index) => {
      if (client.id === id) {
        data.splice(index, 1);
      }
      this.setState({
        clients: [...data],
      });
      return true;
    });
  };

  render() {
    return (
      <Row
        gutter={[8, 8]}
        className="d-flex justify-content-center text-general"
      >
        {/**COMPONENTE PARA AGREGAR CLIENTES */}
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card
            title="Registro de Clientes"
            id="card_client"
            style={{ height: "72%" }}
          >
            <AddClientForm
              onSubmit={this.handleSubmit}
              disable={this.state.disable}
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          {/**COMPONENTE PARA LISTAR CLIENTES */}
          <Spin spinning={this.state.loading} tip="Loading...">
            <TableListClient
              clients={this.state.clients}
              onSelectClient={this.handleSelectClient}
              handleDelete={this.handleDelete}
            />
          </Spin>

          {/**COMPONENTE PARA EDITAR CLIENTES */}
          <Modal
            title="Update client"
            visible={this.state.activeModal}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Volver
              </Button>,
            ]}
          >
            <UpdateClientForm
              onUpdate={this.handleUpdate}
              ClientId={this.state.client_id}
              disable={this.state.disable}
            />
          </Modal>
        </Col>
      </Row>
    );
  }
}
