import React from "react";
import { Form, Select } from "antd";
export default class ListClients extends React.Component {
  handleChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <div>
        <Form.Item
          label="Clientes"
          name="client"
          rules={[
            { required: true, message: "Porfavor Seleccione un Cliente" },
          ]}
        >
          <Select
            showSearch
            placeholder="Seleccione un Cliente"
            name="client_id"
            optionFilterProp="children"
            onChange={this.handleChange}
            disabled={this.props.disable}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            size="large"
          >
            {this.props.clients.map((client, index) => (
              <Select.Option value={client.id} key={index}>
                {client.name} {client.last_name} - {client.address}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    );
  }
}
