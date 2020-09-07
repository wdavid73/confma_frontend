import React from "react";
import { Form, Row, Col, Card, Radio } from "antd";
import DescriptionCloth from "../rental/Descriptions/DescriptionCloth";

export default class OneCloth extends React.Component {
  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <Card
        hoverable
        actions={[
          <Form.Item
            rules={[
              {
                required: true,
                message: "Porfavor Seleccione una Prenda",
              },
            ]}
            name="cloth_id"
          >
            <Radio.Group
              name="cloth_id"
              onChange={this.onChange}
              //value={this.state.cloth_id}
              rules={[{ required: true }]}
            >
              <Radio value={this.props.cloth.id}>{this.props.cloth.name}</Radio>
            </Radio.Group>
          </Form.Item>,
        ]}
      >
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <img
              src={this.props.cloth.image}
              className="card-img-top"
              alt="moda de referencia"
              style={{ width: "50%" }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <div>
              <DescriptionCloth cloth={this.props.cloth} />
            </div>
          </Col>
        </Row>
        <Card.Meta className="mt-2" description="www.confeccionesmaribel.com" />
      </Card>
    );
  }
}
