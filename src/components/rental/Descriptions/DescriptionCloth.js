import React from "react";
import { Descriptions } from "antd";

export default class DescriptionCloths extends React.Component {
  description_cloth = () => {
    return (
      <div>
        <Descriptions size="small">
          <Descriptions.Item label="Ref">
            {this.props.cloth.name}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small">
          <Descriptions.Item label="Color">
            {this.props.cloth.color}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small">
          <Descriptions.Item label="Talla">
            {this.props.cloth.size}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small">
          <Descriptions.Item label="Moda">
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
