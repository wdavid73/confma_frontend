import React from "react";
import { Button, Row, Col } from "antd";
import quotationIcon from "../../assets/quotation.png";
import rentalIcon from "../../assets/alquilar.png";
import "../../css/basic.css";

export default class Options extends React.Component {
  render() {
    return (
      <div className="text-general">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {this.props.options.map((option) => (
            <Col className="gutter-row" span={12}>
              <Button
                block
                id="btn-options"
                onClick={() => this.props.selectOption(option.option)}
              >
                <img
                  src={
                    option.option === "quotation" ? quotationIcon : rentalIcon
                  }
                  width="50"
                  style={{ marginRight: 15 }}
                  alt="icon_option"
                />
                Agregar {option.title}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
