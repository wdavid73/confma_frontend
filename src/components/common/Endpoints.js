import React, { Component } from "react";
import { List, message, Avatar, Spin } from "antd";
import { getEndpoints } from "../js/api/endpoints.js";
import logo from "../../resources/logo_size_invert.jpg";
export default class Endpoints extends Component {
  state = {
    endpoints: [],
    loading: false,
    hasMore: true,
  };
  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    getEndpoints().then((data) => {
      console.log(data);
      this.setState({ endpoints: [...data.endpoints] });
    });
  };

  handleInfiniteOnLoad = () => {
    let { endpoints } = this.state;
    this.setState({
      loading: true,
    });
    if (endpoints.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
  };

  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.endpoints}
          pagination={{
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={logo} />}
                title={<p>{item}</p>}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
