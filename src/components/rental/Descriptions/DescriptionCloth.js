import React from "react";
import { Descriptions } from "antd";

export default class DescriptionCloths extends React.Component {
  description_cloth = () => {
    return (
      <div>
        <Descriptions size="small" bordered>
          <Descriptions.Item label="Name">
            {this.props.cloth.name}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Color">
            {this.props.cloth.color}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Size">
            {this.props.cloth.size}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Fashion">
            {this.props.cloth.fashion}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.description_cloth()}</React.Fragment>;
  }
}
