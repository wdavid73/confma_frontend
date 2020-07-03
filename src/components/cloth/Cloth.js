import React from "react";
import { Drawer, Button, message, Empty, Spin, Row } from "antd";
import ListCloth from "./ListCloth";
import AddClothForm from "./AddClothForm";
import { FileAddOutlined } from "@ant-design/icons";
import { getCloth, createCloth } from "./js/ClothFuntions";

message.config({
  top: 20,
  duration: 2.5,
  maxCount: 3,
  rtl: true,
});

export default class Cloth extends React.Component {
  constructor() {
    super();
    this.state = {
      cloths: [],
      loading: false,
      minValue: 0,
      maxValue: 1,
      visible: false,
      disable: false,
    };
  }
  numEachPage = 4;

  componentDidMount() {
    this.getAll();
    this.showSpin();
  }

  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * this.numEachPage,
      maxValue: value * this.numEachPage,
    });
  };

  getAll = () => {
    getCloth().then((data) => {
      this.setState({
        cloths: [...data.cloths],
      });
    });
  };

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 5000);
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (formState) => {
    this.onClose();
    this.showSpin();
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createCloth(formState),
      })
      .then(() =>
        message.success({
          content: "Registro Completado",
          onClose: this.getAll(),
        })
      );
  };

  render() {
    return (
      <div>
        <Row>
          <Button
            type="link"
            id="btn-form-icon-link"
            onClick={this.showDrawer}
            disabled={this.state.disable}
            style={{ marginBottom: "20px" }}
          >
            <FileAddOutlined style={{ fontSize: "24px" }} />
            Agregar Prenda
          </Button>
        </Row>
        <Row>
          <Drawer
            title="Registar Prenda"
            width={"50%"}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div style={{ textAlign: "right" }}>
                <Button
                  id="btn-delete"
                  onClick={this.onClose}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>
              </div>
            }
          >
            <AddClothForm onSubmit={this.handleSubmit} />
          </Drawer>
        </Row>
        {this.state.cloths.length <= 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={<span>No hay Prendas Registradas</span>}
          ></Empty>
        ) : (
          <Spin spinning={this.state.loading} tip="Loading..">
            <ListCloth cloths={this.state.cloths} />
          </Spin>
        )}
      </div>
    );
  }
}
