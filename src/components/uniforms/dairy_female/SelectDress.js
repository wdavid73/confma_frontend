import React from "react";
import { Form, List, Row, Col, Card, Radio, Empty } from "antd";
import Description from "../DescriptionShirtAndPants";
import empty from "../../../assets/box.png";

export default class SelectDress extends React.Component {
  state = {
    dress_id: "",
  };

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div>
        {this.props.dress.length === 0 ? (
          <Empty
            image={empty}
            imageStyle={{
              height: 60,
            }}
            description={<span>No hay Vestidos Registradas.</span>}
          ></Empty>
        ) : (
          <Form.Item name="dress">
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
              dataSource={this.props.dress}
              renderItem={(dress) => (
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
                        name="dress_id"
                      >
                        <Radio.Group
                          name="dress_id"
                          onChange={this.onChange}
                          //value={this.state.dress_id}
                          rules={[{ required: true }]}
                        >
                          <Radio value={dress.id}>Vestido {dress.ref}</Radio>
                        </Radio.Group>
                      </Form.Item>,
                    ]}
                  >
                    <Row gutter={[8, 16]}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                        <img
                          src={dress.image}
                          className="card-img-top"
                          alt="dress of uniform female"
                          style={{ width: "100%", margin: "0 auto" }}
                        />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                        <div>
                          <Description item={dress} img={false} />
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
