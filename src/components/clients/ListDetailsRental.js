import React from "react";
import { List, Card, Row, Col, Descriptions } from "antd";
import DescriptionRental from "../rental/Descriptions/DescriptionRental";

export default class ListDetailsRental extends React.Component {
  render() {
    return (
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1,
        }}
        pagination={{
          pageSize: 3,
        }}
        dataSource={this.props.rentals}
        renderItem={(rental) => (
          <List.Item>
            <Card className="m-2">
              <Row>
                <Col xl={8}>
                  <img
                    src={rental.cloth.image}
                    alt={rental.cloth.name}
                    width={"100%"}
                    id="image"
                  />
                </Col>
                <Col span={16}>
                  <div className="m-3">
                    <DescriptionRental rental={rental} />
                  </div>
                  <div>
                    <Descriptions
                      title="Cloth Information"
                      column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
                    >
                      <Descriptions.Item label="name">
                        {rental.cloth.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="color">
                        {rental.cloth.color}
                      </Descriptions.Item>
                      <Descriptions.Item label="size">
                        {rental.cloth.size}
                      </Descriptions.Item>
                      <Descriptions.Item label="fashion">
                        {rental.cloth.fashion}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Col>
              </Row>
              <Card.Meta
                title={"Rental #" + rental.id}
                description="www.confeccionesmaribel.com"
              />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}
