import React from "react";
import { Descriptions } from "antd";

export default class DescriptionCloths extends React.Component {
  description_rental = () => {
    return (
      <div>
        <Descriptions size="small" bordered>
          <Descriptions.Item label="Date Add">
            {this.props.rental.date_now}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Date Return">
            {this.props.rental.date_return}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Price">
            $ {this.props.rental.price}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.description_rental()}</React.Fragment>;
  }
}
