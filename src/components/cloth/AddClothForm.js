import React from "react";
import { Form, Input, Select, Upload, Button, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../css/basic.css";
import { isEmptyOrBlank } from "../common/Validations";
import {
  fieldName,
  fieldColor,
  fieldSize,
  fieldFashion,
  fieldUploadImage,
} from "../common/referencesFields";
import { getBase64 } from "./js/ClothFuntions";

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
    let field;
    for (const state in this.state) {
      if (!isEmptyOrBlank(this.state[state]) && state === "name") {
        fieldName.current.focus();
        field = state;
        break;
      }
      if (!isEmptyOrBlank(this.state[state]) && state === "color") {
        fieldColor.current.focus();
        field = state;
        break;
      }
    }
    if (!field) {
      this.props.onSubmit(this.state);
      this.formRef.current.resetFields();
      this.setState({
        name: "",
        color: "",
        size: "",
        fashion: "",
        image: null,
      });
    } else {
      message.info({
        content: "El campo " + field + " no puede estar vacio",
        duration: 2.5,
      });
    }
  };

  onFinishFail = (values) => {
    values.errorFields.forEach((error, index) =>
      message.warning("Porfavor " + error.errors, 2.5)
    );
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  render() {
    return (
      <div className="text-general">
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
              ref={fieldName}
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
              ref={fieldColor}
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
              ref={fieldSize}
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
              ref={fieldFashion}
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
            rules={[{ required: true, message: "Porfavor Inserte una Imagen" }]}
          >
            <Upload
              name="image"
              beforeUpload={() => false}
              listType="picture"
              ref={fieldUploadImage}
              onPreview={this.handlePreview}
            >
              <Button>
                <UploadOutlined /> Ingrese una imagen
              </Button>
            </Upload>
          </Form.Item>

          <Button
            id="btn-submit"
            htmlType="submit"
            //disabled={this.state.buttonDisable}
            style={{ color: "black" }}
          >
            Registrar Prenda
          </Button>
        </Form>
        <Modal
          visible={this.state.previewVisible}
          title={this.state.previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={this.state.previewImage}
          />
        </Modal>
      </div>
    );
  }
}
