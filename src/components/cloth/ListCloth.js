import React, { Component } from "react";
import { List, Card, Row, Col, Descriptions } from "antd";
const { Meta } = Card;
export default class ListCloth extends Component {
  list_cloths = () => {
    return (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={this.props.cloths}
        renderItem={(cloth) => (
          <List.Item>
            <Card hoverable style={{ padding: "-20px" }}>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <img
                    src={cloth.image}
                    className="card-img-top mb-2"
                    alt="moda de referencia"
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <div>
                    <Descriptions
                      title="Detalles de la Prenda"
                      bordered
                      column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                      style={{ width: "105%" }}
                    >
                      <Descriptions.Item label="Talla">
                        {cloth.size}
                      </Descriptions.Item>
                      <Descriptions.Item label="Color">
                        {cloth.color}
                      </Descriptions.Item>
                      <Descriptions.Item label="Moda">
                        {cloth.fashion}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Col>
              </Row>
              <Meta
                title={cloth.name}
                description="www.confeccionesmaribel.com"
              />
            </Card>
          </List.Item>
        )}
      />
    );
  };

  render() {
    return <React.Fragment>{this.list_cloths()}</React.Fragment>;
  }
}
