import React from 'react'
import DrawerCloth from './common/DrawerCloth'
import { getCloth } from './js/ClothFuntions'

export default class Cloth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            color: '',
            size: '',
            fashion: '',
            image: '',
            cloths: []
        }
    }

    componentDidMount() {
        this.getAll()
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

    render() {
        return (
            <div>
                <DrawerCloth />
                <div className="row">
                    {this.state.cloths.map((cloth, index) => (
                        <div className="col-lg-4 col-md-4 col-sm-6 mb-2" key={index}>
                            <div className='card'>
                                <div className='row no-gutters'>
                                    <div className="col-md-5 p-2 d-flex align-items-center justify-content-center">
                                        <img src={cloth.image} className="card-img-top" alt="moda de referencia" />
                                    </div>
                                    <div className="col-md-7">
                                        <div className='card-body'>
                                            <h5 className="card-title text-center"> Prenda : {cloth.name}</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item list-group-item-primary">Talla : {cloth.size}</li>
                                                <li className="list-group-item list-group-item-primary">Moda : {cloth.fashion}</li>
                                                <li className="list-group-item list-group-item-primary">Color : {cloth.color}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <footer className="card-text"><small className="text-muted">Confecciones Maribel</small></footer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}