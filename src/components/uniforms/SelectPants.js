import React from "react";
import { Form, List, Row, Col, Card, Radio, Empty } from "antd";
import Description from "./DescriptionShirtAndPants.js";
import empty from "../../assets/box.png";

export default class Selectpants extends React.Component {
  state = {
    pants_id: "",
  };

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div>
        {this.props.pants.length === 0 ? (
          <Empty
            image={empty}
            imageStyle={{
              height: 60,
            }}
            description={<span>No hay Pantalones Registradas.</span>}
          ></Empty>
        ) : (
          <Form.Item name="pants">
            <List
              grid={{
                gutter: 8,
                xs: 2,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 4,
              }}
              pagination={{
                pageSize: 4,
              }}
              dataSource={this.props.pants}
              renderItem={(pants) => (
                <List.Item>
                  <Card
                    hoverable
                    bordered
                    actions={[
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Porfavor Seleccione una Camisa",
                          },
                        ]}
                        name="pants_id"
                      >
                        <Radio.Group
                          name="pants_id"
                          onChange={this.onChange}
                          //value={this.state.pants_id}
                          rules={[{ required: true }]}
                        >
                          <Radio value={pants.id}>Pantalon {pants.ref}</Radio>
                        </Radio.Group>
                      </Form.Item>,
                    ]}
                  >
                    <Row gutter={[8, 16]}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                        <img
                          src={pants.image}
                          className="card-img-top"
                          alt="pants of uniform male"
                          style={{ width: "100%", margin: "0 auto" }}
                        />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                        <div>
                          <Description item={pants} img={false} />
                        </div>
                      </Col>
                    </Row>
                    <Card.Meta description="www.confeccionesmaribel.com" />
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
