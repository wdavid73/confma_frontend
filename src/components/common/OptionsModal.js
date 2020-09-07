import React from "react";
import { Button, Modal } from "antd";
import "../../css/basic.css";

export default class OptionsModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          centered
          onCancel={this.props.onCancel}
          width={"50%"}
          footer={[
            <Button key="back" onClick={this.props.onCancel} id="btn-cancel">
              Cancel
            </Button>,
          ]}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
