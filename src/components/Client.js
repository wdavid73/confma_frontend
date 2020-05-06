import React from "react";
import {
  message,
  Table,
  Empty,
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
} from "antd";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "./js/ClientFuncions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { validateMessages } from "./common/messages";
import { isEmptyOrBlank, isNumber } from "./actions/Validations";
const { Column, ColumnGroup } = Table;
const { Item } = Form;

export default class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      last_name: "",
      address: "",
      phone: "",
      cellphone: "",
      editDisable: false,
      buttonDisable: false,
      inputDisable: false,
      clients: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  formRef = React.createRef();

  componentDidMount() {
    this.getAll();
  }

  disableButton = () => {
    this.setState({
      buttonDisable: true,
    });
  };

  disableInput = () => {
    this.setState({
      inputDisable: true,
    });
  };

  getAll = () => {
    getClients().then((data) => {
      this.setState({
        name: "",
        last_name: "",
        address: "",
        phone: "",
        cellphone: "",
        clients: [...data.clients],
      });
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    //e.preventDefault()
    if (
      isEmptyOrBlank(this.state.name) &&
      isEmptyOrBlank(this.state.last_name) &&
      isEmptyOrBlank(this.state.address) &&
      isNumber(this.state.cellphone) &&
      isNumber(this.state.phone)
    ) {
      message
        .loading("Registro en Proceso..", 2.5)
        .then(
          createClient(
            this.state.name,
            this.state.last_name,
            this.state.address,
            this.state.phone,
            this.state.cellphone
          )
        )
        .then(() => {
          this.getAll();
        })
        .then(() => message.success("Registro Completado", 2.5));
      this.setState({
        name: "",
        last_name: "",
        address: "",
        phone: "",
        cellphone: "",
      });
      this.formRef.current.resetFields();
    } else {
      message.warning("Porfavor Diligencie Todos los Campos", 2.5);
    }
  };

  onEdit = (clientId, e) => {
    e.preventDefault();
    let data = [...this.state.clients];
    data.forEach((client, index) => {
      if (client.id === clientId) {
        this.setState({
          id: client.id,
          name: client.name,
          last_name: client.last_name,
          address: client.address,
          phone: client.phone,
          cellphone: client.cellphone,
          editDisable: true,
          buttonDisable: true,
        });
        this.formRef.current.setFieldsValue({
          name: client.name,
          last_name: client.last_name,
          address: client.address,
          phone: client.phone,
          cellphone: client.cellphone,
        });
      }
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    if (
      isEmptyOrBlank(this.state.name) &&
      isEmptyOrBlank(this.state.last_name) &&
      isEmptyOrBlank(this.state.address) &&
      isNumber(this.state.cellphone) &&
      isNumber(this.state.phone)
    ) {
      message
        .loading("Actualizacion en Proceso..", 2.5)
        .then(
          updateClient(
            this.state.name,
            this.state.last_name,
            this.state.address,
            this.state.phone,
            this.state.cellphone,
            this.state.id
          )
        )
        .then(() => {
          this.getAll();
        })
        .then(() => {
          message.success("Actualizacion Completada.", 2.5);
        });
      this.setState({
        name: "",
        last_name: "",
        address: "",
        phone: "",
        cellphone: "",
        editDisable: false,
        buttonDisable: false,
      });
      this.formRef.current.resetFields();
    } else {
      message.warning("Porfavor Diligencie Todos los Campos", 2.5);
    }
  };

  onDelete = (val, e) => {
    e.preventDefault();
    this.disableButton();
    this.disableInput();
    message
      .loading("Elimando Cliente....", 2.5)
      .then(deleteClient(val))
      .then(() => {
        var data = [...this.state.clients];
        data.filter(function (client, index) {
          if (client.id === val) {
            data.splice(index, 1);
          }
          return true;
        });
        this.setState({
          clients: [...data],
          buttonDisable: false,
          inputDisable: false,
        });
      })
      .then(() => {
        message.warning("Cliente Eliminado Satisfactoriamente");
      });
  };

  render() {
    return (
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card title="Registro de Clientes" id="card_client">
            <Form
              ref={this.formRef}
              onSubmitCapture={this.onSubmit}
              validateMessages={validateMessages}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true }]}
                    style={{ margin: 2 }}
                  >
                    <Input
                      name="name"
                      placeholder="Ingrese su Nombre/s"
                      disabled={this.state.inputDisable}
                      value={this.state.name || ""}
                      onChange={this.onChange}
                    />
                  </Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Item
                    label="Apellido"
                    name="last_name"
                    rules={[{ required: true }]}
                    style={{ margin: 2 }}
                  >
                    <Input
                      name="last_name"
                      placeholder="Ingrese su Apellido/s"
                      disabled={this.state.inputDisable}
                      value={this.state.last_name || ""}
                      onChange={this.onChange}
                    />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Item
                    label="Direccion"
                    name="address"
                    rules={[{ required: true }]}
                    style={{ marginTop: 10 }}
                  >
                    <Input
                      name="address"
                      placeholder="Ingrese su Direccion"
                      disabled={this.state.inputDisable}
                      value={this.state.address || " "}
                      onChange={this.onChange}
                    />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Item
                    name="phone"
                    label="Numero de Telefono"
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="number"
                      name="phone"
                      placeholder="Ingrese su Numero de Telefono"
                      disabled={this.state.inputDisable}
                      value={this.state.phone || 0}
                      onChange={this.onChange}
                      addonBefore={"+035"}
                      style={{ width: "100%" }}
                    />
                  </Item>
                  <Item
                    label="Numero de Celular"
                    name="cellphone"
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="number"
                      name="cellphone"
                      placeholder="Ingrese su Numero de Celular"
                      disabled={this.state.inputDisable}
                      value={this.state.cellphone || 0}
                      onChange={this.onChange}
                      addonBefore={"+57"}
                      style={{ width: "100%" }}
                    />
                  </Item>
                </Col>
              </Row>
              <Item>
                {!this.state.editDisable ? (
                  <Button
                    id="btn-submit"
                    htmlType="submit"
                    disabled={this.state.buttonDisable}
                  >
                    Registar Cliente
                  </Button>
                ) : (
                  ""
                )}
                {this.state.editDisable ? (
                  <div>
                    <Button
                      id="btn-edit"
                      htmlType="submit"
                      onClick={this.onUpdate.bind(this)}
                    >
                      Actualizar Cliente
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          {this.state.clients.length <= 0 ? (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>No hay Clientes Registrados</span>}
            ></Empty>
          ) : (
            <Table
              dataSource={this.state.clients}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 400 }}
            >
              <ColumnGroup title="Nombre Completo">
                <Column title="Nombre/s" dataIndex="name" key="name" />
                <Column
                  title="Apellido/s"
                  dataIndex="last_name"
                  key="last_name"
                />
              </ColumnGroup>
              <Column title="Direcion" dataIndex="address" key="address" />
              <Column title="Telefono" dataIndex="phone" key="phone" />
              <Column title="Celular" dataIndex="cellphone" key="cellphone" />
              <Column
                title="Acciones"
                key="action"
                render={(client, record) => (
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <button
                        href=""
                        className="btn btn-info btn-block btn-sm"
                        disabled={this.state.buttonDisable}
                        onClick={this.onEdit.bind(this, client.id)}
                      >
                        <EditOutlined style={{ fontSize: "24px" }} />
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <button
                        href=""
                        className="btn btn-danger btn-block btn-sm"
                        disabled={this.state.buttonDisable}
                        onClick={this.onDelete.bind(this, client.id)}
                      >
                        <DeleteOutlined style={{ fontSize: "24px" }} />
                      </button>
                    </div>
                  </div>
                )}
              />
            </Table>
          )}
        </Col>
      </Row>
    );
  }
}
