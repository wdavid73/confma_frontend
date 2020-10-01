import React from "react";
import {
  Form,
  Row,
  Col,
  InputNumber,
  Input,
  Button,
  Collapse,
  Spin,
} from "antd";
import SelectShirts from "../SelectShirts";
import SelectPants from "../SelectPants";

import "../../../css/basic.css";

export default class CreateUniformsMale extends React.Component {
  state = {
    pants_id: "",
    shirt_id: "",
    price: 0,
    name_college: "",
    type: "uniform",
    loading: false,
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

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 5000);
  };

  render() {
    return (
      <div className="text-general">
        <Form ref={this.formRef} onFinish={this.handleSubmit}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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
              <Spin spinning={this.state.loading} tip="Loading...">
                <SelectShirts
                  shirts={this.props.shirts}
                  onChange={this.handleSelectShirt}
                />
              </Spin>
            </Collapse.Panel>
            <Collapse.Panel header="Pantalones" key="2">
              <Spin spinning={this.state.loading} tip="Loading...">
                <SelectPants
                  pants={this.props.pants}
                  onChange={this.handleSelectPant}
                />
              </Spin>
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
