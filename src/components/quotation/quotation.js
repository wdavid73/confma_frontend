import React, { Component } from 'react';
import { Drawer, Button, message, Table, Empty, Select, Card, List} from 'antd';
import {getClothWithOutQuotation , getQuotations, createQuotation} from '../js/QuotationFunctions.js'
const { Meta } = Card;
const { Option } = Select;

export default class Quotation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id : '',
            value_cloth : 0,
            value_work : 0,
            value_threads : 0,
            value_buttons : 0,
            value_necks : 0,
            value_embroidery : 0,
            value_prints : 0,
            quotations : [],
            cloth : [],
            cloth_id :'',
            visible : false,

        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    componentDidMount(){
        this.getAll()
    }

    showDrawer = () => {
        this.setState({
            visible : true
        })
    }

    onClose = () => {
        this.setState({
            visible : false
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
                value_cloth : 0,
                value_work : 0,
                value_threads : 0,
                value_buttons : 0,
                value_necks : 0,
                value_embroidery : 0,
                value_prints : 0,
                quotations : [...data.quotations]
            })
        })

        getClothWithOutQuotation().then(data => {
            this.setState({
                cloth : [...data.response]
            })
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        message.loading('Registro en Proceso..',2.5)
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
            value_cloth : 0,
                value_work : 0,
                value_threads : 0,
                value_buttons : 0,
                value_necks : 0,
                value_embroidery : 0,
                value_prints : 0,
                cloth_id :'',
        })
        this.onClose()
    }


    render(){
        return(
            <div>
                <div>
                    <Drawer
                    title="Registrar Cotizacion"
                    width={'50%'}
                    onClose={this.onClose}
                    visible={this.state.visible}
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
                                <div>
                                   {/* <label>Prenda : </label>
                                    <Select placeholder="Seleccione una Prenda" style={{width : "500px"}}>
                                        {this.state.cloth.map((cloth, index)  => (
                                            <Option value={cloth.id} >{cloth.name}</Option>
                                        ))}
                                    </Select>
                                    * */}
                                    <List
                                        grid={{
                                            gutter: 16,
                                            xs: 2,
                                            sm: 3,
                                            md: 3,
                                            lg: 3,
                                        }}

                                        pagination={{
                                            pageSize: 3,
                                        }}

                                        dataSource={this.state.cloth}
                                        renderItem={(cloth, index) => (
                                            <List.Item>
                                                <Card
                                                    key={index}
                                                    hoverable
                                                    style={{ width: 280 }}
                                                    cover={
                                                    <img
                                                        alt="cloth"
                                                        src={cloth.image}
                                                    />
                                                    }>
                                                    <Meta
                                                        title={
                                                            <div class="custom-control custom-radio">
                                                                <input type="radio" 
                                                                    id={cloth.id} 
                                                                    name="cloth_id" 
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
                                <Button id="btn-submit" onClick={this.onSubmit.bind(this)}>
                                    Registrar
                                </Button>
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
                                pagination={{pageSize : 10}}
                                scroll={{y : 400}}
                                size="small"
                                bordered
                            >
                                <Table.ColumnGroup title="Cotizacion">
                                    <Table.Column title="Valor de la Tela" dataIndex="value_cloth"/>
                                    <Table.Column title="Valor del Trabajo" dataIndex="value_work"/>
                                    <Table.Column title="Valor de los Botones" dataIndex="value_buttons"/>
                                    <Table.Column title="Valor de los Hilos" dataIndex="value_threads"/>
                                    <Table.Column title="Valor del Cuello" dataIndex="value_necks"/>
                                    <Table.Column title="Valor del Bordado" dataIndex="value_embroidery"/>
                                    <Table.Column title="Valor del Estampado" dataIndex="value_prints"/>
                                </Table.ColumnGroup>
                                <Table.ColumnGroup title="Prenda">
                                    <Table.Column
                                        title="Nombre"
                                        dataIndex="cloth"
                                        key="cloth_name"
                                        render={cloth => (
                                            <p>{cloth.name}</p>
                                        )}
                                    />
                                    <Table.Column
                                        title="Color"
                                        dataIndex="cloth"
                                        key="cloth_color"
                                        render={cloth => (
                                            <p>{cloth.color}</p>
                                        )}
                                    />
                                    <Table.Column
                                        title="Talla"
                                        dataIndex="cloth"
                                        key="cloth_size"
                                        render={cloth => (
                                            <p>{cloth.size}</p>
                                        )}
                                    />
                                    <Table.Column
                                        title="Moda"
                                        dataIndex="cloth"
                                        key="cloth_fashion"
                                        render={cloth => (
                                            <p>{cloth.fashion}</p>
                                        )}
                                    />

                                </Table.ColumnGroup>
                            </Table>
                        </div>
                    </div>
                )}
                </div>
            </div>
        )
    }
}