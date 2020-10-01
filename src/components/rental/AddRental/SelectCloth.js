import React from "react";
import { Link } from "react-router-dom";
import { Form, List, Row, Col, Card, Radio, Empty } from "antd";
import DescriptionCloth from "../Descriptions/DescriptionCloth";
import empty from "../../../assets/box.png";

export default class SelectCloth extends React.Component {
  state = {
    cloth_id: "",
  };

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div>
        {this.props.cloths.length === 0 ? (
          <Empty
            image={empty}
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                No hay Prendas Registrar. <br />
                si los desea puede registrar una en el apartado de{" "}
                <Link to="/cloth">
                  <span> Prendas </span>
                </Link>
              </span>
            }
          ></Empty>
        ) : (
          <Form.Item label="Prendas" name="cloth">
            <List
              grid={{
                gutter: 16,
                xs: 2,
                sm: 2,
                md: 2,
                lg: 2,
              }}
              pagination={{
                pageSize: 2,
              }}
              dataSource={this.props.cloths}
              renderItem={(cloth) => (
                <List.Item>
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
                          <Radio value={cloth.id}>{cloth.name}</Radio>
                        </Radio.Group>
                      </Form.Item>,
                    ]}
                  >
                    <Row gutter={[8, 8]}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        <img
                          src={cloth.image}
                          className="card-img-top"
                          alt="moda de referencia"
                          style={{ width: "50%" }}
                        />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        <div>
                          <DescriptionCloth cloth={cloth} />
                        </div>
                      </Col>
                    </Row>
                    <Card.Meta
                      className="mt-2"
                      description="www.confeccionesmaribel.com"
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Form.Item>
        )}
      </div>
    );
  }
}
