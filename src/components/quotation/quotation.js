import React, { Component } from 'react';
import {getClothWithOutQuotation} from '../js/QuotationFunctions.js'
export default class Quotation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id : '',
            value_cloth : 0,
            value_work : 0,
            value_threads : 0,
            value_buttons : 0,
            value_necks : 0,
            value_embroidery : 0,
            value_prints : 0,
            cloth : [],
            cloth_id :''

        }
    }

    componentDidMount(){
        this.getAll()
    }

    getAll = () => {

        getClothWithOutQuotation().then(data => {
            this.setState({
                cloth : [...data.response]
            })
        })

    }
    render(){
        return(
            <div>
                <ul>
                    {this.state.cloth.map((cloth, index) => (
                        <li>{cloth.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}