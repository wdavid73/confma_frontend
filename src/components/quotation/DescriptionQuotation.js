import React from "react";

import { Descriptions } from "antd";

export default class DescriptionQuotation extends React.Component {
  description_quotation = () => {
    return (
      <Descriptions
        title="Informacion de la Cotizacion"
        className="text-left p-2"
      >
        <Descriptions.Item label="Valor de la Tela">
          $ {this.props.quotation.value_cloth}
        </Descriptions.Item>
        <Descriptions.Item label="Valor de la Tela">
          $ {this.props.quotation.value_cloth}
        </Descriptions.Item>
        <Descriptions.Item label="Valor del Trabajo">
          $ {this.props.quotation.value_work}
        </Descriptions.Item>
        <Descriptions.Item label="Valor de los Botones">
          $ {this.props.quotation.value_buttons}
        </Descriptions.Item>
        <Descriptions.Item label="Valor de los Cuellos">
          $ {this.props.quotation.value_necks}
        </Descriptions.Item>
        <Descriptions.Item label="Valor de los Hilos">
          $ {this.props.quotation.value_threads}
        </Descriptions.Item>
        <Descriptions.Item label="Valor del Bordado">
          $ {this.props.quotation.value_embroidery}
        </Descriptions.Item>
        <Descriptions.Item label="Valor del Estampado">
          $ {this.props.quotation.value_prints}
        </Descriptions.Item>
        <Descriptions.Item label="Valor Total">
          $ {this.props.quotation.total}
        </Descriptions.Item>
      </Descriptions>
    );
  };
  render() {
    return <React.Fragment>{this.description_quotation()}</React.Fragment>;
  }
}
