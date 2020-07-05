import React from "react";
import { Modal, Button } from "antd";
import "../../css/basic.css";

export default class QuotationClient extends React.Component {
  render() {
    return (
      <div>
        <Modal
          title="Cotizacion - Cliente"
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
      </div>
    );
  }
}
