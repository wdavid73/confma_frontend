import React from "react";
import { Descriptions } from "antd";
import "../../css/basic.css";

export default class Description extends React.Component {
  description = () => {
    return (
      <div className="text-general">
        {this.props.img ? (
          <div>
            <img
              src={this.props.item.image}
              alt="item ref"
              style={{ width: "100%" }}
              className="mb-2"
            />
          </div>
        ) : (
          ""
        )}
        <Descriptions size="small" bordered>
          <Descriptions.Item label="Ref">
            {this.props.item.ref}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Size">
            {this.props.item.size}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Price">
            $ {this.props.item.price}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.description()}</React.Fragment>;
  }
}
