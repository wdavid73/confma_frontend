import React from "react";
import { Form, Row, Col, Input, Button, message, Spin } from "antd";
import { detailsOneClient } from "./js/ClientFuncions";
import { isEmptyOrBlank } from "../common/Validations";
import {
  fieldName,
  fieldAddress,
  fieldPhone,
  fieldLastname,
  fieldCellphone,
} from "../common/referencesFields";

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
    let field;
    for (const state in this.state) {
      if (!isEmptyOrBlank(this.state[state]) && state === "name") {
        fieldName.current.focus();
        field = state;
        console.log(state);
        console.log(this.state[state]);
        break;
      }
      if (!isEmptyOrBlank(this.state[state]) && state === "last_name") {
        fieldLastname.current.focus();
        field = state;
        console.log(state);
        console.log(this.state[state]);
        break;
      }
      if (!isEmptyOrBlank(this.state[state]) && state === "address") {
        fieldAddress.current.focus();
        field = state;
        console.log(state);
        console.log(this.state[state]);
        break;
      }
    }
    if (!field) {
      this.props.onUpdate(this.state);
      this.setState({
        name: "",
        last_name: "",
        address: "",
        phone: "",
        cellphone: "",
      });
      this.formRef.current.resetFields();
    } else {
      message.info({
        content: "El campo " + field + " no puede estar vacio",
        duration: 2.5,
      });
    }
  };

  onFinishFail = (values) => {
    values.errorFields.forEach((error, index) =>
      message.warning("Porfavor " + error.errors, 2.5)
    );
  };

  render() {
    return (
      <div className="text-general">
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
                  rules={[
                    { required: true, message: "Porfavor Llene el Campo" },
                  ]}
                  style={{ margin: 2 }}
                >
                  <Input
                    ref={fieldName}
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
                  rules={[
                    { required: true, message: "Porfavor Llene el Campo" },
                  ]}
                  style={{ margin: 2 }}
                >
                  <Input
                    ref={fieldLastname}
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
                  rules={[
                    { required: true, message: "Porfavor Llene el Campo" },
                  ]}
                  style={{ marginTop: 10 }}
                >
                  <Input
                    ref={fieldAddress}
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
                  rules={[
                    { required: true, message: "Porfavor Llene el Campo" },
                  ]}
                >
                  <Input
                    ref={fieldPhone}
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
                  rules={[
                    { required: true, message: "Porfavor Llene el Campo" },
                  ]}
                >
                  <Input
                    ref={fieldCellphone}
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
              <Button
                id="btn-submit"
                htmlType="submit"
                style={{ color: "black" }}
              >
                Update Client
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}
