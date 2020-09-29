import React from "react";
import { Form, Row, Col, InputNumber, Input, Button, Collapse } from "antd";
import SelectShirts from "../SelectShirts";
import SelectPants from "../SelectPants";

import "../../../css/basic.css";

export default class CreateUniformsMale extends React.Component {
  state = {
    pants_id: "",
    shirt_id: "",
    price: "",
    name_college: "",
    type: "uniform",
  };

  formRef = React.createRef();

  handleSelectShirt = (value) => {
    this.setState({
      shirt_id: value,
    });
  };
  handleSelectPant = (value) => {
    this.setState({
      pants_id: value,
    });
  };

  handleChangeNumber = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    this.formRef.current.resetFields();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div className="text-general">
        <Form ref={this.formRef} onFinish={this.handleSubmit}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Valor del Uniforme"
                name="price"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Ingrese el valor del uniforme"
                  name="price"
                  value={this.state.price || 0}
                  onChange={this.handleChangeNumber("price")}
                  style={{ width: "100%" }}
                  max={1000000}
                  min={5000}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Nombre del Colegio"
                name="name_college"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <Input
                  name="name_college"
                  placeholder="Ingrese el nombre del colegio"
                  value={this.state.name_college || ""}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Collapse>
            <Collapse.Panel header="Camisas" key="1">
              <SelectShirts
                shirts={this.props.shirts}
                onChange={this.handleSelectShirt}
              />
            </Collapse.Panel>
            <Collapse.Panel header="Pantalones" key="2">
              <SelectPants
                pants={this.props.pants}
                onChange={this.handleSelectPant}
              />
            </Collapse.Panel>
          </Collapse>
          <Button
            id="btn-submit-rental"
            className="mt-2"
            style={{ color: "black" }}
            htmlType="submit"
          >
            Registrar Uniforme
          </Button>
        </Form>
      </div>
    );
  }
}
