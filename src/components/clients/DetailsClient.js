import React from "react";

export default class DetailsClient extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p className="text-center h1 mt-2">
            {this.props.client.name} {this.props.client.last_name} -{" "}
            {this.props.client.address} {this.props.client.cellphone} -{" "}
            {this.props.client.phone}
          </p>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
