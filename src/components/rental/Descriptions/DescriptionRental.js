import React from "react";
import { Descriptions } from "antd";

export default class DescriptionCloths extends React.Component {
  description_rental = () => {
    return (
      <div>
        <Descriptions size="small" bordered>
          <Descriptions.Item label="Fecha Alquilada">
            {this.props.rental.date_now}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Fecha de Devolucion">
            {this.props.rental.date_return}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions size="small" bordered>
          <Descriptions.Item label="Precio">
            $ {this.props.rental.price}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.description_rental()}</React.Fragment>;
  }
}
