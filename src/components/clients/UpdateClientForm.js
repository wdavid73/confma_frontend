import React from "react";
import { Form, Row, Col, Input, Button, message, Spin } from "antd";
import { detailsOneClient } from "./js/ClientFuncions";

export default class UpdateClientForm extends React.Component {
  state = {
    id: "",
    name: "",
    last_name: "",
    address: "",
    cellphone: "",
    phone: "",
    loading: false,
  };

  formRef = React.createRef();

  componentDidMount() {
    this.getClientById(this.props.ClientId);
  }

  componentDidUpdate(prevProps) {
    const { ClientId } = this.props;
    if (prevProps.ClientId !== ClientId) {
      this.getClientById(ClientId);
    }
  }

  showSpin = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  getClientById = (client_id) => {
    this.showSpin();
    detailsOneClient(client_id).then((data) => {
      this.setState({
        name: data.client.name,
        last_name: data.client.last_name,
        address: data.client.address,
        cellphone: data.client.cellphone,
        phone: data.client.phone,
        id: data.client.id,
      });
      this.formRef.current.setFieldsValue({
        name: data.client.name,
        last_name: data.client.last_name,
        address: data.client.address,
        cellphone: data.client.cellphone,
        phone: data.client.phone,
      });
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUpdate = () => {
    this.props.onUpdate(this.state);
    this.setState({
      name: "",
      last_name: "",
      address: "",
      phone: "",
      cellphone: "",
    });
    this.formRef.current.resetFields();
  };

  onFinishFail = (values) => {
    values.errorFields.forEach((error, index) =>
      message.warning("Porfavor " + error.errors, 2.5)
    );
  };

  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Form
          ref={this.formRef}
          onFinish={this.handleUpdate}
          onFinishFailed={this.onFinishFail}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
                style={{ margin: 2 }}
              >
                <Input
                  name="name"
                  placeholder="Ingrese su Nombre/s"
                  value={this.state.name || ""}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Apellido"
                name="last_name"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
                style={{ margin: 2 }}
              >
                <Input
                  name="last_name"
                  placeholder="Ingrese su Apellido/s"
                  value={this.state.last_name || ""}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Direccion"
                name="address"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
                style={{ marginTop: 10 }}
              >
                <Input
                  name="address"
                  placeholder="Ingrese su Direccion"
                  value={this.state.address || " "}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="phone"
                label="Numero de Telefono"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <Input
                  type="number"
                  name="phone"
                  placeholder="Ingrese su Numero de Telefono"
                  value={this.state.phone || 0}
                  onChange={this.onChange}
                  addonBefore={"+035"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Numero de Celular"
                name="cellphone"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <Input
                  type="number"
                  name="cellphone"
                  placeholder="Ingrese su Numero de Celular"
                  value={this.state.cellphone || 0}
                  onChange={this.onChange}
                  addonBefore={"+57"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button id="btn-submit" htmlType="submit">
              Update Client
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}
