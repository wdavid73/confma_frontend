import React from "react";
import { message, Spin } from "antd";
import AddRentalForm from "./AddRentalForm";
import ListClients from "./ListClients";
import SelectCloth from "./SelectCloth";
import {
  getClients,
  getClothWithOutRental,
  createRental,
} from "./js/RentalFunctions";

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
        <ListClients
          onChange={this.handleChange}
          clients={this.state.clients}
          disable={this.state.disable}
        />

        <Spin spinning={this.state.loading} tip="Loading...">
          <SelectCloth
            cloths={this.state.cloths}
            onChange={this.handleSelectCloth}
          />
        </Spin>
      </AddRentalForm>
    );
  }
}
