import React from "react";
import { Drawer } from "antd";

export default class DrawerDetails extends React.Component {
  render() {
    return (
      <div>
        <Drawer
          title={this.props.title}
          placement="right"
          onClose={this.props.onClose}
          visible={this.props.visible}
          width={"24%"}
        >
          <div>{this.props.children}</div>
        </Drawer>
      </div>
    );
  }
}
