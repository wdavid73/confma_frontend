import React from "react";
import { Row, Col, Card, List, Spin } from "antd";
import SelectInstitution from "./SelectInstitution";
import Description from "./DescriptionShirtAndPants";
import { getInstitutions } from "./js/gets";
import { findByCollege, findByCollegeFemale } from "./js/extras";

export default class FindCollege extends React.Component {
  state = {
    loading: false,
    uniforms_male: [],
    uniforms_female: [],
  };

  componentDidMount() {
    this.getAllInstitutions();
    this.showSpin();
  }

  showSpin = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  getAllInstitutions = () => {
    getInstitutions().then((data) => {
      this.setState({ institutions: [...data.institutions] });
    });
  };

  onChange = (value) => {
    if (this.props.gender === "male") {
      findByCollege(value).then((data) => {
        this.setState({ uniforms_male: [...data.uniform_male] });
      });
    }
    if (this.props.gender === "female") {
      findByCollegeFemale(value).then((data) => {
        this.setState({ uniforms_female: [...data.uniform_female] });
      });
    }

    this.showSpin();
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = (val) => {
    console.log("search:", val);
  };

  render() {
    return (
      <div className="text-general">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <SelectInstitution onChange={this.onChange} />
          </Col>
        </Row>
        {Object.keys(this.state.uniforms_male).length === 0 ? (
          ""
        ) : (
          <Spin spinning={this.state.loading} tip="Loading...">
            <div>
              <List
                pagination={{
                  pageSize: 4,
                }}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 2,
                  xxl: 2,
                }}
                dataSource={this.state.uniforms_male}
                renderItem={(uniform) => (
                  <List.Item>
                    <Card title={`Uniform ${uniform.id}`}>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                          <Description item={uniform.shirt} img={true} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                          <Description item={uniform.pants} img={true} />
                        </Col>
                      </Row>
                      <div clasName="text-center">
                        VALOR TOTAl : $ {uniform.price}
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </Spin>
        )}
        {Object.keys(this.state.uniforms_female).length === 0 ? (
          ""
        ) : (
          <Spin spinning={this.state.loading} tip="Loading...">
            <div>
              <List
                pagination={{
                  pageSize: 4,
                }}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 2,
                  xxl: 2,
                }}
                dataSource={this.state.uniforms_female}
                renderItem={(uniform) => (
                  <List.Item>
                    <Card title={`Uniform ${uniform.id}`}>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                          <Description item={uniform.shirt} img={true} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                          <Description item={uniform.dress} img={true} />
                        </Col>
                      </Row>
                      <div clasName="text-center">
                        VALOR TOTAl : $ {uniform.price}
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </Spin>
        )}
      </div>
    );
  }
}
