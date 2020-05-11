import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  Avatar,
  message,
  Skeleton,
  Empty,
  Button,
  Descriptions,
  Card,
} from "antd";
import { getRental, refundRental } from "./js/RentalFunctions";
import { RedoOutlined } from "@ant-design/icons";
import Logo from "../resources/logo_size_invert.jpg";
import { crud_client } from "./common/messages";

export default class Rental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      date_return: "",
      price: "",
      client: "",
      cloth: "",
      ifrental: 0,
      rentals: [],
      visible: false,
      editDisable: false,
      loading: false,
    };
  }

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

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    getRental().then((data) => {
      this.setState({
        date_return: "",
        price: "",
        client: "",
        cloth: "",
        ifrental: 0,
        rentals: [...data.rentals],
      });
    });
  };

  disableButton = () => {
    this.setState({
      editDisable: true,
    });
  };

  RefundRental = (id, e) => {
    e.preventDefault();
    this.disableButton();
    message
      .loading("Devolucion del Alquiler en Proceso..", 2.5)
      .then(refundRental(id))
      .then(() => {
        let data = [...this.state.rentals];
        data.filter((rental, index) => {
          if (rental.id === id) {
            data.splice(index, 1);
          }
          return true;
        });
        this.setState({ rentals: [...data], editDisable: false });
      })
      .then(() => {
        message.success("Devolucion del Alquiler Satisfactoria");
      });
  };

  render() {
    return (
      <div>
        {this.state.rentals.length <= 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={<span>No hay Alquileres Registrados</span>}
          >
            <Link to="/rental" onClick={crud_client}>
              <Button id="btn-form" type="primary">
                Registre un Alquiler Ahora
              </Button>
            </Link>
          </Empty>
        ) : (
          <List
            size="small"
            itemLayout="vertical"
            pagination={{
              pageSize: 3,
            }}
            dataSource={this.state.rentals}
            renderItem={(rental) => (
              <List.Item
                key={rental.id}
                extra={
                  !this.state.loading && (
                    <img
                      width={150}
                      alt={rental.cloth.name}
                      src={rental.cloth.image}
                    />
                  )
                }
                actions={
                  !this.state.loading && [
                    <Button
                      id="btn-refund"
                      disable={this.state.editDisable}
                      onClick={this.RefundRental.bind(this, rental.id)}
                    >
                      <RedoOutlined /> Devolver Alquiler
                    </Button>,
                  ]
                }
              >
                <Skeleton loading={this.state.loading} active avatar>
                  <Card>
                    <List.Item.Meta
                      avatar={<Avatar src={Logo} />}
                      title={
                        <p>
                          Alquiler #{rental.id} - Valor : {rental.price} - Fecha
                          de Devolucion : {rental.date_return}
                        </p>
                      }
                      description={
                        <div>
                          <Descriptions
                            title="Detalles del Cliente"
                            bordered
                            column={{
                              xxl: 3,
                              xl: 3,
                              lg: 3,
                              md: 2,
                              sm: 1,
                              xs: 1,
                            }}
                            size="small"
                          >
                            <Descriptions.Item label="Nombre">
                              {" "}
                              {rental.client.name} {rental.client.last_name}{" "}
                            </Descriptions.Item>
                            <Descriptions.Item label="Telefonos">
                              {" "}
                              {rental.client.phone} / {rental.client.cellphone}{" "}
                            </Descriptions.Item>
                            <Descriptions.Item label="Direccion">
                              {" "}
                              {rental.client.address}{" "}
                            </Descriptions.Item>
                          </Descriptions>
                          <Descriptions
                            title="Detalles de la Prenda"
                            bordered
                            column={{
                              xxl: 4,
                              xl: 4,
                              lg: 4,
                              md: 2,
                              sm: 1,
                              xs: 1,
                            }}
                            size="small"
                          >
                            <Descriptions.Item label="Prenda ">
                              {rental.cloth.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Talla">
                              {rental.cloth.size}
                            </Descriptions.Item>
                            <Descriptions.Item label="Color">
                              {rental.cloth.color}
                            </Descriptions.Item>
                            <Descriptions.Item label="Moda">
                              {rental.cloth.fashion}
                            </Descriptions.Item>
                          </Descriptions>
                        </div>
                      }
                    />
                  </Card>
                </Skeleton>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}
