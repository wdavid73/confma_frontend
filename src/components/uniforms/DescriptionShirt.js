import React from "react";
import { Descriptions } from "antd";

export default class DescriptionShirt extends React.Component {
  description_shirt = () => {
    return (
      <div>
        <Descriptions size="small" bordered>
          <Descriptions.Item label="Ref">
            {this.props.shirt.ref}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Size">
            {this.props.shirt.size}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Price">
            $ {this.props.shirt.price}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.description_shirt()}</React.Fragment>;
  }
}
