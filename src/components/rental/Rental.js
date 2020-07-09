import React from "react";
import { message, Spin, ConfigProvider, Empty } from "antd";
import AddRentalForm from "./AddRental/AddRentalForm";
import ListClients from "./AddRental/ListClients";
import SelectCloth from "./AddRental/SelectCloth";
import {
  getClients,
  getClothWithOutRental,
  createRental,
} from "./js/RentalFunctions";
import { customRenderEmpty } from "../common/customRenderEmpty";

export default class Rental extends React.Component {
  state = {
    cloths: [],
    clients: [],
    loading: false,
    client_id: "",
    cloth_id: "",
    disable: false,
  };

  componentDidMount() {
    this.getAll();
    this.showSpin();
  }

  formRef = React.createRef();

  getAll = () => {
    getClients().then((data) => {
      this.setState({
        clients: [...data.clients],
      });
    });

    getClothWithOutRental().then((data) => {
      this.setState({
        cloths: [...data.response],
      });
    });
  };

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 6000);
  };

  handleChange = (value) => {
    this.setState({
      client_id: value,
    });
  };

  handleSelectCloth = (value) => {
    this.setState({
      cloth_id: value,
    });
  };

  handleSubmit = (formState) => {
    this.showSpin();
    message
      .loading({
        content: "Registro en Proceso",
        onClose: createRental(
          formState,
          this.state.cloth_id,
          this.state.client_id
        ),
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
      <AddRentalForm onSubmit={this.handleSubmit} disable={this.state.disable}>
        <ConfigProvider renderEmpty={customRenderEmpty}>
          <div className="config-provider">
            <ListClients
              onChange={this.handleChange}
              clients={this.state.clients}
              disable={this.state.disable}
            />
          </div>
        </ConfigProvider>
        <div className="mb-2">
          <Spin spinning={this.state.loading} tip="Loading...">
            {this.state.cloths.length === 0 ? (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    No hay Prendas Registrar. <br />
                    si los desea puede registrar una en el apartado de{" "}
                    <a href="/cloth">Prendas</a>
                  </span>
                }
              ></Empty>
            ) : (
              <SelectCloth
                cloths={this.state.cloths}
                onChange={this.handleSelectCloth}
              />
            )}
          </Spin>
        </div>
      </AddRentalForm>
    );
  }
}
