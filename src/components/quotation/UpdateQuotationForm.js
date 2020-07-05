import React from "react";
import { Row, Col, Form, InputNumber, Button, Spin } from "antd";
import { getOneQuotation } from "./functions/QuotationFunctions";
export default class UpdateQuotationForm extends React.Component {
  state = {
    id: "",
    value_work: 0,
    value_cloth: 0,
    value_threads: 0,
    value_buttons: 0,
    value_necks: 0,
    value_embroidery: 0,
    value_prints: 0,
    total: 0,
    clothId: "",
    loading: false,
    disable: false,
  };

  componentDidMount() {
    this.getQuotationById(this.props.quotationId);
    this.showSpin();
  }

  componentDidUpdate(prevProps) {
    const { quotationId } = this.props;
    if (prevProps.quotationId !== quotationId) {
      this.getQuotationById(quotationId);
      this.showSpin();
    }
  }

  getQuotationById = (quotation_id) => {
    getOneQuotation(quotation_id).then((data) => {
      this.setState({
        id: data.quotation.id,
        value_work: data.quotation.value_work,
        value_cloth: data.quotation.value_cloth,
        value_threads: data.quotation.value_threads,
        value_buttons: data.quotation.value_buttons,
        value_necks: data.quotation.value_necks,
        value_embroidery: data.quotation.value_embroidery,
        value_prints: data.quotation.value_prints,
        total: this.total(data),
        clothId: data.quotation.cloth.id,
      });
      this.formRef.current.setFieldsValue({
        value_work: data.quotation.value_work,
        value_cloth: data.quotation.value_cloth,
        value_threads: data.quotation.value_threads,
        value_buttons: data.quotation.value_buttons,
        value_necks: data.quotation.value_necks,
        value_embroidery: data.quotation.value_embroidery,
        value_prints: data.quotation.value_prints,
        total: this.total(data),
      });
    });
  };

  total = (data) => {
    return (
      parseFloat(data.quotation.value_work) +
      parseFloat(data.quotation.value_cloth) +
      parseFloat(data.quotation.value_threads) +
      parseFloat(data.quotation.value_buttons) +
      parseFloat(data.quotation.value_necks) +
      parseFloat(data.quotation.value_embroidery) +
      parseFloat(data.quotation.value_prints)
    );
  };

  onChange = (name) => (value) => {
    let total = this.state.total;
    const keys = Object.keys(this.state);
    keys.forEach((key) => {
      if (key === name) {
        this.setState({
          total: total + parseFloat(value) - this.state[key],
          [name]: value,
        });
      }
    });
  };

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 4500);
  };

  formRef = React.createRef();

  onUpdate = () => {
    this.props.onUpdate(this.state);
    this.formRef.current.resetFields();
    this.setState({
      value_work: 0,
      value_cloth: 0,
      value_threads: 0,
      value_buttons: 0,
      value_necks: 0,
      value_embroidery: 0,
      value_prints: 0,
      total: 0,
      clothId: "",
    });
  };
  render() {
    return (
      <div className="text-general">
        <Spin spinning={this.state.loading} tip="Loading">
          <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 22 }}
            layout="vertical"
            onFinish={this.onUpdate}
            ref={this.formRef}
          >
            <Row gutter={[16, 8]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
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
                    placeholder="Ingrese el Valor del Trabajo"
                    value={this.state.value_work || ""}
                    max={100000}
                    onChange={this.onChange("value_work")}
                    style={{ width: "100%" }}
                    disabled={this.state.disable}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
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
                    placeholder="Ingrese el Valor de la Tela"
                    value={this.state.value_cloth || ""}
                    max={100000}
                    onChange={this.onChange("value_cloth")}
                    style={{ width: "100%" }}
                    disabled={this.state.disable}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
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
                    placeholder="Ingrese el Valor de los Botones"
                    value={this.state.value_buttons || ""}
                    max={100000}
                    onChange={this.onChange("value_buttons")}
                    style={{ width: "100%" }}
                    disabled={this.state.disable}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
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
                    placeholder="Ingrese el Valor de los Cuellos"
                    value={this.state.value_necks || ""}
                    max={100000}
                    onChange={this.onChange("value_necks")}
                    style={{ width: "100%" }}
                    disabled={this.state.disable}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                <Form.Item
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
                    placeholder="Ingrese el Valor de los Hilos"
                    value={this.state.value_threads || ""}
                    max={100000}
                    onChange={this.onChange("value_threads")}
                    style={{ width: "100%" }}
                    disabled={this.state.disable}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                <Form.Item
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
                    placeholder="Ingrese el Valor del Bordado"
                    value={this.state.value_embroidery || ""}
                    max={100000}
                    onChange={this.onChange("value_embroidery")}
                    style={{ width: "100%" }}
                    disabled={this.state.disable}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                <Form.Item
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
                    placeholder="Ingrese el Valor del Estampado"
                    value={this.state.value_prints || ""}
                    max={100000}
                    onChange={this.onChange("value_prints")}
                    style={{ width: "100%" }}
                    disabled={this.state.disable}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Total"
              rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                placeholder="Ingrese el Valor de la Tela"
                value={this.state.total || ""}
                max={100000}
                style={{ width: "100%" }}
                disabled={true}
              />
            </Form.Item>
            <div>{this.props.children}</div>
            <Button
              id="btn-submit"
              htmlType="submit"
              style={{ color: "black" }}
              disabled={this.state.disable}
            >
              Actualizar
            </Button>
          </Form>
        </Spin>
      </div>
    );
  }
}
