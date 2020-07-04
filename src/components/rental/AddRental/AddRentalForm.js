import React from "react";
import { Card, Form, Row, Col, Button, InputNumber, DatePicker } from "antd";
import "../../../css/basic.css";
export default class AddRentalForm extends React.Component {
  state = {
    date_return: "",
    price: 0,
  };

  formRef = React.createRef();

  onChangeDate = (date, string) => {
    this.setState({
      date_return: string,
    });
  };

  handleChangeNumber = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    this.formRef.current.resetFields();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <Card title="Registro de Alquileres" className="text-general">
        <Form ref={this.formRef} onFinish={this.handleSubmit}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item
                label="Fecha de Devolucion"
                name="date_return"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <DatePicker
                  onChange={this.onChangeDate}
                  placeholder="Seleccione una Fecha"
                  value={this.state.date_return || ""}
                  name="date_return"
                  style={{ width: "100%" }}
                  disabled={this.props.disable}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Valor del Alquiler"
                name="price"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Ingrese el valor del alquiler"
                  name="price"
                  value={this.state.price || 0}
                  onChange={this.handleChangeNumber("price")}
                  style={{ width: "100%" }}
                  max={1000000}
                  min={5000}
                  disabled={this.props.disable}
                />
              </Form.Item>
            </Col>
          </Row>
          <div>{this.props.children}</div>
          <Button
            id="btn-submit-rental"
            style={{ color: "black" }}
            htmlType="submit"
            disabled={this.props.disable}
          >
            Registrar Prenda
          </Button>
        </Form>
      </Card>
    );
  }
}
