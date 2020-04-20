import React from 'react'
import { getClients, findClient } from '../js/ClientFuncions'

export default class ClientFind extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            find_client: []
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.getAll()
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAll = () => {
        getClients().then(data => {
            this.setState({
                clients: [...data.clients]
            })
        })
    }

    onFind = (client_id) => {
        findClient(client_id).then(data => {
            console.log(data)
            this.setState({
                find_client: [data]
            })
        })
    }



    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card bg-dark text-white">
                        <div className="card-header text-center">
                            <p className="card-title h4">Selecione un Cliente</p>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10">
                                    <div className="form-group">
                                        <ul>
                                            {this.state.clients.map((client, index) => (
                                                <li key={index}>
                                                    {client.name} {client.last_name} -
                                                    {client.address} - {client.phone} - {client.cellphone} - {client.id}
                                                    <button className="btn btn-primary" onClick={this.onFind.bind(this, client.id)}>Buscar Cliente</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-5">
                    <h2>REPONSE</h2>
                    {this.state.find_client.length >= 1 ? (
                        <div>

                            {
                                this.state.find_client.map((item, index) => (
                                    <div>
                                        <p>Client :
                                            {item.client.name}
                                            {item.client.last_name}
                                            {item.client.address}
                                            {item.client.phone}
                                            {item.client.cellphone}
                                        </p>
                                        <p> Alquileres :
                                            {item.rentals}
                                        </p>
                                        <p> Cotizaciones
                                            {item.quotations}
                                        </p>
                                    </div>
                                ))
                            }

                        </div>
                    ) : ('')}
                </div>
            </div>
        )
    }
}