import React from "react";
import { Descriptions } from "antd";

export default class DescriptionClients extends React.Component {
  description_client = () => {
    return (
      <div>
        <Descriptions size="small" bordered>
          <Descriptions.Item label="Full Name">
            {this.props.client.name} {this.props.client.last_name}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Telephone">
            {this.props.client.phone}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Cellphone">
            {this.props.client.cellphone}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Address">
            {this.props.client.address}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.description_client()}</React.Fragment>;
  }
}
