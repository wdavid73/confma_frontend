import React from "react";
import { Link } from "react-router-dom";
import { message, Empty, Button, Spin } from "antd";
import { getRental, refundRental } from "./js/RentalFunctions";
import DetailsRental from "./DetailsRental/DetailsRental";
import "../../css/basic.css";
import empty from "../../assets/box.png";

export default class Rental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rentals: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.getAll();
    this.showSpin();
  }

  getAll = () => {
    getRental().then((data) => {
      this.setState({
        rentals: [...data.rentals],
      });
    });
  };

  showSpin = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 7000);
  };

  handleRefundRental = (rental_id) => {
    this.showSpin();
    message
      .loading({
        content: "Refund Rental",
        onClose: refundRental(rental_id),
      })
      .then(() => {
        message.warning({
          content: "Refund Complete",
          onClose: this.DeleteDetailsRental(rental_id),
        });
      });
  };

  DeleteDetailsRental = (id) => {
    let data = [...this.state.rentals];
    data.filter((rental, index) => {
      if (rental.id === id) {
        data.splice(index, 1);
      }
      this.setState({
        rentals: [...data],
      });
      return true;
    });
  };

  render() {
    return (
      <div className="text-general">
        <Spin spinning={this.state.loading} tip="Loading..">
          {this.state.rentals.length <= 0 ? (
            <Empty
              image={empty}
              imageStyle={{
                height: 60,
              }}
              description={<span>No hay Alquileres Registrados</span>}
            >
              <Link to="/rental">
                <Button id="btn-form" type="primary">
                  Registre un Alquiler Ahora
                </Button>
              </Link>
            </Empty>
          ) : (
            <DetailsRental
              rentals={this.state.rentals}
              refundRental={this.handleRefundRental}
            />
          )}
        </Spin>
      </div>
    );
  }
}
