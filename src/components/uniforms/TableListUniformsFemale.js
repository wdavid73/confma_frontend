import React from "react";
import { Table, Empty, Spin, Button } from "antd";
import OptionsModal from "./OptionsModal";
import DrawerDetails from "./DrawerDetails";
import Description from "./DescriptionShirtAndPants";
import "../../css/basic.css";
import empty from "../../assets/box.png";

export default class ListUniforms extends React.Component {
  state = {
    loading: false,
    visible: false,
    visibleDrawer: false,
    shirts: [],
    pants: [],
    dress: [],
    obj: null,
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

  /* getComplements = () => {
    if (this.props.male === true) {
      getShirtsMale().then((data) => {
        this.setState({ shirts: [...data.shirts_male] });
      });
      getPantsMale().then((data) => {
        this.setState({ pants: [...data.pants_male] });
      });
    } else {
      getShirtsFemale().then((data) => {
        this.setState({ shirts: [...data.shirts_female] });
      });
      getDress().then((data) => {
        this.setState({ dress: [...data.dress] });
      });
    }
  }; */

  showModal = () => {
    this.setState({ visible: true });
    /* this.getComplements(); */
  };

  handleClose = () => {
    this.setState({ visible: false, pants: [], shirt: [], dress: [] });
  };

  /* handleSubmit = (formState) => {
    this.props.onSubmit(formState);
    this.handleClose();
  }; */

  onCloseDrawer = () => {
    this.setState({ visibleDrawer: false });
  };

  render() {
    return (
      <div className="text-general">
        <Button className="mb-2" id="btn-form" onClick={() => this.showModal()}>
          Registrar Uniforme
        </Button>
        <Spin spinning={this.state.loading} tip="Loading...">
          {this.props.uniforms.length <= 0 ? (
            <Empty
              image={empty}
              imageStyle={{
                height: 60,
              }}
              description={<span>No hay Uniformes Registrados</span>}
            />
          ) : (
            <Table
              dataSource={this.props.uniforms}
              pagination={{ pageSize: 6 }}
              scroll={{ y: 460 }}
            >
              <Table.Column
                title="Nombre del Colegio"
                render={(item) => item.institution.name}
                key="institution_name"
              />
              <Table.Column
                title="Precio Total"
                render={(item) => (
                  <>
                    <span style={{ color: "green" }}>$</span> {item.price}
                  </>
                )}
                key="price"
              />
              <Table.Column
                title="Camisa"
                render={(item) => (
                  <Button
                    id="btn-details"
                    onClick={() =>
                      this.setState({
                        obj: item.shirt,
                        visibleDrawer: true,
                      })
                    }
                  >
                    {" "}
                    Ver Detalles{" "}
                  </Button>
                )}
                key="shirt"
              />

              <Table.Column
                title="Vestidos"
                render={(item) => (
                  <Button
                    id="btn-details"
                    onClick={() => {
                      this.setState({
                        obj: item.dress,
                        visibleDrawer: true,
                      });
                    }}
                  >
                    Ver Detalles
                  </Button>
                )}
                key="pants"
              />
            </Table>
          )}
        </Spin>
        <OptionsModal
          visible={this.state.visible}
          title={this.props.title}
          onCancel={this.handleClose}
          width="80%"
        >
          {this.props.children}
        </OptionsModal>

        <DrawerDetails
          title="Detalles"
          onClose={this.onCloseDrawer}
          visible={this.state.visibleDrawer}
        >
          <div>
            <Description item={this.state.obj} img={true} />
          </div>
        </DrawerDetails>
      </div>
    );
  }
}
