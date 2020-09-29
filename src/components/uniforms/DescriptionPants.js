import React from "react";
import { Descriptions } from "antd";

export default class DescriptionPants extends React.Component {
  description_pants = () => {
    return (
      <div>
        <Descriptions size="small" bordered>
          <Descriptions.Item label="Ref">
            {this.props.pants.ref}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Size">
            {this.props.pants.size}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Price">
            $ {this.props.pants.price}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.description_pants()}</React.Fragment>;
  }
}
