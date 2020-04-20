import React from 'react'
import { Drawer, Button } from 'antd';
import { createCloth } from '../js/ClothFuntions'


export default class DrawerCloth extends React.Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            color: '',
            size: '',
            fashion: '',
            image: null,
            cloths: [],
            visible: false
        }
        this.onSubmit = this.onSubmit.bind(this)
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
        )
        this.setState({
            name: '',
            color: '',
            size: '',
            fashion: '',
            image: null,
        })
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary m-2" onClick={this.showDrawer}>AGREGAR PRENDA</button>
                <Drawer
                    title="Registar Prenda"
                    width={720}
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
                                <select class="custom-select"
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
                                <select class="custom-select"
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
        )
    }
}
