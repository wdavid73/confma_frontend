import React from "react";
import { List, Row, Card, Col, Descriptions } from "antd";
import DescriptionQuotation from "../quotation/DescriptionQuotation";

export default class ListDetailsQuotation extends React.Component {
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
        dataSource={this.props.quotations}
        renderItem={(quotation) => (
          <List.Item>
            <Card>
              <Row className="mb-2" grid={{ gutter: 16 }}>
                <Col xl={4}>
                  <img
                    src={quotation.cloth.image}
                    alt={quotation.cloth.name}
                    width={"100%"}
                    id="image"
                  />
                </Col>
                <Col xl={20}>
                  <DescriptionQuotation quotation={quotation} />
                  <div>
                    <Descriptions
                      title="Cloth Information"
                      column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
                    >
                      <Descriptions.Item label="name">
                        {quotation.cloth.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="color">
                        {quotation.cloth.color}
                      </Descriptions.Item>
                      <Descriptions.Item label="size">
                        {quotation.cloth.size}
                      </Descriptions.Item>
                      <Descriptions.Item label="fashion">
                        {quotation.cloth.fashion}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                  <Card.Meta
                    title={"Cotizacion #" + quotation.id}
                    description="www.confeccionesmaribel.com"
                  />
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}
