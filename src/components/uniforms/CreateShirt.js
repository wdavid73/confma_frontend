import React from "react";
import {
  Form,
  Row,
  Col,
  InputNumber,
  Button,
  message,
  Select,
  Upload,
  Input,
  Tooltip,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../css/basic.css";
import help from "../../assets/help_white.png";

export default class CreateShirts extends React.Component {
  state = {
    size: "",
    price: 0,
    image: null,
    type: "",
    ref: "",
  };
  formRef = React.createRef();

  handleChangeSelectSize = (value) => {
    this.setState({ size: value });
  };

  handleChangeSelectType = (value) => {
    this.setState({ type: value });
  };

  handleChangeNumber = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileSelectedHandler = (e) => {
    this.setState({
      image: e.file,
    });
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.formRef.current.resetFields();
    this.setState({
      size: "",
      price: 0,
      image: null,
      type: "",
      ref: "",
    });
  };

  onFinishFail = (values) => {
    values.errorFields.forEach((error, index) =>
      message.warning("Porfavor " + error.errors, 2.5)
    );
  };

  render() {
    return (
      <div className="text-general">
        <Form
          ref={this.formRef}
          onFinish={this.handleSubmit}
          onFinishFail={this.onFinishFail}
        >
          <Form.Item
            label="Referencia"
            name="ref"
            rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
          >
            <Input
              maxLength={49}
              placeholder="Ingrese un referencia para identificar la camisa"
              value={this.state.ref || ""}
              onChange={this.handleChange}
              style={{ width: "100%" }}
              name="ref"
              addonAfter={
                <Tooltip
                  placement="topRight"
                  title="La cantidad maxima de caracteres es 50"
                  color="#d48806"
                >
                  <img src={help} alt="help" width="25px" />
                </Tooltip>
              }
            />
          </Form.Item>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Precio"
                name="price"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <InputNumber
                  id="inputNumber"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Ingrese el Valor"
                  value={this.state.price || ""}
                  max={100000}
                  onChange={this.handleChangeNumber("price")}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Talla"
                name="size"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <Select
                  value={this.state.size || ""}
                  onChange={this.handleChangeSelectSize}
                  placeholder="Seleccione una Talla"
                >
                  <Select.Option value="XS">XS</Select.Option>
                  <Select.Option value="S">S</Select.Option>
                  <Select.Option value="M">M</Select.Option>
                  <Select.Option value="L">L</Select.Option>
                  <Select.Option value="XL">XL</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Tipo"
                name="type"
                rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
              >
                <Select
                  value={this.state.type || ""}
                  onChange={this.handleChangeSelectType}
                  placeholder="Seleccione el Tipo"
                  defaultValue={this.props.gender}
                  disabled
                  allowClear
                >
                  <Select.Option value="Male">Masculino</Select.Option>
                  <Select.Option value="Female">Femenino</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="image"
                label="Subir Imagen"
                valuePropName="fileList"
                getValueFromEvent={this.fileSelectedHandler}
                rules={[
                  { required: true, message: "Porfavor Inserte una Imagen" },
                ]}
              >
                <Upload
                  name="image"
                  beforeUpload={() => false}
                  listType="picture"
                >
                  <Button>
                    <UploadOutlined /> Ingrese una imagen
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Button
            id="btn-submit"
            htmlType="submit"
            //disabled={this.state.buttonDisable}
            style={{ color: "black" }}
          >
            Registrar Camisa
          </Button>
        </Form>
      </div>
    );
  }
}
