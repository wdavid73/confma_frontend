import React from 'react'
import { List, Avatar, message } from 'antd';
import { getRental, refundRental } from './js/RentalFunctions'
import { RedoOutlined } from '@ant-design/icons';
import Logo from '../resources/logo_size_invert.jpg'


export default class Rental extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            date_return: '',
            price: '',
            client: '',
            cloth: '',
            ifrental: 0,
            rentals: [],
            visible: false,
            editDisable: false
        }
    }


    showDrawer = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }

    componentDidMount() {
        this.getAll()
    }

    getAll = () => {
        getRental().then(data => {
            this.setState({
                date_return: '',
                price: '',
                client: '',
                cloth: '',
                ifrental: 0,
                rentals: [...data.rentals]
            })
        })
    }

    RefundRental = (id, e) => {
        e.preventDefault()
        message.loading('Devolucion del Alquiler en Proceso..', 2.5)
            .then(refundRental(id))
            .then(() => { this.getAll() })
            .then(() => { message.success('Devolucion del Alquiler Satisfactoria') })
    }

    render() {
        return (
            <div>
                <List
                    size="small"
                    itemLayout="vertical"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.state.rentals}
                    footer={
                        <div>
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={rental => (
                        <List.Item
                            key={rental.id}

                            extra={
                                <img
                                    width={150}
                                    alt={rental.cloth.name}
                                    src={rental.cloth.image}
                                />
                            }
                            actions={[
                                <button
                                    className="btn btn-success btn-sm text-center"
                                    disabled={this.state.editDisable}
                                    onClick={this.RefundRental.bind(
                                        this,
                                        rental.id
                                    )}>
                                    <RedoOutlined /> Devolver Alquiler
                                </button>

                            ]}
                        >
                            <List.Item.Meta

                                avatar={
                                    <Avatar src={Logo} />
                                }
                                title={
                                    <p>Alquiler #{rental.id} - Valor : {rental.price} - Fecha de Devolucion : {rental.date_return}</p>
                                }
                                description={
                                    <div className="text-left">
                                        <p>Informacion del Cliente : </p>
                                        <p>
                                            {rental.client.name} {rental.client.last_name} {rental.client.cellphone} - {rental.client.address} - {rental.client.phone}
                                        </p>
                                        <p>Informacion de la Prenda Alquilada : </p>
                                        <p>
                                            {rental.cloth.name} - {rental.cloth.fashion} - {rental.cloth.size} - {rental.cloth.color}
                                        </p>
                                    </div>
                                }
                            />

                        </List.Item>
                    )}
                />
            </div>
        )
    }
}