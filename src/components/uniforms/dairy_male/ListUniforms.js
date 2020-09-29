import React from "react";
import { Table, Empty, Spin, Button } from "antd";
import OptionsModal from "../OptionsModal";
import CreateUniformMale from "../dairy_male/CreateUniformMale";
import "../../../css/basic.css";
import { getPantsMale, getShirtsMale } from "../dairy_male/js/CallEndpoints";

export default class ListUniforms extends React.Component {
  state = {
    loading: false,
    visible: false,
    shirts: [],
    pants: [],
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

  getComplements = () => {
    getShirtsMale().then((data) => {
      this.setState({ shirts: [...data.shirts_male] });
    });
    getPantsMale().then((data) => {
      this.setState({ pants: [...data.pants_male] });
    });
  };

  showModal = () => {
    this.setState({ visible: true });
    this.getComplements();
  };

  handleClose = () => {
    this.setState({ visible: false, pants: [], shirt: [] });
  };

  handleSubmit = (formState) => {
    this.props.onSubmit(formState);
  };

  render() {
    return (
      <div>
        <Button className="mb-2" id="btn-form" onClick={() => this.showModal()}>
          Registrar Uniforme
        </Button>
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
        <OptionsModal
          visible={this.state.visible}
          title="Registrar Uniforme Masculino"
          onCancel={this.handleClose}
          width="80%"
        >
          <CreateUniformMale
            onSubmit={this.handleSubmit}
            pants={this.state.pants}
            shirts={this.state.shirts}
          />
        </OptionsModal>
      </div>
    );
  }
}
