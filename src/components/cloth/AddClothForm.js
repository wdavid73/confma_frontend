import React from "react";
import { Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default class AddClothForm extends React.Component {
  state = {
    name: "",
    color: "",
    size: "",
    fashion: "",
    image: null,
  };

  formRef = React.createRef();

  handlerChangeSelectSize = (value) => {
    this.setState({
      size: value,
    });
  };

  handlerChangeSelectFashion = (value) => {
    this.setState({
      fashion: value,
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.formRef.current.resetFields();
    this.setState({
      name: "",
      color: "",
      size: "",
      fashion: "",
      image: null,
    });
  };

  onFinishFail = (values) => {
    values.errorFields.forEach((error, index) =>
      message.warning("Porfavor " + error.errors, 2.5)
    );
  };

  render() {
    return (
      <div>
        <p>FORM</p>
        <Form
          ref={this.formRef}
          onFinish={this.handleSubmit}
          onFinishFailed={this.onFinishFail}
        >
          <Form.Item
            label="Nombre de la Prenda"
            name="name"
            rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
          >
            <Input
              name="name"
              placeholder="Ingrese un Nombre para la Prenda"
              //disable={this.state.inputDisable}
              value={this.state.name || ""}
              onChange={this.onChange}
            />
          </Form.Item>

          <Form.Item
            label="Color de la Prenda"
            name="color"
            rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
          >
            <Input
              name="color"
              placeholder="Ingrese el color de la Prenda"
              //disable={this.state.inputDisable}
              value={this.state.color || ""}
              onChange={this.onChange}
            />
          </Form.Item>

          <Form.Item
            label="Talla de la Prenda"
            name="size"
            rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
          >
            <Select
              value={this.state.size || ""}
              onChange={this.handlerChangeSelectSize}
              placeholder="Seleccione una Talla"
            >
              <Select.Option value="XS">XS</Select.Option>
              <Select.Option value="S">S</Select.Option>
              <Select.Option value="M">M</Select.Option>
              <Select.Option value="L">L</Select.Option>
              <Select.Option value="XL">XL</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Moda de la Prenda"
            name="Moda"
            rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
          >
            <Select
              value={this.state.fashion || ""}
              onChange={this.handlerChangeSelectFashion}
              placeholder="Seleccione un estilo de Moda"
            >
              <Select.Option value="General">General</Select.Option>
              <Select.Option value="A Medida">A Medida</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Subir Imagen"
            valuePropName="fileList"
            getValueFromEvent={this.fileSelectedHandler}
            rules={[{ required: true, message: "Porfavor Llene el Campo" }]}
          >
            <Upload name="image" beforeUpload={() => false} listType="picture">
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
          </Form.Item>

          <Button
            id="btn-submit"
            htmlType="submit"
            //disabled={this.state.buttonDisable}
          >
            Registrar Prenda
          </Button>
        </Form>
      </div>
    );
  }
}
