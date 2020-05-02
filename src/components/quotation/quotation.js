import React, { Component } from 'react';
import { Drawer, Button, message, Table, Empty, Card, List, Popover, Modal, Descriptions } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons'
import { getClothWithOutQuotation, getQuotations, createQuotation, createQuotationClient, getClientNotDuplicated } from '../js/QuotationFunctions.js'
import {
    popover_edit_quotation,
    popover_add_client_quotation,
    popover_delete_quotation,
    popover_title_add_client,
    popover_title_delete,
    popover_title_edit,
} from '../common/messages'
const { Meta } = Card;

export default class Quotation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            value_cloth: 0,
            value_work: 0,
            value_threads: 0,
            value_buttons: 0,
            value_necks: 0,
            value_embroidery: 0,
            value_prints: 0,
            total: 0,
            quotations: [],
            cloth: [],
            cloth_id: '',
            clients: [],
            client_id: '',
            visibleDrawer: false,
            editDisable: false,
            showCard: true,
            visibleModal: false,
            confirmLoading: false,
            loading: false,
            quotation_id_modal: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    componentDidMount() {
        this.getAll()
    }

    showDrawer = () => {
        this.setState({
            visibleDrawer: true
        })
    }

    onClose = () => {
        this.setState({
            visibleDrawer: false
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAll = () => {

        getQuotations().then(data => {
            this.setState({
                value_cloth: 0,
                value_work: 0,
                value_threads: 0,
                value_buttons: 0,
                value_necks: 0,
                value_embroidery: 0,
                value_prints: 0,
                total: 0,
                quotations: [...data.quotations]
            })
        })

        getClothWithOutQuotation().then(data => {
            this.setState({
                cloth: [...data.response]
            })
        })

        

    }

    onSubmit = (e) => {
        e.preventDefault()
        message.loading('Registro en Proceso..', 2.5)
            .then(
                createQuotation(
                    this.state.value_cloth,
                    this.state.value_work,
                    this.state.value_buttons,
                    this.state.value_embroidery,
                    this.state.value_necks,
                    this.state.value_prints,
                    this.state.value_threads,
                    this.state.cloth_id
                )
            )
            .then(
                () => {
                    this.getAll()
                }
            ).then(
                () => message.success('Registro Completado', 2.5)
            )
        this.setState({
            value_cloth: 0,
            value_work: 0,
            value_threads: 0,
            value_buttons: 0,
            value_necks: 0,
            value_embroidery: 0,
            value_prints: 0,
            cloth_id: '',
        })
        this.onClose()
    }

    onEdit = (quotationId, e) => {
        e.preventDefault()
        this.showDrawer()
        let data = [...this.state.quotations]
        data.forEach((quotation, index) => {
            if (quotationId === quotation.id) {
                this.setState({
                    id: quotation.id,
                    value_work: quotation.value_work,
                    value_buttons: quotation.value_buttons,
                    value_cloth: quotation.value_cloth,
                    value_embroidery: quotation.value_embroidery,
                    value_necks: quotation.value_necks,
                    value_prints: quotation.value_prints,
                    value_threads: quotation.value_threads,
                    showCard: false
                })
            }
        })
    }

    onDelete = (quotationId, e) => {
        e.preventDefault()
        let data = [...this.state.quotations]
        data.filter((quotation, index) => {
            if (quotationId === quotation.id) {
                data.splice(index, 1)
            }
            return true
        })
        this.setState({ quotations: [...data] })
    }

    showModal = (quotationId) => {

        getClientNotDuplicated(quotationId).then(data => {
            this.setState({
                clients: [...data.clients]
            })
        })

        this.setState({
            visibleModal: true,
            quotation_id_modal: quotationId
        });
    };

    handleOk = (quotationId, e) => {
        e.preventDefault()
        createQuotationClient(quotationId, this.state.client_id)
        this.setState({
            client_id: '',
            loading: true 
        });
        setTimeout(() => {
            this.setState({ loading: false, visibleModal: false });
        }, 3000);
    };


    handleCancel = () => {
        this.setState({ visibleModal: false });
    };

    render() {
        return (
            <div>
                <div>
                    <Drawer
                        title="Registrar Cotizacion"
                        width={'50%'}
                        onClose={this.onClose}
                        visible={this.state.visibleDrawer}
                        footer={
                            <div style={{ textAlign: "right" }}>
                                <Button id="btn-delete" onClick={this.onClose} style={{ marginRight: 8 }}> Cancel </Button>
                            </div>
                        }>
                        <div>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                    <div className="col">
                                        <label>Valor de la Tela : </label>
                                        <input type="number"
                                            className="form-control"
                                            id="value_cloth"
                                            name="value_cloth"
                                            value={this.state.value_cloth || ''}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="Ingrese el Valor de la Tela"
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Valor del Trabajo : </label>
                                        <input type="number"
                                            className="form-control"
                                            id="value_work"
                                            name="value_work"
                                            value={this.state.value_work || ''}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="Ingrese el Valor del Trabajo"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col">
                                        <label>Valor de los Botones : </label>
                                        <input type="number"
                                            className="form-control"
                                            id="value_buttons"
                                            name="value_buttons"
                                            value={this.state.value_buttons || ''}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="Ingrese el Valor de los Botones"
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Valor del Cuello : </label>
                                        <input type="number"
                                            className="form-control"
                                            id="value_necks"
                                            name="value_necks"
                                            value={this.state.value_necks || ''}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="Ingrese el Valor de los Cuellos"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row mt-2 mb-2">
                                    <div className="col">
                                        <label>Valor de los Hilos : </label>
                                        <input type="number"
                                            className="form-control"
                                            id="value_threads"
                                            name="value_threads"
                                            value={this.state.value_threads || ''}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="Ingrese el Valor de los Hilos"
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Valor del Bordado : </label>
                                        <input type="number"
                                            className="form-control"
                                            id="value_embroidery"
                                            name="value_embroidery"
                                            value={this.state.value_embroidery || ''}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="Ingrese el Valor del Bordado"
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Valor del Estampado : </label>
                                        <input type="number"
                                            className="form-control"
                                            id="value_prints"
                                            name="value_prints"
                                            value={this.state.value_prints || ''}
                                            onChange={this.onChange.bind(this)}
                                            placeholder="Ingrese el Valor del Estampado"
                                            required
                                        />
                                    </div>
                                </div>
                                {this.state.showCard ? (
                                    <div>

                                        <List
                                            grid={{ gutter: 16, xs: 2, sm: 3, md: 3, lg: 3, }}
                                            pagination={{ pageSize: 3 }}
                                            dataSource={this.state.cloth}
                                            renderItem={(cloth, index) => (
                                                <List.Item>
                                                    <Card key={index} hoverable style={{ width: 280 }}
                                                        cover={<img alt="cloth" src={cloth.image} />}>
                                                        <Meta
                                                            title={
                                                                <div className="custom-control custom-radio">
                                                                    <input type="radio" id={cloth.id} name="cloth_id"
                                                                        class="custom-control-input"
                                                                        value={cloth.id}
                                                                        onChange={this.onChange.bind(this)}
                                                                    />
                                                                    <label class="custom-control-label" htmlFor={cloth.id}>
                                                                        {cloth.name}
                                                                    </label>
                                                                </div>
                                                            }
                                                            description={
                                                                <div>
                                                                    <p> Talla : {cloth.size} </p>
                                                                    <p> Color : {cloth.color} </p>
                                                                    <p> Moda : {cloth.fashion} </p>
                                                                </div>
                                                            }
                                                        />
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                ) : ('')}

                                {!this.state.editDisable ? (
                                    <Button id="btn-submit" onClick={this.onSubmit.bind(this)}>
                                        Registrar
                                    </Button>
                                ) : (
                                        <Button id="btn-submit" onClick={this.onUpdate.bind(this)}>
                                            Actualizar
                                        </Button>
                                    )}

                            </form>
                        </div>
                    </Drawer>
                </div>
                <div>
                    {this.state.quotations.length <= 0 ? (
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 60,
                            }}
                            description={
                                <span>
                                    No hay Cotizaciones Registrados
                            </span>
                            }
                        >
                            <Button id="btn-form" onClick={this.showDrawer}>Registrar Cotizacion</Button>
                        </Empty>
                    ) : (
                            <div>
                                <Button id="btn-form" onClick={this.showDrawer}>Registrar Cotizacion</Button>
                                <div className="mt-3">
                                    <Table
                                        dataSource={this.state.quotations}
                                        pagination={{ pageSize: 10 }}
                                        scroll={{ x: 1500, y: 500 }}
                                        size="small"
                                        bordered
                                    >
                                        <Table.ColumnGroup title="Cotizacion">
                                            <Table.Column title="Index" dataIndex="id" fixed='left' responsive={'md'} />
                                            <Table.Column title="Valor de la Tela" dataIndex="value_cloth" fixed='left' responsive={'md'} />
                                            <Table.Column title="Valor del Trabajo" dataIndex="value_work" responsive={'md'} />
                                            <Table.Column title="Valor de los Botones" dataIndex="value_buttons" responsive={'md'} />
                                            <Table.Column title="Valor de los Hilos" dataIndex="value_threads" responsive={'sm'} />
                                            <Table.Column title="Valor del Cuello" dataIndex="value_necks" responsive={'sm'} />
                                            <Table.Column title="Valor del Bordado" dataIndex="value_embroidery" responsive={'lg'} />
                                            <Table.Column title="Valor del Estampado" dataIndex="value_prints" responsive={'lg'} />
                                            <Table.Column title="Total" dataIndex="total" />
                                        </Table.ColumnGroup>
                                        <Table.ColumnGroup title="Prenda">
                                            <Table.Column title="Nombre" dataIndex="cloth" key="cloth_name"
                                                render={cloth => (
                                                    <p>{cloth.name}</p>
                                                )}
                                            />
                                            <Table.Column title="Color" dataIndex="cloth" key="cloth_color"
                                                render={cloth => (
                                                    <p>{cloth.color}</p>
                                                )}
                                            />Esta opcion es para Editar la Cotizacion
                                    <Table.Column title="Talla" dataIndex="cloth" key="cloth_size"
                                                render={cloth => (
                                                    <p>{cloth.size}</p>
                                                )}
                                            />
                                            <Table.Column title="Moda" dataIndex="cloth" key="cloth_fashion"
                                                render={cloth => (
                                                    <p>{cloth.fashion}</p>
                                                )}
                                            />
                                        </Table.ColumnGroup>
                                        <Table.Column title="Acciones" key="action" fixed='right'
                                            render={quotation => (
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                                        <Popover placement="topLeft" content={popover_edit_quotation} title={popover_title_edit}>
                                                            <button href="" id="btn-form-icon" className="btn btn-sm"
                                                                disabled={this.state.editDisable}
                                                                onClick={this.onEdit.bind(
                                                                    this,
                                                                    quotation.id,
                                                                )}>
                                                                <EditOutlined style={{ fontSize: '24px' }} />
                                                            </button>
                                                        </Popover>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                                        <Popover placement="topLeft" content={popover_delete_quotation} title={popover_title_delete}>
                                                            <button href="" id="btn-delete-icon" className="btn btn-sm"
                                                                disabled={this.state.editDisable}
                                                                onClick={this.onDelete.bind(
                                                                    this,
                                                                    quotation.id
                                                                )}>
                                                                <DeleteOutlined style={{ fontSize: '24px' }} />
                                                            </button>
                                                        </Popover>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                                        <Popover placement="topLeft" content={popover_add_client_quotation} title={popover_title_add_client}>
                                                            <Button id="btn-submit-icon"
                                                                onClick={this.showModal.bind(
                                                                    this,
                                                                    quotation.id
                                                                )}
                                                            >
                                                                <UserAddOutlined style={{ fontSize: '24px' }} />
                                                            </Button>
                                                        </Popover>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </Table>
                                </div>
                            </div>
                        )}
                </div>
                <div>
                    <Modal title="Cotizacion - Cliente" visible={this.state.visibleModal} onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel} width={'50%'}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Volver
                            </Button>,
                        ]}>
                        {this.state.quotations.map((quotation, index) => (
                            <p key={index}>
                                {this.state.quotation_id_modal === quotation.id ? (
                                    <div>
                                        <div>
                                            <Descriptions title="Informacion de la Cotizacion">
                                                <Descriptions.Item label="Valor de la Tela" >{quotation.value_cloth}</Descriptions.Item>
                                                <Descriptions.Item label="Valor de la Tela" >{quotation.value_cloth}</Descriptions.Item>
                                                <Descriptions.Item label="Valor del Trabajo">{quotation.value_work}</Descriptions.Item>
                                                <Descriptions.Item label="Valor de los Botones">{quotation.value_buttons}</Descriptions.Item>
                                                <Descriptions.Item label="Valor de los Cuellos">{quotation.value_necks}</Descriptions.Item>
                                                <Descriptions.Item label="Valor de los Hilos">{quotation.value_threads}</Descriptions.Item>
                                                <Descriptions.Item label="Valor del Bordado">{quotation.value_embroidery}</Descriptions.Item>
                                                <Descriptions.Item label="Valor del Estampado">{quotation.value_prints}</Descriptions.Item>
                                                <Descriptions.Item label="Valor Total">{quotation.total}</Descriptions.Item>
                                            </Descriptions>
                                            <form>
                                                <label>Clientes : </label>
                                                <select className="custom-select mt-2 mb-3" required id='client_id' name='client_id'
                                                    value={this.state.client_id || ''}
                                                    onChange={this.onChange.bind(this)}
                                                >
                                                    <option disabled value="">Elige...</option>
                                                    {this.state.clients.map((client, index) => (
                                                        <option key={index} value={client.id}>
                                                            {client.name} {client.last_name} - {client.address} - {client.cellphone}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk.bind(this, quotation.id)}>
                                                    Submit
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                ) : ('')}
                            </p>
                        ))}
                    </Modal>
                </div>
            </div>
        )
    }
}