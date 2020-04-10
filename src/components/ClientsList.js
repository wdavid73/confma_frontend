import React from 'react'
import { Row, Col, Typography, Table, Form, Input, Card, Button } from 'antd';


import { getClients } from './js/ClientFuncions'

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

    render() {
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Apellido',
                dataIndex: 'last_name',
                key: 'last_name',
            },
            {
                title: 'Direccion',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Telefono',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Celular',
                dataIndex: 'cellphone',
                key: 'cellphone',
            },
        ];
        const { Text } = Typography;
        return (
            <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={12}>
                        <Card title="Registrar Cliente" style={{ marginRight: 10 }}>
                            <Form layout="vertical">
                                <Form.Item label='Nombre'>
                                    <Input placeholder="Ingrese su Nombre" />
                                </Form.Item>
                                <Form.Item label='Apellido'>
                                    <Input placeholder="Ingrese su Apellido" />
                                </Form.Item>
                                <Form.Item label='Direccion'>
                                    <Input placeholder="Ingrese su Direccion (Opcional)" />
                                </Form.Item>
                                <Form.Item label='Telefono'>
                                    <Input placeholder="Ingrese su Telefono (Opcional)" />
                                </Form.Item>
                                <Form.Item label='Celular'>
                                    <Input placeholder="Ingrese su Celular" />
                                </Form.Item>
                                <Button type="primary" block>
                                    Registrar Cliente
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Table
                            columns={columns}
                            dataSource={this.state.clients}
                            size="middle"
                            bordered
                            footer={() => <Text type="secondary">Confecciones Marible</Text>}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}