import React from "react";
import { Drawer, Button } from "antd";

export default class DrawerQuotation extends React.Component {
  render() {
    return (
      <Drawer
        title={this.props.title}
        width={"75%"}
        onClose={this.props.onClose}
        visible={this.props.visible}
        className="text-general"
        footer={
          <div style={{ textAlign: "right" }}>
            <Button
              id="btn-delete"
              onClick={this.props.onClose}
              style={{ marginRight: 8 }}
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        }
      >
        <div>{this.props.children}</div>
      </Drawer>
    );
  }
}
