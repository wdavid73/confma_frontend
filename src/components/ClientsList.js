import React from 'react'
import 'antd/dist/antd.css'
import { Row, Col, Typography, Table, Form, Input, Card, Button, InputNumber } from 'antd';
import { getClients, createClient } from './js/ClientFuncions'

export default class Clients extends React.Component {

    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            last_name: '',
            address: '',
            phone: '',
            cellphone: '',
            clients: []
        }
        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
        this.getAll()
    }

    getAll = () => {
        getClients().then(data => {
            this.setState({
                id: '',
                name: '',
                last_name: '',
                address: '',
                phone: '',
                cellphone: '',
                clients: [...data.clients]
            }, () => {

                console.log(this.state.clients)
            })


        })
    }

    onSubmit = (values) => {
        console.log(values)
        console.log(this.state.name)
        /*createClient(
            values.name,
            values.last_name,
            values.address,
            values.phone,
            values.cellphone
        ).then(() => {
            this.getAll()
        })*/
    }
    onClear = (e) => {
        console.log(this.props)
    }


    render() {
        const { Text } = Typography;
        const { Column } = Table;
        return (
            <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={12}>
                        <Card title="Registrar Cliente" style={{ marginRight: 10 }}>
                            <Form layout="vertical" onFinish={this.onSubmit}>

                                <Form.Item name="name"
                                    label='Nombre'
                                    rules={[{ required: true, message: 'Porfavor Ingrese el Nombre del Cliente' }]}>
                                    <Input placeholder="Ingrese su Nombre" />
                                </Form.Item>

                                <Form.Item name="last_name"
                                    label='Apellido'
                                    rules={[{ required: true, message: 'Porfavor Ingrese el Apellido del Cliente' }]}>
                                    <Input placeholder="Ingrese su Apellido" />
                                </Form.Item>

                                <Form.Item name="address" label='Direccion'>
                                    <Input placeholder="Ingrese su Direccion (Opcional)" />
                                </Form.Item>

                                <Form.Item name="phone" label='Telefono'>
                                    <InputNumber size='large' placeholder="Ingrese su Telefono (Opcional)" style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item name="cellphone"
                                    label='Celular'
                                    rules={[{ required: true, message: 'Porfavor Ingrese Numero Celular del Cliente' }]}>
                                    <InputNumber size='large' placeholder="Ingrese su Celular" style={{ width: '100%' }} />
                                </Form.Item>

                                <Button type="primary" htmlType="submit" block onClick={this.onClear}>
                                    Registrar Cliente
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Table dataSource={this.state.clients} size="middle" bordered footer={() => <Text type="secondary">Confecciones Marible</Text>} >
                            <Column title='Nombre' dataIndex='name' key='name' />
                            <Column title='Apellido' dataIndex='last_name' key='last_name' />
                            <Column title='Direccion' dataIndex='address' key='address' />
                            <Column title='Telefono' dataIndex='phone' key='phone' />
                            <Column title='Celular' dataIndex='cellphone' key='cellphone' />
                        </Table>

                    </Col>
                </Row>
            </div >
        )
    }
}