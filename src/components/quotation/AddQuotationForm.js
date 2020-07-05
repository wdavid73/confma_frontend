import React from "react";
import { Row, Col, Form, InputNumber, Button } from "antd";
export default class AddQuotationForm extends React.Component {
  state = {
    value_work: 0,
    value_cloth: 0,
    value_threads: 0,
    value_buttons: 0,
    value_necks: 0,
    value_embroidery: 0,
    value_prints: 0,
  };

  onChange = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  formRef = React.createRef();

  onSubmit = () => {
    this.props.onSubmit(this.state);
    this.formRef.current.resetFields();
    this.setState({
      value_work: 0,
      value_cloth: 0,
      value_threads: 0,
      value_buttons: 0,
      value_necks: 0,
      value_embroidery: 0,
      value_prints: 0,
    });
  };
  render() {
    return (
      <div>
        <p> ADD </p>
        <Form
          //labelCol={{ span: 12 }}
          //wrapperCol={{ span: 22 }}
          layout="vertical"
          onFinish={this.onSubmit}
          ref={this.formRef}
        >
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Valor del Trabajo"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Valor de la Tela"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
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
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Valor de los Botones"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Valor de los Cuellos"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
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
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <Form.Item
                label="Valor de los Hilos"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <Form.Item
                label="Valor del Bordado"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <Form.Item
                label="Valor del Estampado"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
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
                />
              </Form.Item>
            </Col>
          </Row>
          <div>{this.props.children}</div>
          <Button id="btn-submit" htmlType="submit">
            Registrar
          </Button>
        </Form>
      </div>
    );
  }
}
