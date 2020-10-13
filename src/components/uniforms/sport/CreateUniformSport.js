import React from "react";
import { Form, Row, Col, Button, Collapse, Spin } from "antd";
import SelectShirts from "../SelectShirts";
import SelectPants from "../SelectPants";
import SelectInstitution from "../SelectInstitution";
import { getPantsSportMale, getShirtsSportMale } from "../js/gets";
import "../../../css/basic.css";

export default class CreateUniformsSport extends React.Component {
  state = {
    pants_id: "",
    shirt_id: "",
    institution_id: "",
    price: 0,
    gender: "",
    loading: false,
    shirts: [],
    pants: [],
  };

  formRef = React.createRef();

  componentDidMount() {
    this.getComplements();
  }

  getComplements = () => {
    getShirtsSportMale().then((data) => {
      this.setState({ shirts: [...data.shirts_sport_male] });
    });
    getPantsSportMale().then((data) => {
      this.setState({ pants: [...data.pants_sport_male] });
    });
  };

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

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 5000);
  };

  handleSubmit = () => {
    let gender = this.props.gender;
    this.setState({ gender: gender });
    this.formRef.current.resetFields();
    this.props.onSubmit(this.state);
    this.setState({
      shirts: [],
      pants: [],
    });
  };
  render() {
    return (
      <>
        <div className="text-general">
          <Form ref={this.formRef} onFinish={this.handleSubmit}>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form.Item
                  label="Institucion"
                  name="institution_id"
                  rules={[
                    { required: true, message: "Porfavor Llene el Campo" },
                  ]}
                >
                  <SelectInstitution onChange={this.handleSelectInstitution} />
                </Form.Item>
              </Col>
            </Row>
            <Collapse>
              <Collapse.Panel header="Camisas" key="1">
                <Spin spinning={this.state.loading} tip="Loading...">
                  <Form.Item name="shirt">
                    <SelectShirts
                      shirts={this.state.shirts}
                      onChange={this.handleSelectShirt}
                    />
                  </Form.Item>
                </Spin>
              </Collapse.Panel>

              <Collapse.Panel header="Pantalones" key="2">
                <Spin spinning={this.state.loading} tip="Loading...">
                  <Form.Item name="pants">
                    <SelectPants
                      pants={this.state.pants}
                      onChange={this.handleSelectPant}
                    />
                  </Form.Item>
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
      </>
    );
  }
}
