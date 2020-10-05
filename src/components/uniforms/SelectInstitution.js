import React from "react";
import { Select, ConfigProvider, Spin, Row, Col } from "antd";
import { customRenderEmpty } from "../common/customRenderEmpty";
import { getInstitutions } from "./js/gets";

const { Option } = Select;

export default class ListInstitutions extends React.Component {
  state = {
    institutions: [],
    institution_id: "",
    loading: false,
  };

  componentDidMount() {
    this.showSpin();
    this.getListInstitutions();
  }

  getListInstitutions = () => {
    getInstitutions().then((data) => {
      this.setState({ institutions: [...data.institutions] });
    });
  };

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 5000);
  };

  onChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <ConfigProvider renderEmpty={customRenderEmpty}>
              <div className="config-provider">
                <Spin spinning={this.state.loading} tip="loading...">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Seleccione una Institucion"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                      option.children[0]
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    size="large"
                  >
                    {this.state.institutions.map((institution, index) => (
                      <Option value={institution.id}>
                        {institution.name} - {institution.address} -{" "}
                        {institution.phone}
                      </Option>
                    ))}
                  </Select>
                </Spin>
              </div>
            </ConfigProvider>
          </Col>
        </Row>
      </div>
    );
  }
}
