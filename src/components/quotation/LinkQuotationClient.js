import React from "react";
import { Form, Button, Spin } from "antd";
import ListClients from "../rental/AddRental/ListClients";
import DescriptionQuotation from "./DescriptionQuotation";
import {
  getOneQuotation,
  getClientNotDuplicated,
} from "./js/QuotationFunctions";

export default class LinkQuotationClient extends React.Component {
  state = {
    id: "",
    value_work: 0,
    value_cloth: 0,
    value_threads: 0,
    value_buttons: 0,
    value_necks: 0,
    value_embroidery: 0,
    value_prints: 0,
    total: 0,
    clients: [],
    client_id: "",
    loading: false,
  };

  componentDidMount() {
    this.getQuotationById(this.props.quotationId);
    this.showSpin();
  }

  componentDidUpdate(prevProps) {
    const { quotationId } = this.props;
    if (prevProps.quotationId !== quotationId) {
      this.getQuotationById(quotationId);
      this.showSpin();
    }
  }

  formRef = React.createRef();

  getQuotationById = (quotation_id) => {
    getOneQuotation(quotation_id).then((data) => {
      this.setState({
        id: data.quotation.id,
        value_work: data.quotation.value_work,
        value_cloth: data.quotation.value_cloth,
        value_threads: data.quotation.value_threads,
        value_buttons: data.quotation.value_buttons,
        value_necks: data.quotation.value_necks,
        value_embroidery: data.quotation.value_embroidery,
        value_prints: data.quotation.value_prints,
        total: data.quotation.total,
      });
    });
    getClientNotDuplicated(quotation_id).then((data) => {
      this.setState({
        clients: [...data.clients],
      });
    });
  };

  onChange = (client_id) => {
    this.setState({
      client_id: client_id,
    });
  };

  showSpin = () => {
    this.setState({ loading: true, disable: true });
    setTimeout(() => {
      this.setState({ loading: false, disable: false });
    }, 5000);
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.client_id, this.state.id);
    this.setState({
      id: "",
      value_work: 0,
      value_cloth: 0,
      value_threads: 0,
      value_buttons: 0,
      value_necks: 0,
      value_embroidery: 0,
      value_prints: 0,
      total: 0,
      client_id: "",
    });
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <div>
        <Spin spinning={this.state.loading} tip="Loading...">
          <DescriptionQuotation quotation={this.state} />
          <div>
            <Form onFinish={this.handleSubmit} ref={this.formRef}>
              <ListClients
                clients={this.state.clients}
                onChange={this.onChange}
                disable={this.state.disable}
              />
              <Button
                id="btn-submit-rental"
                style={{ color: "black" }}
                htmlType="submit"
                disable={this.state.disable}
              >
                Guardar Cliente
              </Button>
            </Form>
          </div>
        </Spin>
      </div>
    );
  }
}
