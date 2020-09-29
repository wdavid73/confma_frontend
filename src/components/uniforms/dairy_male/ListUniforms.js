import React from "react";
import { Table, Empty, Row, Col, Spin } from "antd";

export default class ListUniforms extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.showSpin();
  }

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 5000);
  };

  render() {
    return (
      <div>
        <Spin spinning={this.state.loading} tip="Loading...">
          {this.props.uniforms.length <= 0 ? (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>No hay Uniformes Registrados</span>}
            />
          ) : (
            <Table
              dataSource={this.props.uniforms}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 460 }}
            >
              <Table.Column
                title="Nombre del Colegio"
                dataIndex="name_college"
                key="name_college"
              />
              <Table.Column
                title="Precio Total"
                dataIndex="price"
                key="price"
              />
              <Table.Column
                title="Camisa"
                render={(item) => "Talla : " + item.pants.size}
                key="shirt"
              />
              <Table.Column
                title="Pantalones"
                render={(item) => "Talla : " + item.pants.size}
                key="pants"
              />
            </Table>
          )}
        </Spin>
      </div>
    );
  }
}
