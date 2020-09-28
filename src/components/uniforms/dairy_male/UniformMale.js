import React, { Component } from "react";
import { Card, Col, Row, Button, PageHeader } from "antd";

import "../css/dairy-male.css";
import "../../../css/basic.css";

import pants from "../../../assets/pants_normal.png";
import shirt_male from "../../../assets/shirt_uniform.png";
import checklist from "../../../assets/checklist.png";
import find from "../../../assets/search.png";

export default class UniformMale extends Component {
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Uniformes de diario Masculinos"
        />
        <div class="container" style={{ marginTop: "6%" }}>
          <div class="row align-items-center">
            <div class="col-md-12">
              <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered={false}
                    style={{ width: 300, height: 200, margin: "0 auto" }}
                  >
                    <img src={shirt_male} alt="shirt_male" id="img_shirt" />
                    <Card.Meta
                      description={
                        <Button id="btn-submit" size="large">
                          <p
                            style={{ color: "black" }}
                            className="text-general"
                          >
                            Registrar Camisa
                          </p>
                        </Button>
                      }
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered={false}
                    style={{ width: 300, height: 200, margin: "0 auto" }}
                  >
                    <img src={pants} alt="pants_male" id="img_pants" />
                    <Card.Meta
                      description={
                        <Button id="btn-submit" size="large">
                          <p
                            style={{ color: "black" }}
                            className="text-general"
                          >
                            Registrar Pantalon
                          </p>
                        </Button>
                      }
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered={false}
                    className="card-dairy-male"
                    style={{ width: 300, height: 200, margin: "0 auto" }}
                  >
                    <img
                      src={checklist}
                      alt="img_list_uniforms"
                      id="img_list_uniforms"
                    />
                    <Card.Meta
                      description={
                        <Button id="btn-form" size="large">
                          <p
                            style={{ color: "black", fontSize: "10px" }}
                            className="text-general"
                          >
                            Lista de Uniformes Confeccionados
                          </p>
                        </Button>
                      }
                    />
                  </Card>
                </Col>

                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Card
                    bordered={false}
                    className="card-dairy-male"
                    style={{ width: 300, height: 200, margin: "0 auto" }}
                  >
                    <img
                      src={find}
                      alt="img_find_college"
                      id="img_find_college"
                    />
                    <Card.Meta
                      description={
                        <Button id="btn-form" size="large">
                          <p
                            style={{ color: "black" }}
                            className="text-general"
                          >
                            Buscar por Colegio
                          </p>
                        </Button>
                      }
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
