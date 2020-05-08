import React from "react";
import {
  message,
  List,
  Form,
  InputNumber,
  Row,
  Col,
  DatePicker,
  Radio,
  Button,
  Card,
  Select,
  Descriptions,
} from "antd";
import { getClients } from "./js/ClientFuncions";
import { getClothWithOutRental, createRental } from "./js/RentalFunctions";
import { isNumber, isValidDate, isEmptyOrBlank } from "./actions/Validations";
import { validateMessages } from "./common/messages";
const { Item } = Form;
const { Option } = Select;
const { Meta } = Card;

export default class Rental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      date_return: "",
      price: 0,
      cloths: [],
      cloth_id: "",
      clients: [],
      client_id: "",
      rentals: [],
      editDisable: false,
      isChecked: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  formRef = React.createRef();

  getAll = () => {
    getClients().then((data) => {
      this.setState({
        clients: [...data.clients],
      });
    });

    getClothWithOutRental().then((data) => {
      this.setState({
        cloths: [...data.response],
      });
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange = (value) => {
    this.setState({
      client_id: value,
    });
  };

  handleChangeNumber = (value) => {
    this.setState({
      price: value,
    });
  };

  onChangeDate = (date, string) => {
    this.setState({
      date_return: string,
    });
  };

  onSubmit = () => {
    //e.preventDefault();
    if (
      isNumber(this.state.price) &&
      isValidDate(this.state.date_return) &&
      isEmptyOrBlank(this.state.client_id) &&
      isEmptyOrBlank(this.state.cloth_id)
    ) {
      console.log(
        this.state.date_return,
        this.state.price,
        this.state.cloth_id,
        this.state.client_id
      );
      message
        .loading("Registro en Proceso..", 2.5)
        .then(
          createRental(
            this.state.date_return,
            this.state.price,
            this.state.cloth_id,
            this.state.client_id
          )
        )
        .then(() => {
          this.getAll();
        })
        .then(() => message.success("Registro Completado", 2.5));
      this.formRef.current.resetFields();
      this.setState({
        date_return: "",
        price: 0,
        cloth_id: "",
        client_id: "",
      });
    } else {
      message.warning("Porfavor Diligencie Todos los Campos", 2.5);
    }
  };
  onFinishFail = () => {
    message.warning(
      "Ah ocurrido un Error porfavor Vuelva a Intentar o Actualize la pagina"
    );
  };

  render() {
    return (
      <Row>
        <Col>
          <Card title="Registro de Alquileres">
            <Form
              ref={this.formRef}
              onFinish={this.onSubmit}
              validateMessages={validateMessages}
              onFinishFailed={this.onFinishFail}
            >
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Item
                    label="Fecha de Devolucion"
                    name="date_return"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      onChange={this.onChangeDate.bind(this)}
                      placeholder="Seleccione una Fecha"
                      value={this.state.date_return || ""}
                      name="date_return"
                      style={{ width: "100%" }}
                    />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    label="Valor del Alquiler"
                    name="price"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      placeholder="Ingrese el valor del alquiler"
                      name="price"
                      value={this.state.price || 0}
                      onChange={this.handleChangeNumber.bind(this)}
                      style={{ width: "100%" }}
                    />
                  </Item>
                </Col>
              </Row>

              <Item label="Clientes" name="client" rules={[{ required: true }]}>
                <Select
                  placeholder="Seleccione un Cliente"
                  name="client_id"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.client_id || ""}
                >
                  {this.state.clients.map((client, index) => (
                    <Option value={client.id} key={index}>
                      {client.name} {client.last_name} - {client.address}
                    </Option>
                  ))}
                </Select>
              </Item>

              <Item label="Prendas" name="cloth">
                <List
                  grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 3,
                    md: 3,
                    lg: 3,
                  }}
                  pagination={{
                    pageSize: 3,
                  }}
                  dataSource={this.state.cloths}
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
                              onChange={this.onChange.bind(this)}
                              value={this.state.cloth_id}
                              rules={[{ required: true }]}
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
              <Button id="btn-submit" htmlType="submit">
                Registrar Prenda
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
