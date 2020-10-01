import React from "react";
import { Select, Spin, Row, Col, ConfigProvider } from "antd";
import { customRenderEmpty } from "../../common/customRenderEmpty";
import { getListUniforms, findByCollege } from "../dairy_male/js/CallEndpoints";

export default class FindCollege extends React.Component {
  state = {
    loading: false,
    uniforms: [],
  };

  componentDidMount() {
    this.getAllUniforms();
    this.showSpin();
  }

  showSpin = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  getAllUniforms = () => {
    getListUniforms().then((data) => {
      this.setState({ uniforms: [...data.uniforms_male] });
    });
  };

  onChange = (value) => {
    console.log(value);
    /* findByCollege(value).then((data) => {
      console.log(data);
    }); */
    /* findClient(value).then((data) => {
      this.setState({
        rentals: [...data.rental],
        totalQuotation: [...data.totalQuotations],
        quotations: [...data.quotation],
        client_select: data.client,
      });
    }); */
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
        <ConfigProvider renderEmpty={customRenderEmpty}>
          <div className="config-provider">
            <Spin spinning={this.state.loading} tip="Loading...">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Seleccione un Colegio"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children[0]
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                size="large"
              >
                {this.state.uniforms.map((uniform) => (
                  <Select.Option value={uniform.name_college}>
                    {uniform.name_college}
                  </Select.Option>
                ))}
              </Select>
            </Spin>
          </div>
        </ConfigProvider>
      </div>
    );
  }
}
