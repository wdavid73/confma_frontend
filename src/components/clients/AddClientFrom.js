import React from "react";
import { Form, Row, Col, Input, Button, message } from "antd";

export default class AddClientFrom extends React.Component {
  state = {
    name: "",
    last_name: "",
    address: "",
    cellphone: "",
    phone: "",
  };
  formRef = React.createRef();

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.formRef.current.resetFields();
    this.setState({
      name: "",
      last_name: "",
      address: "",
      cellphone: "",
      phone: "",
    });
  };

  onFinishFail = (values) => {
    values.errorFields.forEach((error, index) =>
      message.warning("Porfavor " + error.errors, 2.5)
    );
  };

  render() {
    return (
      <Form
        ref={this.formRef}
        onFinish={this.handleSubmit}
        onFinishFailed={this.onFinishFail}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              style={{ margin: 12 }}
            >
              <Input
                name="name"
                placeholder="Ingrese su Nombre/s"
                disabled={this.props.disable}
                value={this.state.name || ""}
                onChange={this.onChange}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Apellido"
              name="last_name"
              rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              style={{ margin: 12 }}
            >
              <Input
                name="last_name"
                placeholder="Ingrese su Apellido/s"
                disabled={this.props.disable}
                value={this.state.last_name || ""}
                onChange={this.onChange}
                size="large"
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
              style={{ margin: 12 }}
            >
              <Input
                name="address"
                placeholder="Ingrese su Direccion"
                disabled={this.props.disable}
                value={this.state.address || " "}
                onChange={this.onChange}
                size="large"
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
              style={{ margin: 12 }}
            >
              <Input
                type="number"
                name="phone"
                placeholder="Ingrese su Numero de Telefono"
                disabled={this.props.disable}
                value={this.state.phone || 0}
                onChange={this.onChange}
                addonBefore={"+035"}
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Numero de Celular"
              name="cellphone"
              rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              style={{ margin: 12 }}
            >
              <Input
                type="number"
                name="cellphone"
                placeholder="Ingrese su Numero de Celular"
                disabled={this.props.disable}
                value={this.state.cellphone || 0}
                onChange={this.onChange}
                addonBefore={"+57"}
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            id="btn-submit"
            htmlType="submit"
            disabled={this.props.disable}
            size="large"
          >
            <p style={{ color: "black" }}>Registar Cliente</p>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
