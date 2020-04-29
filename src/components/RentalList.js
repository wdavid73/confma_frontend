import React from 'react'
import { Link } from 'react-router-dom';
import { List, Avatar, message ,Skeleton, Empty, Button } from 'antd';
import { getRental, refundRental } from './js/RentalFunctions'
import { RedoOutlined } from '@ant-design/icons';
import Logo from '../resources/logo_size_invert.jpg'
import {crud_client} from './common/messages'


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
            editDisable: false,
            loading : false
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

    disableButton = () => {
        this.setState({
            editDisable: true
        })
    }

    RefundRental = (id, e) => {
        e.preventDefault()
        this.disableButton()
        message.loading('Devolucion del Alquiler en Proceso..', 2.5)
            .then(
                refundRental(id)
            )
            .then( () => {
                let data = [...this.state.rentals]
                data.filter((rental , index) => {
                    if (rental.id === id){
                        data.splice(index,1)
                    }
                    return true
                })
                this.setState({rentals : [...data] , editDisable : false})
            })
            .then(() => { 
                message.success('Devolucion del Alquiler Satisfactoria') 
            })
    }

    render() {
        return (
            <div>
            {
                this.state.rentals.length <= 0 ? (
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                        height: 60,
                        }}
                        description={
                        <span>
                           No hay Alquileres Registrados
                        </span>
                        }
                    >
                    <Link to='/rental' onClick={crud_client}>
                        <Button id="btn-form" type="primary">Registre un Alquiler Ahora</Button>
                    </Link>
                        
                    </Empty>
                )
                : (
                    <List
                    size="small"
                    itemLayout="vertical"
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={this.state.rentals}
                    renderItem={rental => (
                        <List.Item
                            key={rental.id}

                            extra={
                                !this.state.loading && <img
                                    width={150}
                                    alt={rental.cloth.name}
                                    src={rental.cloth.image}
                                />
                            }
                            actions={!this.state.loading && [
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
                        <Skeleton loading={this.state.loading} active avatar>
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
                            </Skeleton>
                        </List.Item>
                    )}
                />
                )
            }
                
            </div>
        )
    }
}