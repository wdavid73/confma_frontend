import React from "react";
import { Link } from "react-router-dom";
import { List, Card, Row, Col, Descriptions, Empty } from "antd";
import DescriptionRental from "../rental/Descriptions/DescriptionRental";

export default class ListDetailsRental extends React.Component {
  render() {
    return (
      <div>
        {this.props.rentals.length === 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                No se an registrado Alquileres con este cliente.
                <br />
                si desea registrar alguno porfavor dirijase al apartado de{" "}
                <Link to="/rental">
                  <span> Alquileres </span>
                </Link>
              </span>
            }
          ></Empty>
        ) : (
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
              pageSize: 2,
            }}
            dataSource={this.props.rentals}
            renderItem={(rental) => (
              <List.Item>
                {this.props.totalQuotation.map((quotation_total, index) => (
                  <div>
                    {rental.cloth.id === quotation_total.cloth.id ? (
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
                                column={{
                                  xxl: 4,
                                  xl: 3,
                                  lg: 2,
                                  md: 2,
                                  sm: 2,
                                  xs: 1,
                                }}
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
                                <Descriptions.Item label="price">
                                  {quotation_total.total}
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
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}
