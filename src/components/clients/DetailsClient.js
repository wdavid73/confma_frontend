import React from "react";

export default class DetailsClient extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p className="text-center h3 mt-2">
            <div>
              {this.props.client.name} {this.props.client.last_name} -{" "}
              {this.props.client.address} {this.props.client.cellphone} -{" "}
              {this.props.client.phone}
            </div>
          </p>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
