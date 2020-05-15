import React, { Component } from "react";
import {
  Drawer,
  Button,
  message,
  Table,
  Empty,
  Card,
  List,
  Popover,
  Modal,
  Descriptions,
  Row,
  Col,
  Radio,
  Form,
  InputNumber,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  getClothWithOutQuotation,
  getQuotations,
  createQuotation,
  createQuotationClient,
  getClientNotDuplicated,
  deleteQuotation,
  updateQuotation,
} from "./functions/QuotationFunctions.js";
import { isNumber } from "../common/Validations";
import {
  popover_edit_quotation,
  popover_add_client_quotation,
  popover_delete_quotation,
  popover_title_add_client,
  popover_title_delete,
  popover_title_edit,
} from "../common/messages";
const { Meta } = Card;
const { Item } = Form;
const { Option } = Select;

export default class Quotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      value_cloth: 0,
      value_work: 0,
      value_threads: 0,
      value_buttons: 0,
      value_necks: 0,
      value_embroidery: 0,
      value_prints: 0,
      total: 0,
      quotations: [],
      cloth: [],
      cloth_id: "",
      clients: [],
      client_id: "",
      visibleDrawer: false,
      editDisable: false,
      showCard: true,
      visibleModal: false,
      confirmLoading: false,
      loading: false,
      quotation_id_modal: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  formRef = React.createRef();

  showDrawer = () => {
    this.setState({
      visibleDrawer: true,
    });
  };

  onClose = () => {
    this.setState({
      visibleDrawer: false,
    });
  };

  onChange = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  onChangeRadio = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getAll = () => {
    getQuotations().then((data) => {
      this.setState({
        value_cloth: 0,
        value_work: 0,
        value_threads: 0,
        value_buttons: 0,
        value_necks: 0,
        value_embroidery: 0,
        value_prints: 0,
        total: 0,
        quotations: [...data.quotations],
      });
    });

    getClothWithOutQuotation().then((data) => {
      this.setState({
        cloth: [...data.response],
      });
    });
  };

  onSubmit = () => {
    //e.preventDefault();
    if (
      isNumber(this.state.value_cloth) &&
      isNumber(this.state.value_work) &&
      isNumber(this.state.value_buttons) &&
      isNumber(this.state.value_embroidery) &&
      isNumber(this.state.value_necks) &&
      isNumber(this.state.value_prints) &&
      isNumber(this.state.value_threads)
    ) {
      message
        .loading("Registro en Proceso..", 2.5)
        .then(
          createQuotation(
            this.state.value_cloth,
            this.state.value_work,
            this.state.value_buttons,
            this.state.value_embroidery,
            this.state.value_necks,
            this.state.value_prints,
            this.state.value_threads,
            this.state.cloth_id
          )
        )
        .then(() => {
          this.getAll();
        })
        .then(() => message.success("Registro Completado", 2.5));
      this.setState({
        value_cloth: 0,
        value_work: 0,
        value_threads: 0,
        value_buttons: 0,
        value_necks: 0,
        value_embroidery: 0,
        value_prints: 0,
        cloth_id: "",
      });
      this.formRef.current.resetFields();
      this.onClose();
    } else {
      message.warning("Porfavor Diligencie todos los Campos", 2.5);
    }
  };

  onEdit = (quotationId, e) => {
    e.preventDefault();
    this.showDrawer();
    let data = [...this.state.quotations];
    data.forEach((quotation, index) => {
      if (quotationId === quotation.id) {
        this.setState({
          id: quotation.id,
          value_work: quotation.value_work,
          value_buttons: quotation.value_buttons,
          value_cloth: quotation.value_cloth,
          value_embroidery: quotation.value_embroidery,
          value_necks: quotation.value_necks,
          value_prints: quotation.value_prints,
          value_threads: quotation.value_threads,
          editDisable: true,
          showCard: false,
        });
      }
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    if (
      isNumber(this.state.value_cloth) &&
      isNumber(this.state.value_work) &&
      isNumber(this.state.value_buttons) &&
      isNumber(this.state.value_embroidery) &&
      isNumber(this.state.value_necks) &&
      isNumber(this.state.value_prints) &&
      isNumber(this.state.value_threads)
    ) {
      message
        .loading("Actualizacion en Proceso...", 2.5)
        .then()
        .then(
          updateQuotation(
            this.state.value_cloth,
            this.state.value_work,
            this.state.value_buttons,
            this.state.value_embroidery,
            this.state.value_threads,
            this.state.value_necks,
            this.state.value_prints,
            this.state.id
          )
        );
    } else {
      console.log(false);
    }
  };

  onDelete = (quotationId, e) => {
    e.preventDefault();
    deleteQuotation(quotationId);
    let data = [...this.state.quotations];
    data.filter((quotation, index) => {
      if (quotationId === quotation.id) {
        data.splice(index, 1);
      }
      return true;
    });
    this.setState({ quotations: [...data] });
    message.error("Cotizacion #" + quotationId + " Eliminadada", 2);
  };

  showModal = (quotationId) => {
    getClientNotDuplicated(quotationId).then((data) => {
      this.setState({
        clients: [...data.clients],
      });
    });

    this.setState({
      visibleModal: true,
      quotation_id_modal: quotationId,
    });
  };

  handleOk = (quotationId, e) => {
    e.preventDefault();
    message
      .loading("Guardando Client .....", 2.5)
      .then(
        createQuotationClient(quotationId, this.state.client_id),
        this.setState({
          client_id: "",
          loading: true,
          clients: [],
        }),
        setTimeout(() => {
          this.setState({ loading: false, visibleModal: false });
        }, 3000)
      )
      .then(() => {
        message.success("Cliente Guardado Correctamente", 2.5);
      });
  };

  handleCancel = () => {
    this.setState({ visibleModal: false });
  };

  detailsQuotation = (id, e) => {
    e.preventDefault();
    console.log("DETAILS");
    console.log(id);
  };

  render() {
    return (
      <div>
        <div>
          <Drawer
            title="Registrar Cotizacion"
            width={"75%"}
            onClose={this.onClose}
            visible={this.state.visibleDrawer}
            footer={
              <div style={{ textAlign: "right" }}>
                <Button
                  id="btn-delete"
                  onClick={this.onClose}
                  style={{ marginRight: 8 }}
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            }
          >
            <div>
              <Form
                //labelCol={{ span: 12 }}
                //wrapperCol={{ span: 22 }}
                layout="vertical"
                onFinish={this.onSubmit}
                ref={this.formRef}
              >
                <Row gutter={[16, 8]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <Item
                      label="Valor del Trabajo"
                      rules={[
                        { required: true, message: "Porfavor Llene el Campo" },
                      ]}
                    >
                      <InputNumber
                        id="inputNumber"
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placelholder="Ingrese el Valor del Trabajo"
                        value={this.state.value_work || ""}
                        max={100000}
                        onChange={this.onChange("value_work")}
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <Item
                      label="Valor de la Tela"
                      rules={[
                        { required: true, message: "Porfavor Llene el Campo" },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placelholder="Ingrese el Valor de la Tela"
                        value={this.state.value_cloth || ""}
                        max={100000}
                        onChange={this.onChange("value_cloth")}
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row gutter={[16, 8]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <Item
                      label="Valor de los Botones"
                      rules={[
                        { required: true, message: "Porfavor Llene el Campo" },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placelholder="Ingrese el Valor de los Botones"
                        value={this.state.value_buttons || ""}
                        max={100000}
                        onChange={this.onChange("value_buttons")}
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <Item
                      label="Valor de los Cuellos"
                      rules={[
                        { required: true, message: "Porfavor Llene el Campo" },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placelholder="Ingrese el Valor de los Cuellos"
                        value={this.state.value_necks || ""}
                        max={100000}
                        onChange={this.onChange("value_necks")}
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row gutter={[16, 8]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Item
                      label="Valor de los Hilos"
                      rules={[
                        { required: true, message: "Porfavor Llene el Campo" },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placelholder="Ingrese el Valor de los Hilos"
                        value={this.state.value_threads || ""}
                        max={100000}
                        onChange={this.onChange("value_threads")}
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Item
                      label="Valor del Bordado"
                      rules={[
                        { required: true, message: "Porfavor Llene el Campo" },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placelholder="Ingrese el Valor del Bordado"
                        value={this.state.value_embroidery || ""}
                        max={100000}
                        onChange={this.onChange("value_embroidery")}
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Item
                      label="Valor del Estampado"
                      rules={[
                        { required: true, message: "Porfavor Llene el Campo" },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        placelholder="Ingrese el Valor del Estampado"
                        value={this.state.value_prints || ""}
                        max={100000}
                        onChange={this.onChange("value_prints")}
                        style={{ width: "100%" }}
                      />
                    </Item>
                  </Col>
                </Row>
                {this.state.showCard ? (
                  <Item label="Prendas" name="cloth">
                    <List
                      grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 3,
                        md: 3,
                        lg: 2,
                      }}
                      pagination={{
                        pageSize: 2,
                      }}
                      dataSource={this.state.cloth}
                      renderItem={(cloth) => (
                        <List.Item>
                          <Card
                            hoverable
                            actions={[
                              <Item
                                rules={[
                                  {
                                    required: true,
                                    message: "Porfavor Seleccione una Prenda",
                                  },
                                ]}
                                name="cloth_id"
                              >
                                <Radio.Group
                                  name="cloth_id"
                                  onChange={this.onChangeRadio.bind(this)}
                                  value={this.state.cloth_id}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Porfavor Llene el Campo",
                                    },
                                  ]}
                                >
                                  <Radio value={cloth.id}>{cloth.name}</Radio>
                                </Radio.Group>
                              </Item>,
                            ]}
                          >
                            <Row gutter={[16, 8]}>
                              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                <img
                                  src={cloth.image}
                                  className="card-img-top mb-2"
                                  alt="moda de referencia"
                                />
                              </Col>
                              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                <div>
                                  <Descriptions
                                    title="Detalles de la Prenda"
                                    bordered
                                    column={{
                                      xxl: 1,
                                      xl: 1,
                                      lg: 1,
                                      md: 1,
                                      sm: 1,
                                      xs: 1,
                                    }}
                                    style={{ width: "105%" }}
                                  >
                                    <Descriptions.Item label="Talla">
                                      {cloth.size}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Color">
                                      {cloth.color}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Moda">
                                      {cloth.fashion}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </div>
                              </Col>
                            </Row>
                            <Meta
                              title={cloth.name}
                              description="www.confeccionesmaribel.com"
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Item>
                ) : (
                  ""
                )}
                {!this.state.editDisable ? (
                  <Button id="btn-submit" htmlType="submit">
                    Registrar
                  </Button>
                ) : (
                  ""
                )}
                {this.state.editDisable ? (
                  <Button
                    id="btn-edit"
                    htmlType="submit"
                    onClick={this.onUpdate.bind(this)}
                  >
                    Actualizar
                  </Button>
                ) : (
                  ""
                )}
              </Form>
            </div>
          </Drawer>
        </div>
        <div>
          {this.state.quotations.length <= 0 ? (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>No hay Cotizaciones Registrados</span>}
            >
              <Button id="btn-form" onClick={this.showDrawer}>
                Registrar Cotizacion
              </Button>
            </Empty>
          ) : (
            <div>
              <Button id="btn-form" onClick={this.showDrawer}>
                Registrar Cotizacion
              </Button>
              <div className="mt-3">
                <Table
                  dataSource={this.state.quotations}
                  pagination={{ pageSize: 10 }}
                  scroll={{ y: 500 }}
                  size="small"
                  bordered
                >
                  <Table.ColumnGroup title="Cotizacion">
                    <Table.Column
                      title="Index"
                      dataIndex="id"
                      responsive={"md"}
                      key="id"
                      render={(id) => <p>{id}</p>}
                    />

                    <Table.Column title="Total" dataIndex="total" key="total" />
                  </Table.ColumnGroup>
                  <Table.ColumnGroup title="Prenda" key="cloth">
                    <Table.Column
                      title="Prenda"
                      dataIndex="cloth"
                      key="cloth_name"
                      render={(cloth) => <p>{cloth.name}</p>}
                    />
                    <Table.Column
                      title="Color"
                      dataIndex="cloth"
                      key="cloth_color"
                      render={(cloth) => <p>{cloth.color}</p>}
                    />
                    <Table.Column
                      title="Talla"
                      dataIndex="cloth"
                      key="cloth_size"
                      render={(cloth) => <p>{cloth.size}</p>}
                    />
                    <Table.Column
                      title="Moda"
                      dataIndex="cloth"
                      key="cloth_fashion"
                      render={(cloth) => <p>{cloth.fashion}</p>}
                    />
                  </Table.ColumnGroup>
                  <Table.Column
                    title="Acciones"
                    key="action"
                    render={(quotation) => (
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                          <Popover
                            placement="topLeft"
                            content={popover_edit_quotation}
                            title={popover_title_edit}
                          >
                            <Button
                              type="link"
                              id="btn-edit-icon-link"
                              htmlType="submit"
                              onClick={this.onEdit.bind(this, quotation.id)}
                            >
                              <EditOutlined style={{ fontSize: "24px" }} />
                            </Button>
                          </Popover>
                          <Col xs={24} sm={24} md={24} lg={24} xl={8}></Col>
                          <Popover
                            placement="topLeft"
                            content={popover_delete_quotation}
                            title={popover_title_delete}
                          >
                            <Button
                              type="link"
                              id="btn-delete-icon-link"
                              htmlType="submit"
                              onClick={this.onDelete.bind(this, quotation.id)}
                            >
                              <DeleteOutlined style={{ fontSize: "24px" }} />
                            </Button>
                          </Popover>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                          <Popover
                            placement="topLeft"
                            content={popover_add_client_quotation}
                            title={popover_title_add_client}
                          >
                            <Button
                              type="link"
                              id="btn-submit-icon-link"
                              htmlType="submit"
                              onClick={this.showModal.bind(this, quotation.id)}
                            >
                              <UserAddOutlined style={{ fontSize: "24px" }} />
                            </Button>
                          </Popover>
                        </Col>
                      </Row>
                    )}
                  />
                </Table>
              </div>
            </div>
          )}
        </div>
        <div>
          <Modal
            title="Cotizacion - Cliente"
            visible={this.state.visibleModal}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            width={"50%"}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Volver
              </Button>,
            ]}
          >
            {this.state.quotations.map((quotation, index) => (
              <p key={index}>
                {this.state.quotation_id_modal === quotation.id ? (
                  <div>
                    <div>
                      <Descriptions title="Informacion de la Cotizacion">
                        <Descriptions.Item label="Valor de la Tela">
                          {quotation.value_cloth}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor de la Tela">
                          {quotation.value_cloth}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor del Trabajo">
                          {quotation.value_work}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor de los Botones">
                          {quotation.value_buttons}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor de los Cuellos">
                          {quotation.value_necks}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor de los Hilos">
                          {quotation.value_threads}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor del Bordado">
                          {quotation.value_embroidery}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor del Estampado">
                          {quotation.value_prints}
                        </Descriptions.Item>
                        <Descriptions.Item label="Valor Total">
                          {quotation.total}
                        </Descriptions.Item>
                      </Descriptions>
                      <Form>
                        <Item label="Clientes" name="client">
                          <Select
                            placeholder="Seleccione un Cliente.."
                            name="client_id"
                            onChange={this.onChange.bind(this)}
                            value={this.state.client_id || ""}
                          >
                            {this.state.clients.map((client, index) => (
                              <Option value={client.id} key={index}>
                                {client.name} {client.last_name} -{" "}
                                {client.address} - {client.cellphone}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                        <Button
                          key="submit"
                          type="primary"
                          id="btn-submit"
                          loading={this.state.loading}
                          onClick={this.handleOk.bind(this, quotation.id)}
                        >
                          Guardar Cliente
                        </Button>
                      </Form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </p>
            ))}
          </Modal>
        </div>
      </div>
    );
  }
}
