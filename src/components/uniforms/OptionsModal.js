import React from "react";
import { Modal, Button } from "antd";

export default class OptionsModal extends React.Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        width={"50%"}
        footer={[
          <Button key="back" onClick={this.props.onCancel}>
            Back
          </Button>,
        ]}
      >
        {this.props.children}
      </Modal>
    );
  }
}
