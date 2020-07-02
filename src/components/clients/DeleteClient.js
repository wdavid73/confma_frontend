import React from "react";
import { Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default class DeleteClient extends React.Component {
  confirm = (e) => {
    this.props.confirm(this.props.ClientId);
  };

  cancel = (e) => {
    message.error({ content: "Accion Cancelada" });
  };
  render() {
    return (
      <Popconfirm
        title="Esta seguro de eliminar este cliente?"
        onConfirm={this.confirm}
        onCancel={this.cancel}
        okText="Si"
        cancelText="No"
      >
        <a href>
          <DeleteOutlined style={{ fontSize: "24px" }} />
        </a>
      </Popconfirm>
    );
  }
}
