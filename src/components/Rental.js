import React from 'react'
import { message, List } from 'antd';
import { getClients } from './js/ClientFuncions'
import { getClothWithOutRental, createRental } from './js/RentalFunctions'

export default class Rental extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            date_return: '',
            price: '',
            cloths: [],
            cloth_id: '',
            clients: [],
            client_id: '',
            rentals: [],
            editDisable: false

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
                clients: [...data.clients]
            })
        })

        getClothWithOutRental().then(data => {
            this.setState({
                cloths: [...data.response]
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
        console.log(this.state.date_return)
        console.log(this.state.price)
        console.log(this.state.cloth_id)
        console.log(this.state.client_id)
        message.loading('Registro en Proceso..', 2.5)
            .then(
                createRental(
                    this.state.date_return,
                    this.state.price,
                    this.state.cloth_id,
                    this.state.client_id
                )
            )
            .then(() => {
                this.getAll()
            })
            .then(
                () => message.success('Registro Completado', 2.5)
            )
        this.setState({
            date_return: '',
            price: '',
            cloth_id: '',
            client_id: '',
        })
    }
    render() {
        return (
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={this.onSubmit}>
                                <div className='form-row'>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <label>Fecha de Devolucion</label>
                                        <input type='date' className='form-control' name='date_return'
                                            value={this.state.date_return || ''}
                                            onChange={this.onChange.bind(this)}
                                            required
                                        />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <label>Valor del Alquiler</label>
                                        <input type='text' className='form-control' name='price' placeholder='Valor del Alquiler'
                                            value={this.state.price || ''}
                                            onChange={this.onChange.bind(this)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div className='mb-2'>
                                        <label>Prendas</label>
                                    </div>
                                    <div>
                                        <select className="custom-select" required id='cloth_id' name='cloth_id'
                                            value={this.state.cloth_id || ''}
                                            onChange={this.onChange.bind(this)}
                                            required>
                                            <option selected disabled value="">Elige...</option>
                                            {this.state.cloths.map((cloth, index) => (
                                                <option key={index} value={cloth.id}>
                                                    {cloth.name} - {cloth.color} - {cloth.fashion}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                    <div>
                                        <label>Clientes</label>
                                        <select className="custom-select" required id='client_id' name='client_id'
                                            value={this.state.client_id || ''}
                                            onChange={this.onChange.bind(this)}
                                            required>
                                            <option selected disabled value="">Elige...</option>
                                            {this.state.clients.map((client, index) => (
                                                <option key={index} value={client.id}>
                                                    {client.name} {client.last_name} - {client.address} - {client.cellphone}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                    onClick={this.onSubmit.bind(this)}>
                                    SUBMIT
                        </button>
                            </form>
                        </div>
                    </div>

                </div>
                <div className='col'>

                </div>
            </div>
        )
    }
}