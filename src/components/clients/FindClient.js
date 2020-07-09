import React from "react";
import { Select, Spin, Row, Col, ConfigProvider } from "antd";
import DetailsClient from "./DetailsClient";
import ListDetailsRental from "./ListDetailsRental";
import ListDetailsQuotation from "./ListDetailsQuotation";
import { getClients, findClient } from "./js/ClientFuncions";
import { customRenderEmpty } from "../common/customRenderEmpty";
import "../../css/basic.css";
const { Option } = Select;

export default class FindClient extends React.Component {
  state = {
    client_select: {},
    clients: [],
    quotations: [],
    rentals: [],
    loading: false,
  };

  componentDidMount() {
    this.getAllClient();
    this.showSpin();
  }

  getAllClient = () => {
    getClients().then((data) => {
      this.setState({
        clients: [...data.clients],
      });
    });
  };

  showSpin = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  onChange = (value) => {
    findClient(value).then((data) => {
      this.setState({
        rentals: [...data.rental],
        quotations: [...data.quotation],
        client_select: data.client,
      });
    });
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
            <Spin spinning={this.state.loading} tip="loading...">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a Client"
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
                {this.state.clients.map((client, index) => (
                  <Option value={client.id}>
                    {client.name} {client.last_name} - {client.address} -{" "}
                    {client.cellphone} - {client.phone}
                  </Option>
                ))}
              </Select>
            </Spin>
          </div>
        </ConfigProvider>
        {Object.keys(this.state.client_select).length === 0 ? (
          ""
        ) : (
          <DetailsClient client={this.state.client_select}>
            <Spin spinning={this.state.loading} tip="Loading...">
              <Row grid={{ gutter: 16 }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <ListDetailsQuotation quotations={this.state.quotations} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <ListDetailsRental rentals={this.state.rentals} />
                </Col>
              </Row>
            </Spin>
          </DetailsClient>
        )}
      </div>
    );
  }
}
