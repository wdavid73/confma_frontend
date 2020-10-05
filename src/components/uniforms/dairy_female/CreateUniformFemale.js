import React from "react";
import { Form, Row, Col, Button, Collapse, Spin } from "antd";
import SelectShirts from "../SelectShirts";
import SelectDress from "../dairy_female/SelectDress";
import SelectInstitution from "../SelectInstitution";
import { getShirtsFemale, getDress } from "../js/gets";
import "../../../css/basic.css";

export default class CreateUniformFemale extends React.Component {
  state = {
    dress_id: "",
    shirt_id: "",
    institution_id: "",
    price: 0,
    loading: false,
    shirts: [],
    dresses: [],
  };

  formRef = React.createRef();

  componentDidMount() {
    this.getComplements();
  }

  getComplements = () => {
    getShirtsFemale().then((data) => {
      this.setState({ shirts: [...data.shirts_female] });
    });
    getDress().then((data) => {
      this.setState({ dresses: [...data.dresses] });
    });
  };

  handleSelectShirt = (value) => {
    this.setState({
      shirt_id: value,
    });
  };
  handleSelectDress = (value) => {
    this.setState({
      dress_id: value,
    });
  };

  handleSelectInstitution = (value) => {
    this.setState({ institution_id: value });
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
    this.setState({
      shirts: [],
      dresses: [],
    });
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
                label="Institucion"
                name="institution_id"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <SelectInstitution onChange={this.handleSelectInstitution} />
              </Form.Item>
            </Col>
          </Row>

          <Collapse>
            <Collapse.Panel header="Camisas" key="1">
              <Spin spinning={this.state.loading} tip="Loading...">
                <SelectShirts
                  shirts={this.state.shirts}
                  onChange={this.handleSelectShirt}
                />
              </Spin>
            </Collapse.Panel>
            <Collapse.Panel header="Vestidos" key="2">
              <Spin spinning={this.state.loading} tip="Loading...">
                <SelectDress
                  dress={this.state.dresses}
                  onChange={this.handleSelectDress}
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
