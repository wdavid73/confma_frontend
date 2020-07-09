import React from "react";
import { Row, Col, Table, Button, Tooltip } from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import DeleteQuotation from "../quotation/DeleteQuotation";
export default class TableQuotation extends React.Component {
  render() {
    return (
      <div className="mt-3">
        <Table
          dataSource={this.props.quotations}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 500 }}
          size="small"
          bordered
        >
          <Table.ColumnGroup title="Cotizacion">
            <Table.Column
              title="Index"
              dataIndex="id"
              responsive={"md"}
              key="id"
              render={(id) => <p>{id}</p>}
            />

            <Table.Column
              title="Total"
              dataIndex="total"
              key="total"
              render={(total) => <p>${total}</p>}
            />
          </Table.ColumnGroup>
          <Table.ColumnGroup title="Prenda" key="cloth">
            <Table.Column
              title="Prenda"
              dataIndex="cloth"
              key="cloth_name"
              render={(cloth) => <p>{cloth.name}</p>}
            />
            <Table.Column
              title="Color"
              dataIndex="cloth"
              key="cloth_color"
              render={(cloth) => <p>{cloth.color}</p>}
            />
            <Table.Column
              title="Talla"
              dataIndex="cloth"
              key="cloth_size"
              render={(cloth) => <p>{cloth.size}</p>}
            />
            <Table.Column
              title="Moda"
              dataIndex="cloth"
              key="cloth_fashion"
              render={(cloth) => <p>{cloth.fashion}</p>}
            />
          </Table.ColumnGroup>
          <Table.Column
            title="Acciones"
            key="action"
            render={(quotation) => (
              <Row>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <Button
                    type="link"
                    id="btn-edit-icon-link"
                    htmlType="submit"
                    onClick={() => this.props.onEdit(quotation.id)}
                  >
                    <EditOutlined style={{ fontSize: "24px" }} />
                  </Button>

                  <Col xs={24} sm={24} md={24} lg={8} xl={8}></Col>
                  <Tooltip title="Eliminar Cliente" placement="rightTop">
                    <Button
                      type="link"
                      id="btn-delete-icon-link"
                      //onClick={() => this.props.onDelete(quotation.id)}
                    >
                      <DeleteQuotation
                        quotationId={quotation.id}
                        confirm={this.props.onDelete}
                      />
                    </Button>
                  </Tooltip>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <Button
                    type="link"
                    id="btn-submit-icon-link"
                    htmlType="submit"
                    onClick={() => this.props.onAddClient(quotation.id)}
                  >
                    <UserAddOutlined style={{ fontSize: "24px" }} />
                  </Button>
                </Col>
              </Row>
            )}
          />
        </Table>
      </div>
    );
  }
}
