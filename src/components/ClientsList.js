import React from 'react'
import { getClients, createClient, updateClient, deleteClient } from './js/ClientFuncions'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


export default class Clients extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            last_name: '',
            address: '',
            phone: '',
            cellphone: '',
            editDisable: false,
            clients: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getAll()
    }

    getAll = () => {
        getClients().then(data => {
            this.setState({
                name: '',
                last_name: '',
                address: '',
                phone: '',
                cellphone: '',
                clients: [...data.clients]
            })
        })
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        createClient(
            this.state.name,
            this.state.last_name,
            this.state.address,
            this.state.phone,
            this.state.cellphone
        ).then(() => {
            this.getAll()
        })
        this.setState({
            name: '',
            last_name: '',
            address: '',
            phone: '',
            cellphone: '',
        })
    }

    onEdit = (clientId, e) => {
        e.preventDefault()
        let data = [...this.state.clients]
        data.forEach((client, index) => {
            if (client.id === clientId) {
                this.setState({
                    id: client.id,
                    name: client.name,
                    last_name: client.last_name,
                    address: client.address,
                    phone: client.phone,
                    cellphone: client.cellphone,
                    editDisable: true
                })
            }
        })

    }

    onUpdate = e => {
        e.preventDefault()
        updateClient(
            this.state.name,
            this.state.last_name,
            this.state.address,
            this.state.phone,
            this.state.cellphone,
            this.state.id
        ).then(
            () => {
                this.getAll()
            }
        )
        this.setState({
            name: '',
            last_name: '',
            address: '',
            phone: '',
            cellphone: '',
            editDisable: ''
        })
        this.getAll()
    }

    onDelete = (val, e) => {
        e.preventDefault()
        deleteClient(val)

        var data = [...this.state.clients]
        data.filter(function (client, index) {
            if (client.id === val) {
                data.splice(index, 1)
            }
            return true
        })
        this.setState({ clients: [...data] })
    }



    render() {
        return (
            <div className="row">
                <div className="col-lg-4">
                    <div className="card bg-dark text-white">
                        <div className="card-header">
                            <h3 className="card-title text-white">Cliente</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-row mt-2">
                                    <div className="col">
                                        <label>Nombre/s : </label>
                                        <input type="text"
                                            placeholder="Nombre del Cliente"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            value={this.state.name || ''}
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Apellido/s : </label>
                                        <input type="text"
                                            placeholder="Apellido del Cliente"
                                            id="last_name"
                                            name="last_name"
                                            className="form-control"
                                            value={this.state.last_name || ''}
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label>Direccion : </label>
                                    <input type="text"
                                        placeholder="Direccion del Cliente"
                                        id="address"
                                        name="address"
                                        className="form-control"
                                        value={this.state.address || ''}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <div className="form-row mt-2">
                                    <div className="col">
                                        <label>Telefono Celular : </label>
                                        <input type="number"
                                            placeholder="Celular del Cliente"
                                            id="cellphone"
                                            name="cellphone"
                                            className="form-control"
                                            value={this.state.cellphone || ''}
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label>Telefono : </label>
                                        <input type="number"
                                            placeholder="Telefono del Cliente"
                                            id="phone"
                                            name="phone"
                                            className="form-control"
                                            value={this.state.phone || ''}
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                {!this.state.editDisable ? (
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                        onClick={this.onSubmit.bind(this)}>
                                        Registrar Cliente
                                    </button>
                                ) : ("")
                                }
                                {this.state.editDisable ? (
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-block mt-4"
                                        onClick={this.onUpdate.bind(this)}>
                                        Actualizar Cliente
                                    </button>
                                ) : ("")
                                }

                            </form>
                            <footer className="blockquote-footer">Confecciones Maribel</footer>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mt-2">
                    <table className="table table-hover table-bordered">
                        <caption>Lista de Clientes</caption>
                        <thead className="thead-dark">
                            <tr>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Direccion</th>
                                <th scope='col'>Telefono</th>
                                <th scope='col'>Celular</th>
                                <th scope='col'>Actiones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clients.map((client, index) => (
                                <tr key={index}>
                                    <th className="text-left">{client.name} {client.last_name}</th>
                                    <th className="text-left">{client.address}</th>
                                    <th className="text-left">{client.phone}</th>
                                    <th className="text-left">{client.cellphone}</th>
                                    <th>
                                        <div className="row">
                                            <div className="col-6">
                                                <button href="" className="btn btn-info btn-block btn-sm"
                                                    disabled={this.state.editDisable}
                                                    onClick={this.onEdit.bind(
                                                        this,
                                                        client.id
                                                    )}>
                                                    <EditOutlined style={{ fontSize: '24px' }} />
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button href="" className="btn btn-danger btn-block btn-sm"
                                                    disabled={this.state.editDisable}
                                                    onClick={this.onDelete.bind(
                                                        this,
                                                        client.id
                                                    )}>
                                                    <DeleteOutlined style={{ fontSize: '24px' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}