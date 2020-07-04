import React from "react";
import { List, Tabs, Row, Col, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import DescriptionClient from "../Descriptions/DescriptionClient";
import DescriptionCloths from "../Descriptions/DescriptionCloth";
import DescriptionRental from "../Descriptions/DescriptionRental";
export default class DetailsRental extends React.Component {
  render() {
    return (
      <div>
        <List
          size="small"
          grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
          pagination={{ pageSize: 6 }}
          dataSource={this.props.rentals}
          renderItem={(rental) => (
            <List.Item
              key={rental.id}
              actions={[
                <Button
                  id="btn-refund"
                  className="mt-2"
                  size="large"
                  //disable={this.state.editDisable}
                  onClick={() => this.props.refundRental(rental.id)}
                >
                  <RedoOutlined /> Refund Rental
                </Button>,
              ]}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <img
                    src={rental.cloth.image}
                    alt={rental.cloth.name}
                    width={"100%"}
                    id="image"
                    style={{ padding: 10 }}
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <Tabs.TabPane tab="Rental" key="1">
                      <DescriptionRental rental={rental} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Client" key="2">
                      <DescriptionClient client={rental.client} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Cloth" key="3">
                      <DescriptionCloths cloth={rental.cloth} />
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
