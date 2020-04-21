import React from 'react'
import { Drawer, Button } from 'antd';
import { List } from 'antd';
import { getCloth, createCloth } from './js/ClothFuntions'

export default class Cloth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            color: '',
            size: '',
            fashion: '',
            image: null,
            cloths: [],
            minValue: 0,
            maxValue: 1,
            visible: false
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    numEachPage = 4

    componentDidMount() {
        this.getAll()
    }

    handleChange = value => {
        this.setState({
            minValue: (value - 1) * this.numEachPage,
            maxValue: value * this.numEachPage
        })
    }

    getAll = () => {
        getCloth().then(data => {
            this.setState({
                name: '',
                color: '',
                size: '',
                fashion: '',
                image: '',
                cloths: [...data.cloths]
            })
        })
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

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileSelecterhandler = e => {
        this.setState({
            image: e.target.files[0]
        })
    }


    onSubmit = (e) => {
        e.preventDefault()
        createCloth(
            this.state.name,
            this.state.color,
            this.state.size,
            this.state.fashion,
            this.state.image
        ).then(() => {
            this.getAll()
        })
        this.setState({
            name: '',
            color: '',
            size: '',
            fashion: '',
            image: null,
        })
        this.onClose()

    }

    render() {
        return (
            <div>
                <div>
                    <button className="btn btn-primary btn-sm mb-2 " onClick={this.showDrawer}>Agregar Prenda</button>
                    <Drawer
                        title="Registar Prenda"
                        width={'50%'}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        bodyStyle={{ paddingBottom: 80 }}
                        footer={
                            <div style={{ textAlign: "right" }}>
                                <Button
                                    onClick={this.onClose}
                                    style={{ marginRight: 8 }}>
                                    Cancel
                            </Button>

                            </div>
                        }
                    >
                        <div className='container'>
                            <form onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <label>Nombre : </label>
                                    <input type='text'
                                        placeholder='Nombre de la Prenda'
                                        id='name'
                                        name='name'
                                        className='form-control'
                                        value={this.state.name || ''}
                                        onChange={this.onChange.bind(this)}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Color : </label>
                                    <input type='text'
                                        placeholder='Color de la Prenda'
                                        id='color'
                                        name='color'
                                        className='form-control'
                                        required
                                        value={this.state.color || ''}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Talla : </label>
                                    <select className="custom-select"
                                        required
                                        id='size'
                                        name='size'
                                        value={this.state.size || ''}
                                        onChange={this.onChange.bind(this)}
                                    >
                                        <option selected disabled value="">Elige...</option>
                                        <option value='XS'>XS</option>
                                        <option value='S'>S</option>
                                        <option value='M'>M</option>
                                        <option value='L'>L</option>
                                        <option value='XL'>XL</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label>Moda : </label>
                                    <select className="custom-select"
                                        required
                                        id='fashion'
                                        name='fashion'
                                        value={this.state.fashion || ''}
                                        onChange={this.onChange.bind(this)}
                                    >
                                        <option selected disabled value="">Elige...</option>
                                        <option value='General'>General</option>
                                        <option value='A Medida'>A Medida</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label>Foto de la Moda : </label>
                                    <input type="file"
                                        required
                                        name='image'
                                        id='image'
                                        accept="image/*"
                                        className="form-control"
                                        onChange={this.fileSelecterhandler}
                                    />
                                </div>
                                <Button
                                    onClick={this.onSubmit.bind(this)} type='primary'>
                                    Submit
                            </Button>
                            </form>
                        </div>
                    </Drawer>
                </div>
                <List
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 3,
                        md: 3,
                        lg: 3,
                    }}

                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6,
                    }}

                    dataSource={this.state.cloths}
                    renderItem={cloth => (
                        <List.Item>
                            <div className='card'>
                                <div className='row no-gutters'>
                                    <div className="col-md-5 p-2 d-flex align-items-center justify-content-center">
                                        <img src={cloth.image} className="card-img-top" alt="moda de referencia" />
                                    </div>
                                    <div className="col-md-7">
                                        <div className='card-body'>
                                            <h5 className="card-title text-center"> Prenda : {cloth.name}</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item list-group-item-dark">Talla : {cloth.size}</li>
                                                <li className="list-group-item list-group-item-dark">Moda : {cloth.fashion}</li>
                                                <li className="list-group-item list-group-item-dark">Color : {cloth.color}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}