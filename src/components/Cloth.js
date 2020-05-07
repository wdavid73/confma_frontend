import React from "react";
import {
  Drawer,
  Button,
  message,
  List,
  Empty,
  Card,
  Row,
  Col,
  Descriptions,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getCloth, createCloth } from "./js/ClothFuntions";
import { validateMessages } from "./common/messages";
import { isEmptyOrBlank } from "./actions/Validations";

const { Meta } = Card;
const { Item } = Form;
const { Option } = Select;
export default class Cloth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      color: "",
      size: "",
      fashion: "",
      image: null,
      cloths: [],
      minValue: 0,
      maxValue: 1,
      visible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  numEachPage = 4;

  formRef = React.createRef();

  componentDidMount() {
    this.getAll();
  }

  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * this.numEachPage,
      maxValue: value * this.numEachPage,
    });
  };

  getAll = () => {
    getCloth().then((data) => {
      this.setState({
        name: "",
        color: "",
        size: "",
        fashion: "",
        image: "",
        cloths: [...data.cloths],
      });
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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

  fileSelecterhandler = (e) => {
    this.setState({
      image: e.file,
    });
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      isEmptyOrBlank(this.state.name) &&
      isEmptyOrBlank(this.state.color) &&
      isEmptyOrBlank(this.state.size) &&
      isEmptyOrBlank(this.state.fashion)
    ) {
      message
        .loading("Registro en Proceso..", 2.5)
        .then(
          createCloth(
            this.state.name,
            this.state.color,
            this.state.size,
            this.state.fashion,
            this.state.image
          )
        )
        .then(() => {
          this.getAll();
        })
        .then(() => message.success("Registro Completado", 2.5));
      this.setState({
        name: "",
        color: "",
        size: "",
        fashion: "",
        image: null,
      });
      this.formRef.current.resetFields();
      this.onClose();
    } else {
      message.warning("Porfavor Diligencie Todos los Campos", 2.5);
    }
  };

  render() {
    return (
      <div>
        <div>
          <Button
            id="btn-form"
            onClick={this.showDrawer}
            style={{ marginBottom: "15px" }}
          >
            Agregar Prenda
          </Button>
          <Drawer
            title="Registar Prenda"
            width={"75%"}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div style={{ textAlign: "right" }}>
                <Button
                  id="btn-delete"
                  onClick={this.onClose}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>
              </div>
            }
          >
            <Form
              ref={this.formRef}
              onSubmitCapture={this.onSubmit}
              validateMessages={validateMessages}
            >
              <Item
                label="Nombre de la Prenda"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  name="name"
                  placeholder="Ingrese un Nombre para la Prenda"
                  disable={this.state.inputDisable}
                  value={this.state.name || ""}
                  onChange={this.onChange.bind(this)}
                />
              </Item>

              <Item
                label="Color de la Prenda"
                name="color"
                rules={[{ required: true }]}
              >
                <Input
                  name="color"
                  placeholder="Ingrese el color de la Prenda"
                  disable={this.state.inputDisable}
                  value={this.state.color || ""}
                  onChange={this.onChange.bind(this)}
                />
              </Item>

              <Item
                label="Talla de la Prenda"
                name="size"
                rules={[{ required: true }]}
              >
                <Select
                  value={this.state.size || ""}
                  onChange={this.handlerChangeSelectSize}
                  placeholder="Seleccione una Talla"
                >
                  <Option value="XS">XS</Option>
                  <Option value="S">S</Option>
                  <Option value="M">M</Option>
                  <Option value="L">L</Option>
                  <Option value="XL">XL</Option>
                </Select>
              </Item>

              <Item
                label="Moda de la Prenda"
                name="Moda"
                rules={[{ required: true }]}
              >
                <Select
                  value={this.state.fashion || ""}
                  onChange={this.handlerChangeSelectFashion}
                  placeholder="Seleccione un estilo de Moda"
                >
                  <Option value="General">General</Option>
                  <Option value="A Medida">A Medida</Option>
                </Select>
              </Item>

              <Form.Item
                name="image"
                label="Subir Imagen"
                valuePropName="fileList"
                getValueFromEvent={this.fileSelecterhandler}
                rules={[{ required: true }]}
              >
                <Upload
                  name="image"
                  beforeUpload={() => false}
                  listType="picture"
                >
                  <Button>
                    <UploadOutlined /> Click to upload
                  </Button>
                </Upload>
              </Form.Item>

              <Button
                id="btn-submit"
                htmlType="submit"
                disabled={this.state.buttonDisable}
              >
                Registrar Prenda
              </Button>
            </Form>
          </Drawer>
        </div>
        {this.state.cloths.length <= 0 ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={<span>No hay Prendas Registradas</span>}
          ></Empty>
        ) : (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 8,
            }}
            dataSource={this.state.cloths}
            renderItem={(cloth) => (
              <List.Item>
                <Card hoverable style={{ padding: "-20px" }}>
                  <Row gutter={[16, 8]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                      <img
                        src={cloth.image}
                        className="card-img-top mb-2"
                        alt="moda de referencia"
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                      <div>
                        <Descriptions
                          title="Detalles de la Prenda"
                          bordered
                          column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                          style={{ width: "105%" }}
                        >
                          <Descriptions.Item label="Talla">
                            {cloth.size}
                          </Descriptions.Item>
                          <Descriptions.Item label="Color">
                            {cloth.color}
                          </Descriptions.Item>
                          <Descriptions.Item label="Moda">
                            {cloth.fashion}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    </Col>
                  </Row>
                  <Meta
                    title={cloth.name}
                    description="www.confeccionesmaribel.com"
                  />
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}
