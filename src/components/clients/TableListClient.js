import React from "react";
import DeleteClient from "./DeleteClient";
import { Table, Empty, Button, Row, Col, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default class TableListClient extends React.Component {
  render() {
    return (
      <div>
        {this.props.clients.length <= 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={<span>No hay Clientes Registrados</span>}
          ></Empty>
        ) : (
          <Table
            dataSource={this.props.clients}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 460 }}
          >
            <Table.ColumnGroup title="Nombre Completo">
              <Table.Column title="Nombre/s" dataIndex="name" key="name" />
              <Table.Column
                title="Apellido/s"
                dataIndex="last_name"
                key="last_name"
              />
            </Table.ColumnGroup>
            <Table.Column title="Direcion" dataIndex="address" key="address" />
            <Table.Column title="Telefono" dataIndex="phone" key="phone" />
            <Table.Column
              title="Celular"
              dataIndex="cellphone"
              key="cellphone"
            />
            <Table.Column
              title="Acciones"
              key="action"
              render={(client, index) => (
                <Row key={index}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <Tooltip title="Editar Cliente">
                      <Button
                        type="link"
                        id="btn-form-icon-link"
                        htmlType="submit"
                        onClick={() => this.props.onSelectClient(client.id)}
                      >
                        <EditOutlined style={{ fontSize: "24px" }} />
                      </Button>
                    </Tooltip>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <Tooltip title="Eliminar Cliente" placement="rightTop">
                      <Button type="link" id="btn-delete-icon-link">
                        <DeleteClient
                          ClientId={client.id}
                          confirm={this.props.handleDelete}
                        />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              )}
            />
          </Table>
        )}
      </div>
    );
  }
}
